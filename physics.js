import Matter from "matter-js"
import { Dimensions } from "react-native"
import { getRandom } from "./utils/random"

const windowHeight = Dimensions.get("window").height
const windowWidth = Dimensions.get("window").width

const Physics = (entities, { time, touches, dispatch }) => {
    let engine = entities.physics.engine
    let world = engine.world
    let points = 0
    let coinCount = entities.coinCount || 0
    let batteryLevel = entities.batteryLevel || 0

    if (entities["Char"]) {
     touches.filter(t => t.type === "move").forEach(t => {
        const fingerPositionX = t.event.pageX

        Matter.Body.setPosition(entities.Char.body, {
            x: fingerPositionX,
            y: entities.Char.body.position.y
        })
     })
    }

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
            y: -windowHeight -20
        })
    }

    if (entities["Choco"] && entities["Choco"].body.bounds.min.y >= windowHeight) {
        Matter.Body.setVelocity(entities["Choco"].body, { x: 0, y: 0 })
        Matter.Body.setPosition(entities["Choco"].body, {
            x: getRandom(10 + 110 / 2, windowWidth - 10 - 110 / 2),
            y: -windowHeight * 2
        })
    }



    if (entities["Backdrop"] && entities["Backdrop"].body.bounds.max.y >= windowHeight + windowHeight) {
        Matter.Body.setPosition(entities["Backdrop"].body, {
            x: windowWidth/3-windowWidth,
            y: windowHeight / 2
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
                    if (world.gravity.y <= 2) {
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
                }
            })
        })
    }

    return {
        ...entities,
        coinCount,
        batteryLevel
    }
}

export default Physics