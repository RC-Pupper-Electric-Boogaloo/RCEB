import Matter from "matter-js"
import { Dimensions, Alert } from "react-native"
import { getRandom } from "./utils/random"
import { Accelerometer } from 'expo-sensors'
import AsyncStorage from "@react-native-async-storage/async-storage"

const windowHeight = Dimensions.get("window").height
const windowWidth = Dimensions.get("window").width
const coinSize = windowWidth / 7

const Physics = (entities, { time, touches, dispatch }) => {
    let engine = entities.physics.engine
    let world = engine.world
    let points = 0
    let coinCount = entities.coinCount || 0
    let batteryLevel = entities.batteryLevel || 0
    let accelerometerSubscription = null
    let powerUp = 0
    let isBonusActive = entities.isBonusActive || false

    const startAccelerometer = () => {
        if (!accelerometerSubscription && powerUp >= 7 && !isBonusActive) {
            accelerometerSubscription = Accelerometer.addListener(({ x, y, z }) => {
                const totalAcceleration = Math.sqrt(x * x + y * y + z * z)
                if (totalAcceleration > 1.5 && !isBonusActive && powerUp >= 7) {
                    console.log("Shaken")
                    isBonusActive = true
                    dispatch({ type: "bonus_activated" })
                    world.gravity.y = world.gravity.y * 0.8
                    activateBonusCoins()
                    activateRainbow()
                    console.log("Bonus activated")
                }
            })
        }
    }   
    const activateBonusCoins = () => {
        Object.keys(entities).forEach((key) => {
            if (key.startsWith("Coin")) {
                const coin = entities[key]
                if (coin.body) {
                    Matter.Body.setPosition(coin.body, {
                        x: getRandom(10 + coinSize / 2, windowWidth - 10 - coinSize / 2),
                        y: getRandom(-windowHeight, -50)
                    })
                    Matter.Body.setStatic(coin.body, false) // Poista staattisuus, jotta painovoima vaikuttaa
                }
            }
        })
    }

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    const activateRainbow = async () => {
        const rainbowEntity = entities.Rainbow
        console.log("Batterylevel")
        console.log(entities.batteryLevel)
        console.log(batteryLevel)
        while (powerUp > 0) {
            dispatch({ type: "bonus_tick" })
            if (rainbowEntity && rainbowEntity.body) {
                Matter.Body.setPosition(rainbowEntity.body, {
                    x: windowWidth / 2,
                    y: 0
                })
            }
            await sleep(2500)
            powerUp--
        }
        isBonusActive = false
        dispatch({ type: "bonus_ended" })
        deactivateBonusCoins()
        console.log("Bonus ended")
    }

    const deactivateBonusCoins = () => {
        Object.keys(entities).forEach((key) => {
            if (key.startsWith("Coin")) {
                const coin = entities[key]
                if (coin.body) {
                    // Siirrä kolikko kuvan ulkopuolelle ja tee siitä staattinen
                    Matter.Body.setStatic(coin.body, true)
                    Matter.Body.setPosition(coin.body, { x: -100, y: -100 }) // Pidä piilossa
                }
            }
            Matter.Body.setStatic(entities["Coin"].body, false)
            Matter.Body.setVelocity(entities["Coin"].body, { x: -0.3, y: 0 })
            Matter.Body.setPosition(entities["Coin"].body, {
                x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2),
                y: getRandom(1, 3) * -windowHeight
            })
        })
    }

    startAccelerometer()

    const stopAccelerometer = () => {
        if (accelerometerSubscription) {
            accelerometerSubscription.remove()
            accelerometerSubscription = null
        }
    }

    if (entities["Char"]) {
        touches.filter(t => t.type === "move").forEach(t => {
            const fingerPositionX = t.event.pageX;

            Matter.Body.setPosition(entities.Char.body, {
                x: fingerPositionX,
                y: entities.Char.body.position.y
            });
        });
    }

    touches.filter(t => t.type === "press").forEach(async t => {
        const touchX = t.event.pageX
        const touchY = t.event.pageY

        // Tarkista osuuko kosketus Wooferin alueelle
        if (entities["Woofer"]) {
            const woofer = entities["Woofer"]
            const { min, max } = woofer.body.bounds

            if (
                touchX >= min.x && touchX <= max.x &&
                touchY >= min.y && touchY <= max.y
            ) {
                const skinIndex = 12
                const currentSkins = await AsyncStorage.getItem("purchasedSkins")
                const purchasedSkins = currentSkins ? JSON.parse(currentSkins) : []

                if (!purchasedSkins.includes(skinIndex)) {
                    purchasedSkins.push(skinIndex)
                    await AsyncStorage.setItem("purchasedSkins", JSON.stringify(purchasedSkins))
                    dispatch({ type: "skin_unlocked", skinIndex })
                    console.log("Woofer skin unlocked!")
                    Alert.alert("Woof!", "Sergeant Woofer unlocked! You can now find this puppy from the shop.");
            
                }
            }
        }
    })

    Matter.Engine.update(engine)

    if (entities["Point"] && entities["Point"].body.bounds.min.y >= windowHeight) {
        Matter.Body.setVelocity(entities["Point"].body, { x: 0, y: 0 })
        Matter.Body.setPosition(entities["Point"].body, {
            x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2),
            y: -50
        })
    }

    if (entities["Coin"] && entities["Coin"].body.bounds.min.y >= windowHeight) {
        Matter.Body.setVelocity(entities["Coin"].body, { x: -0.3, y: 0 })
        Matter.Body.setPosition(entities["Coin"].body, {
            x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2),
            y: getRandom(1, 3) * -windowHeight
        })
    }

    if (entities["Obstacle"] && entities["Obstacle"].body.bounds.min.y >= windowHeight) {
        Matter.Body.setVelocity(entities["Obstacle"].body, { x: 0, y: 0 })
        Matter.Body.setPosition(entities["Obstacle"].body, {
            x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2),
            y: -windowHeight - 20
        });
    }

    if (entities["Choco"] && entities["Choco"].body.bounds.min.y >= windowHeight) {
        Matter.Body.setVelocity(entities["Choco"].body, { x: 0, y: 0 })
        Matter.Body.setPosition(entities["Choco"].body, {
            x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2),
            y: -windowHeight * 2
        })
    }

    if (entities["Battery"] && entities["Battery"].body.bounds.min.y >= windowHeight) {
        Matter.Body.setVelocity(entities["Battery"].body, { x: -0.5, y: 0 })
        Matter.Body.setPosition(entities["Battery"].body, {
            x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2),
            y: getRandom(3, 6) * -windowHeight
        })
    }

    if (entities["Backdrop"] && entities["Backdrop"].body.bounds.max.y >= windowHeight + windowHeight) {
        Matter.Body.setPosition(entities["Backdrop"].body, {
            x: windowWidth / 3 - windowWidth,
            y: windowHeight / 2
        })
    }

    if (isBonusActive && entities["Rainbow"] && entities["Rainbow"].body.bounds.min.y >= windowHeight) {
        Matter.Body.setVelocity(entities["Rainbow"].body, { x: 0, y: 0 })
        Matter.Body.setPosition(entities["Rainbow"].body, {
            x: windowWidth / 2,
            y: -50
        })
    }

    if (entities["Cloud1"] && entities["Cloud1"].body.bounds.min.x + 160 < 0) {
        Matter.Body.setVelocity(entities["Cloud1"].body, { x: 0, y: 0 })
        Matter.Body.setPosition(entities["Cloud1"].body, {
            x: windowWidth + 150,
            y: getRandom(150, windowHeight / 1.1)
        })
    }

    if (entities["Cloud2"] && entities["Cloud2"].body.bounds.min.x + 160 < 0) {
        Matter.Body.setVelocity(entities["Cloud2"].body, { x: 0, y: 0 })
        Matter.Body.setPosition(entities["Cloud2"].body, {
            x: windowWidth + 120,
            y: getRandom(150, windowHeight / 1.1)

        })
    }

    if (!engine.collisionHandler) {
        engine.collisionHandler = Matter.Events.on(engine, "collisionStart", (event) => {
            event.pairs.forEach(({ bodyA, bodyB }) => {
                if (bodyA.label === "Char" && bodyB.label === "Point") {
                    points++
                    if (world.gravity.y <= 2.2) {
                        world.gravity.y = world.gravity.y + 0.02
                    }
                    dispatch({ type: "new_point" })
                    Matter.Body.setVelocity(entities["Point"].body, { x: 0, y: 0 })
                    Matter.Body.setPosition(bodyB, {
                        x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2),
                        y: -50
                    })

                } else if (bodyA.label === "Char" && bodyB.label === "Coin") {
                    coinCount++
                    dispatch({ type: "coin_collected" })

                    Matter.Body.setVelocity(entities["Coin"].body, { x: 0, y: 0 })
                    Matter.Body.setPosition(entities["Coin"].body, {
                        x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2),
                        y: getRandom(1, 2) * -windowHeight
                    })

                } else if (bodyA.label === "Char" && bodyB.label === "Coin1") {
                    coinCount++
                    dispatch({ type: "coin_collected" })

                    Matter.Body.setVelocity(entities["Coin1"].body, { x: 0, y: 0 })
                    Matter.Body.setPosition(entities["Coin1"].body, {
                        x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2),
                        y: -20
                    })

                } else if (bodyA.label === "Char" && bodyB.label === "Coin2") {
                    coinCount++
                    dispatch({ type: "coin_collected" })

                    Matter.Body.setVelocity(entities["Coin2"].body, { x: 0, y: 0 })
                    Matter.Body.setPosition(entities["Coin2"].body, {
                        x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2),
                        y: -20
                    })

                } else if (bodyA.label === "Point" && bodyB.label === "Obstacle") {
                    Matter.Body.setVelocity(entities["Obstacle"].body, { x: 0, y: 0 })
                    Matter.Body.setPosition(bodyB, {
                        x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2),
                        y: -windowHeight * 3
                    })
                } else if (bodyA.label === "Char" && bodyB.label === "Choco") {
                    dispatch({ type: "miss" })
                    if (world.gravity.y > 0.4) {
                        world.gravity.y = world.gravity.y - 0.02
                    }
                    Matter.Body.setVelocity(entities["Choco"].body, { x: 0, y: 0 })
                    Matter.Body.setPosition(bodyB, {
                        x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2),
                        y: -50
                    })
                } else if (bodyA.label === "Char" && bodyB.label === "Obstacle") {

                    dispatch({ type: "game_over" })
                    if (isBonusActive) {
                        dispatch({ type: "bonus_ended" })
                        console.log("Bonus ended")
                    }
                    powerUp = 0
                    isBonusActive = false
                } else if (bodyA.label === "Char" && bodyB.label === "Battery") {

                    batteryLevel = Math.min(batteryLevel + 20, 100)
                    powerUp++
                    console.log("PowerUp level", powerUp)
                    dispatch({ type: "battery_collected", level: batteryLevel })
                    if(powerUp>=7){startAccelerometer()}
                    Matter.Body.setVelocity(entities["Battery"].body, { x: 0, y: 0 })
                    Matter.Body.setPosition(bodyB, {
                        x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2),
                        y: getRandom(2, 4) * -windowHeight
                    })
                }
            })
        })
    }

    return {
        ...entities,
        coinCount,
        batteryLevel,
        isBonusActive
    }
}

export default Physics

/*
Pystyykö tätä kutsumaan gameScreenistä?
*/
export const cleanupPhysics = () => {
    stopAccelerometer()
}