import React, { useState, useEffect, useRef } from "react"
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Image, Alert } from "react-native"
import { StatusBar } from 'expo-status-bar'
import DarkTheme from '../styles/theme'
import { useTheme } from '../components/Theme'
import { GameEngine } from 'react-native-game-engine'
import AsyncStorage from '@react-native-async-storage/async-storage'
import entities from '../entities/menuentities'
import Physics from '../physics'

const AchievementScreen = ({ navigation }) => {
    const { isDarkMode } = useTheme()
    const styles = DarkTheme(isDarkMode)
    const gameEngine = useRef(null)
    const [achievements, setAchievements] = useState([])
    const [stats, setStats] = useState({ totalPoints: 0, totalCoins: 0, gamesPlayed: 0, totalPlayTime: 0 })
    const [highScore, setHighScore] = useState(0)

    const backdropImage = require('../assets/Taustakuva9ala.png')
    const backgroundImage = isDarkMode
        ? require('../assets/Taustakuvatakatumma.jpg')
        : require('../assets/Taustakuvatakavaalea.jpg')

    const achievementList = [
        { id: 1, name: "Golden Retriever", requirement: "Collect 10,000 gold coins", image: require('../assets/rcGentlePuppy.png'), progress: 0, goal: 10000, unlocked: false },
        { id: 2, name: "Eternity in Dog Years", requirement: "Play 5 hours", image: require('../assets/rcTimeKeeper.png'), progress: 0, goal: 5, unlocked: false },
        { id: 3, name: "Boneyard", requirement: "Collect 10,000 points", image: require('../assets/rcPiratePup.png'), progress: 0, goal: 10000, unlocked: false },
        { id: 4, name: "Howling Success!", requirement: "Score over 100 points in a single game", image: require('../assets/rcPupperOg.png'), progress: 0, goal: 100, unlocked: false },
    ];

    useEffect(() => {
        // Load stats and high scores
        const loadStatsAndScores = async () => {
            try {
                const savedStats = await AsyncStorage.getItem('GAME_STATS')
                const parsedStats = savedStats ? JSON.parse(savedStats) : { totalPoints: 0, totalCoins: 0, gamesPlayed: 0, totalPlayTime: 0 }
                setStats(parsedStats)

                const savedScores = await AsyncStorage.getItem('HIGHSCORES')
                let scoresArray = savedScores ? JSON.parse(savedScores) : []
                const highestScore = scoresArray.length > 0 ? Math.max(...scoresArray) : 0
                setHighScore(highestScore)

                // Update achievements based on stats and scores
                updateAchievements(parsedStats, highestScore)
            } catch (error) {
                console.error("Error loading stats or high scores:", error)
            }
        }

        loadStatsAndScores()
    }, [])

    const updateAchievements = (stats, highestScore) => {
        const updatedAchievements = achievementList.map((achievement) => {
            let progress = 0

            // Determine progress based on requirement
            if (achievement.id === 1) progress = stats.totalCoins // Total coins
            if (achievement.id === 2) progress = Math.floor(stats.totalPlayTime / 3600) // Hours played
            if (achievement.id === 3) progress = stats.totalPoints // Total points
            if (achievement.id === 4) progress = highestScore // Highscore

            return {
                ...achievement,
                progress,
                unlocked: progress >= achievement.goal
            }
        })

        setAchievements(updatedAchievements)
    }

    const handleAchievementClick = async (achievement) => {
        if (!achievement.unlocked) {
            Alert.alert(
                "Achievement Locked",
                `Achievement "${achievement.name}" is locked. ${achievement.requirement}`
            )
        } else {
            // Achievement 1: Golden Puppy skin
            if (achievement.id === 1) {
                Alert.alert(
                    "Achievement Unlocked",
                    `GZ! You unlocked the achievement: "${achievement.name}". Golden Puppy can now be found at shop!`
                )
                try {
                    const currentSkins = await AsyncStorage.getItem('purchasedSkins')
                    const purchasedSkins = currentSkins ? JSON.parse(currentSkins) : []
                    const newSkinIndex = 8 // Golden Puppy skin index
    
                    if (!purchasedSkins.includes(newSkinIndex)) {
                        purchasedSkins.push(newSkinIndex)
                        await AsyncStorage.setItem('purchasedSkins', JSON.stringify(purchasedSkins))
                    }
                } catch (error) {
                    console.error('Error unlocking Golden Puppy skin:', error)
                }
            }
    
            // Achievement 2: Eternity in Dog Years - Unlocks a skin
            if (achievement.id === 2) {
                Alert.alert(
                    "Achievement Unlocked",
                    `GZ! You unlocked the achievement: "${achievement.name}". Timekeeper Dachshund can now be found at shop!`
                )
                try {
                    const currentSkins = await AsyncStorage.getItem('purchasedSkins')
                    const purchasedSkins = currentSkins ? JSON.parse(currentSkins) : []
                    const newSkinIndex = 9
    
                    if (!purchasedSkins.includes(newSkinIndex)) {
                        purchasedSkins.push(newSkinIndex)
                        await AsyncStorage.setItem('purchasedSkins', JSON.stringify(purchasedSkins))
                    }
                } catch (error) {
                    console.error('Error unlocking skin for achievement 2:', error)
                }
            }
    
            // Achievement 3: Boneyard - Unlocks a skin
            if (achievement.id === 3) {
                Alert.alert(
                    "Achievement Unlocked",
                    `GZ! You unlocked the achievement: "${achievement.name}". Pirate Corgi can now be found at shop!`
                )
                try {
                    const currentSkins = await AsyncStorage.getItem('purchasedSkins')
                    const purchasedSkins = currentSkins ? JSON.parse(currentSkins) : []
                    const newSkinIndex = 10
    
                    if (!purchasedSkins.includes(newSkinIndex)) {
                        purchasedSkins.push(newSkinIndex)
                        await AsyncStorage.setItem('purchasedSkins', JSON.stringify(purchasedSkins))
                    }
                } catch (error) {
                    console.error('Error unlocking skin for achievement 3:', error)
                }
            }
    
            // Achievement 4: Howling Success! - Unlocks a skin
            if (achievement.id === 4) {
                Alert.alert(
                    "Achievement Unlocked",
                    `GZ! You unlocked the achievement: "${achievement.name}". OG RC Pupper can now be found at shop! Classic mode can be chosen from options!`
                );
                try {
                    const currentSkins = await AsyncStorage.getItem('purchasedSkins')
                    const purchasedSkins = currentSkins ? JSON.parse(currentSkins) : []
                    const newSkinIndex = 11
    
                    if (!purchasedSkins.includes(newSkinIndex)) {
                        purchasedSkins.push(newSkinIndex)
                        await AsyncStorage.setItem('purchasedSkins', JSON.stringify(purchasedSkins))
                    }
                } catch (error) {
                    console.error('Error unlocking skin for achievement 4:', error)
                }
            }
        }
    }

return (
    <ImageBackground source={backgroundImage} style={styles.background}>
        <GameEngine
            ref={gameEngine}
            systems={[Physics]}
            entities={entities(null, backdropImage)}
            running={true}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        >
            <StatusBar style="auto" hidden={true} />
        </GameEngine>

        <ScrollView contentContainerStyle={styles.Guidecontainer}>
            <Text style={styles.title}>Achievements</Text>

            {achievements.map((achievement) => (
                <TouchableOpacity
                    key={achievement.id}
                    style={styles.Guidesection}
                    onPress={() => handleAchievementClick(achievement)}
                    activeOpacity={achievement.unlocked ? 0.7 : 1}
                >
                    <Image source={achievement.image} style={[styles.Guideimage, { tintColor: achievement.unlocked ? 'none' : 'gray' }]} />
                    <View style={styles.GuideCenter}>
                        <Text style={styles.sectionTitle}>{achievement.name}</Text>
                        <Text style={styles.Guidetext}>{achievement.requirement}</Text>
                        <Text style={styles.Guidetext}>{achievement.unlocked ? "Unlocked!" : `Progress: ${achievement.progress}/${achievement.goal}`}</Text>
                    </View>
                </TouchableOpacity>
            ))}

            <TouchableOpacity
                style={[styles.button, styles.GuidereturnButton]}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.buttonTitle}>Return</Text>
            </TouchableOpacity>
        </ScrollView>
    </ImageBackground>
    )
}

export default AchievementScreen