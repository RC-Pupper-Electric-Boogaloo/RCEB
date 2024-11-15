import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';
import { GameEngine } from 'react-native-game-engine';
import entities from '../entities/menuentities';


export default function StartScreen({ navigation }) {
  const styles = DarkTheme(isDarkMode);
  const { isDarkMode } = useTheme();
  const gameEngine = useRef(null);

  const backgroundImage = isDarkMode
    ? require('../assets/Taustakuvatakatumma.jpg')
    : require('../assets/Taustakuvatakavaalea.jpg');

  const backdropImage = require('../assets/Taustakuvaala.png'); 

    return (
    <ImageBackground
      source={backgroundImage} 
      style={styles.background}
    >        
    <GameEngine
      ref={gameEngine}
      entities={entities(null, backdropImage)}
      running={true}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <StatusBar style="auto" hidden={true} />
    </GameEngine>
      <View style={styles.containerMainMenu}>
        <TouchableOpacity style={styles.startButton} onPress={() => { navigation.navigate('MainMenu') }}>
          <Text style={styles.startButtonText}>START</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
};
