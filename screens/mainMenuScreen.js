import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';
import { GameEngine } from 'react-native-game-engine';
import entities from '../entities/menuentities';



export default function MainMenuScreen({ navigation }) {
    const styles = DarkTheme(isDarkMode);
    const { isDarkMode } = useTheme();
    const gameEngine = useRef(null);
    
    const backgroundImage = isDarkMode
        ? require('../assets/Taustakuvatakatumma.jpg')
        : require('../assets/Taustakuvatakavaalea.jpg');
    
    const backdropImage = require('../assets/Taustakuva2ala.png'); 
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
        <TouchableOpacity style={styles.ButtonMainMenu} onPress={() => { navigation.navigate('Game') }}>
          <Text style={styles.ButtonMainMenuText}>PLAY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonMainMenu} onPress={() => { navigation.navigate('Highscore') }}>
          <Text style={styles.ButtonMainMenuText}>HIGHSCORES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonMainMenu} onPress={() => navigation.navigate('Options')}>
          <Text style={styles.ButtonMainMenuText}>OPTIONS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonMainMenu} onPress={() => navigation.navigate('Shop')}>
          <Text style={styles.ButtonMainMenuText}>SHOP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonMainMenu} onPress={() => navigation.navigate('Stats')}>
          <Text style={styles.ButtonMainMenuText}>STATS</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};