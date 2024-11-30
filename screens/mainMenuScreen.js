import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import DarkTheme from '../styles/theme'
import { useTheme } from '../components/Theme'
import { GameEngine } from 'react-native-game-engine'
import entities from '../entities/menuentities'
import Physics from '../physics'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native';


export default function MainMenuScreen({ navigation }) {
    const styles = DarkTheme(isDarkMode)
    const { isDarkMode } = useTheme()
    const gameEngine = useRef(null)
    const stopMusicRef = useRef()
    const [musicOn, setMusicOn] = useState(false)
    const [ClassicOn, setClassicOn] = useState(false)

    const backgroundImage = isDarkMode
        ? require('../assets/Taustakuvatakatumma.jpg')
        : require('../assets/Taustakuvatakavaalea.jpg')
    const backdropImage = require('../assets/Taustakuva2ala.png')

    useFocusEffect(
      React.useCallback(() => {
          const loadSettings = async () => {
              try {
                  const savedMusic = await AsyncStorage.getItem('MusicOn');
                  const savedClassic = await AsyncStorage.getItem('ClassicOn');

                  setMusicOn(savedMusic === 'true');
                  setClassicOn(savedClassic === 'true'); // Boolean
              } catch (error) {
                  console.error('Error loading settings:', error);
              }
          };

          loadSettings();
        }, [])
      );

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
        <View style={styles.containerMainMenu}>
        {!ClassicOn ? (
        <TouchableOpacity
            style={styles.ButtonMainMenu}
            onPress={() => {
                if (stopMusicRef.current) stopMusicRef.current();
                navigation.navigate('Game');
            }}
        >
            <Text style={styles.buttonTitle}>PLAY</Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
            style={styles.ButtonMainMenu}
            onPress={() => {
                if (stopMusicRef.current) stopMusicRef.current();
                navigation.navigate('GameClassic');
            }}
        >
            <Text style={styles.buttonTitle}>PLAY Classic</Text>
        </TouchableOpacity>
    )}
        <TouchableOpacity style={styles.ButtonMainMenu} onPress={() => { navigation.navigate('Highscore') }}>
          <Text style={styles.buttonTitle}>HIGHSCORES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonMainMenu} onPress={() => navigation.navigate('Options')}>
          <Text style={styles.buttonTitle}>OPTIONS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonMainMenu} onPress={() => navigation.navigate('Shop')}>
          <Text style={styles.buttonTitle}>SHOP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonMainMenu} onPress={() => navigation.navigate('Stats')}>
          <Text style={styles.buttonTitle}>STATS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonMainMenu} onPress={() => navigation.navigate('Achievement')}>
          <Text style={styles.buttonTitle}>ACHIEVEMENTS</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}