import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import DarkTheme from '../styles/theme'
import { useTheme } from '../components/Theme'
import { GameEngine } from 'react-native-game-engine'
import entities from '../entities/menuentities'
import Physics from '../physics'
import { MusicContext } from '../contexts/MusicContext'
import * as Speech from 'expo-speech'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function StartScreen({ navigation }) {
  const styles = DarkTheme(isDarkMode)
  const { isDarkMode } = useTheme()
  const gameEngine = useRef(null)
  const [sfxOn, setSfxOn] = useState(false)
  const { setMusic  } = useContext(MusicContext)

  const backgroundImage = isDarkMode
    ? require('../assets/Taustakuvatakatumma.jpg')
    : require('../assets/Taustakuvatakavaalea.jpg')
  const backdropImage = require('../assets/Taustakuvaala.png')

  useEffect(() => {
    setMusic(require('../assets/bgmenu.mp3'))
  }, [setMusic])

  const handleStartPress = async () => {
    try {
      // Lataa SfxOn-asetuksen arvo
      const savedSfx = await AsyncStorage.getItem('SfxOn')
      const parsedSfx = savedSfx === 'true'

      // Aseta tila manuaalisesti
      setSfxOn(parsedSfx)

      // Jos SfxOn on päällä, puhe käynnistyy
      if (parsedSfx) {
        // Puhu kaksi tekstiosiota peräkkäin
        const text = "R C Pupper"
        const text2 = "Electric Boogalooooooo."

        await Speech.speak(text, {
          language: 'en',
          pitch: 0.3,
          rate: 0.5
        })

        await Speech.speak(text2, {
          language: 'ru',
          pitch: 0.3,
          rate: 1.5
        })
      }

      // Siirrytään MainMenuun
      navigation.navigate('MainMenu')
    } catch (error) {
      console.error('Error handling start press:', error)
    }
  }

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
      <View style={styles.containerStart}>
        <TouchableOpacity style={styles.ButtonMainMenu} onPress={() => { handleStartPress() }}>
          <Text style={styles.buttonTitle}>START</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonMainMenu} onPress={() => navigation.navigate('Guide')}>
        <Text style={styles.buttonTitle}>GUIDE</Text>
      </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}