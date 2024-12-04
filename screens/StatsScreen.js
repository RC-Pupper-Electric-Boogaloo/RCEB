import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from '../components/Theme'
import { GameEngine } from 'react-native-game-engine'
import AsyncStorage from '@react-native-async-storage/async-storage'
import entities from '../entities/menuentities'
import Physics from '../physics'
import DarkTheme from '../styles/theme'

const StatsScreen = ({ navigation }) => {
    const { isDarkMode } = useTheme()
    const styles = DarkTheme(isDarkMode)
    const [stats, setStats] = useState({ totalPoints: 0, totalCoins: 0, gamesPlayed: 0, totalPlayTime: 0 })
    const gameEngine = useRef(null)

    const backgroundImage = isDarkMode
        ? require('../assets/Taustakuvatakatumma.jpg')
        : require('../assets/Taustakuvatakavaalea.jpg')
    const backdropImage = require('../assets/Taustakuva4ala.png')

    const formatPlayTime = (seconds) => {

        const hours = Math.floor(seconds / 3600) // Tunnit
        const minutes = Math.floor((seconds % 3600) / 60) // Minuutit
        const remainingSeconds = seconds % 60 // Sekunnit
        if (isNaN(seconds) || seconds <= 0) {
            return "0h 0m 0s"
        }

        return `${hours}h ${minutes}m ${remainingSeconds}s`
    }

    useEffect(() => {
        const loadStats = async () => {
            try {
                const savedStats = await AsyncStorage.getItem('GAME_STATS')
                if (savedStats) {
                    setStats(JSON.parse(savedStats))
                }
            } catch (error) {
                console.error('Error loading stats:', error)
            }
        }

        loadStats()
    }, [])

    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.background}
        >
            <GameEngine
                ref={gameEngine}
                systems={[Physics]}
                entities={entities(null, backdropImage)}
                running={true}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            >
                <StatusBar style="auto" hidden={true} />
            </GameEngine>
            <View style={styles.optionsContainer}>
                <View style={styles.optionsColorContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.screenHeader}>Stats</Text>
                    </View>
                    <View style={styles.screenHeader}>
                        <Text style={[styles.screenHeader, styles, { fontSize: 20 }]}>All-Time Stats</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Points:</Text>
                        <Text style={styles.label}>{stats.totalPoints}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Coins:</Text>
                        <Text style={styles.label}>{stats.totalCoins}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Games Played:</Text>
                        <Text style={styles.label}>{stats.gamesPlayed}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total Play Time:</Text>
                        <Text style={styles.label}>{formatPlayTime(stats.totalPlayTime)}</Text>
                    </View>
                </View>
                <View style={styles.optionsBottomContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.returnButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.buttonTitle}>RETURN</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ImageBackground >
    )
}

export default StatsScreen