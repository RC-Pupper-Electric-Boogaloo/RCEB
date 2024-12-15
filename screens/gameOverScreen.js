import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '../components/Theme'
import DarkTheme from '../styles/theme'
import { MusicContext } from '../contexts/MusicContext'
//import { AdMobBanner } from 'expo-ads-admob'

const GameOverScreen = ({ currentPoints, boneCount, coinCount, chocoCount, onRestart, onShowHighscores, navigation }) => {
    const { isDarkMode } = useTheme()
    const styles = DarkTheme(isDarkMode)
    const [highScores, setHighScores] = useState([])
    const [initials, setInitials] = useState('')
    const [isHighScore, setIsHighScore] = useState(false)
    const { setMusic } = useContext(MusicContext)
    const [isClassicMode, setIsClassicMode] = useState(false)

    const backgroundImage = isDarkMode
        ? require('../assets/GameOverDark.jpg')
        : require('../assets/GameOver.jpg')

    useEffect(() => {
        setMusic(require('../assets/bgmenu.mp3'))
    }, [setMusic])

    useEffect(() => {
        const initialize = async () => {
            const classicOnSetting = await AsyncStorage.getItem('ClassicOn')
            setIsClassicMode(classicOnSetting === 'true')

            const key = classicOnSetting === 'true' ? 'classicHIGHSCORES' : 'HIGHSCORES'
            const savedScores = await AsyncStorage.getItem(key)
            const scoresArray = savedScores ? JSON.parse(savedScores) : []

            const isTopScore = scoresArray.length < 10 || currentPoints > Math.min(...scoresArray.map(s => s.points))

            if (isTopScore) {
                setIsHighScore(true)
            }
        }

        initialize()
    }, [currentPoints])

    useEffect(() => {
        const checkHighScore = async () => {
            const key = isClassicMode ? 'classicHIGHSCORES' : 'HIGHSCORES'
            const savedScores = await AsyncStorage.getItem(key)
            const scoresArray = savedScores ? JSON.parse(savedScores) : []
            const isTopScore = scoresArray.length < 10 || currentPoints > Math.min(...scoresArray.map(s => s.points))

            if (isTopScore) {
                setIsHighScore(true)
            }
        }

        const loadSettings = async () => {
            const classicOnSetting = await AsyncStorage.getItem('ClassicOn')
            setIsClassicMode(classicOnSetting === 'true')
        }

        loadSettings()
        checkHighScore()
    }, [currentPoints])

    const saveHighScore = async () => {
        setInitials(initials.toUpperCase())
        const key = isClassicMode ? 'classicHIGHSCORES' : 'HIGHSCORES'
        const savedScores = await AsyncStorage.getItem(key)
        const scoresArray = savedScores ? JSON.parse(savedScores) : []

        const playerInitials = initials.trim() === '' ? '-' : initials.toUpperCase()

        scoresArray.push({ initials: playerInitials, points: currentPoints })
        const sortedScores = scoresArray
            .sort((a, b) => b.points - a.points)
            .slice(0, 10)

        await AsyncStorage.setItem(key, JSON.stringify(sortedScores))
        setHighScores(sortedScores)
        setIsHighScore(false) // Hide input after saving
    }

    return (
        <ImageBackground
            source={backgroundImage}
            style={styles.background}
        >
            <View style={styles.containerGameOver}>
                <Text style={styles.pointsTextGameOver}>Points: {currentPoints}</Text>
                {!isClassicMode && (
                    <View style={styles.coinsContainer}>
                        <View style={styles.coinsRow}>
                            <Image source={require('../assets/Point.png')} style={styles.coinImage} />
                            <Text style={styles.coinsTextGameOver}>x {boneCount}</Text>
                        </View>
                        <View style={styles.coinsRow}>
                            <Image source={require('../assets/Coin.png')} style={styles.coinImage} />
                            <Text style={styles.coinsTextGameOver}>x {coinCount}</Text>
                        </View>
                        <View style={styles.coinsRow}>
                            <Image source={require('../assets/Choco.png')} style={styles.coinImage} />
                            <Text style={styles.coinsTextGameOver}>x {chocoCount}</Text>
                        </View>
                    </View>
                )}
                {isHighScore ? (
                    <View>
                        <Text style={styles.gameOverText}>New High Score!</Text>
                        <Text style={styles.gameOverText}>Enter your initials:</Text>
                        <TextInput
                            style={styles.initialsInput}
                            value={initials}
                            maxLength={3}
                            onChangeText={(text) => setInitials(text.toUpperCase())}
                            placeholder="ABC"
                            placeholderTextColor={'#FD8A0B'}
                            autoCapitalize='characters'
                        />
                        <TouchableOpacity style={styles.gameOverButton} onPress={saveHighScore}>
                            <Text style={styles.buttonTitle}>SAVE SCORE</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <TouchableOpacity style={styles.gameOverButton} onPress={onRestart}>
                            <Text style={styles.buttonTitle}>PLAY AGAIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gameOverButton} onPress={onShowHighscores}>
                            <Text style={styles.buttonTitle}>HIGHSCORES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gameOverButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonTitle}>MAIN MENU</Text>
                        </TouchableOpacity>
                    </>
                )}
                {/* <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-3940256099942544/9214589741" // Vaihda tämä oikeaan AdMob ID:hen
                    servePersonalizedAds={true}
                    onDidFailToReceiveAdWithError={(error) => console.log("AdMob error:", error)}
                    style={styles.adBanner}
                /> */}
            </View>
        </ImageBackground >
    )
}

export default GameOverScreen
