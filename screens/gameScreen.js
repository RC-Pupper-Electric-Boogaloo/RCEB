import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { StatusBar } from 'expo-status-bar';
import entities from '../entities';
import Physics from '../physics';
import { usePlayCollisionSound, usePlayPointSound } from '../components/BackgroundMusic';
import GameOverScreen from './gameOverScreen'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';
import { MusicContext } from '../contexts/MusicContext';

export default function GameScreen({ navigation }) {
    const [running, setRunning] = useState(true); 
    const [currentPoints, setCurrentPoints] = useState(0);
    const [coinCount, setCoinCount] = useState(0);  
    const playCollisionSound = usePlayCollisionSound();
    const playPointSound = usePlayPointSound();
    const stopMusicRef = useRef();
    const [sfxOn, setSfxOn] = useState(false);
    const { musicOn, toggleMusic, setMusic } = useContext(MusicContext);
    const { isDarkMode } = useTheme();
    const styles = DarkTheme(isDarkMode);
    const gameEngine = useRef(null);
  
    const backgroundImage = isDarkMode
      ? require('../assets/Taustakuvatakatumma.jpg')
      : require('../assets/Taustakuvatakavaalea.jpg');
    
    const backdropImage = require('../assets/Taustakuva3ala.png'); 

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedSfx = await AsyncStorage.getItem('SfxOn');
                const parsedSfx = savedSfx === 'true';
                setSfxOn(parsedSfx);
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        };

        loadSettings();
    }, []);

    // Varmistetaan, että peliin asetetaan oikea musiikki (bgm2.mp3) kun peli käynnistyy
    useEffect(() => {
        if (running) {
            setMusic(require('../assets/bgm2.mp3'));  // Asetetaan pelimusiikki
        }
    }, [setMusic, running]);

    const handleRestart = () => {
        setCurrentPoints(0);
        setCoinCount(0);  
        setRunning(true);

        if (gameEngine.current) {
            gameEngine.current.swap(entities());  
            gameEngine.current.start();  
        }

        // Käynnistetään musiikki aina, kun peli aloitetaan uudelleen
        setMusic(require('../assets/bgm2.mp3'));
    };

    const handleShowHighscores = () => {
        navigation.navigate('Highscore');
    };

    return (
        <View style={{ flex: 1 }}>
            {running ? (
                <>
                    <ImageBackground
                        source={backgroundImage} 
                        style={{ flex: 1 }} 
                    >
                        <Text style={styles.pointsText}>
                            {currentPoints}
                        </Text>

                        <Text style={styles.coinsText}>
                            Coins: {coinCount}  
                        </Text>
                        <GameEngine
                            ref={gameEngine}
                            systems={[Physics]}
                            entities={entities(null, backdropImage)}
                            running={running}
                            onEvent={(e) => {
                                switch (e.type) {
                                    case 'game_over':
                                        if (sfxOn) playCollisionSound();
                                        if (stopMusicRef.current) stopMusicRef.current(); 
                                        setRunning(false);
                                        gameEngine.current.stop(); 
                                        break;
                                    case 'new_point':
                                        if (sfxOn) playPointSound();
                                        setCurrentPoints(currentPoints + 1);
                                        break;
                                    case 'coin_collected':
                                        if (sfxOn) playPointSound();
                                        setCoinCount(coinCount + 1);  
                                        break;
                                    case 'miss':
                                        if (sfxOn) playCollisionSound();
                                        setCurrentPoints(Math.max(currentPoints - 1, 0));
                                        break;
                                }
                            }}
                            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                        >
                            <StatusBar style="auto" hidden={true} />
                        </GameEngine>
                    </ImageBackground>
                </>
            ) : (
                <GameOverScreen
                    currentPoints={currentPoints}  
                    coinCount={coinCount}  
                    onRestart={handleRestart}
                    onShowHighscores={handleShowHighscores}
                    navigation={navigation}
                />
            )}
        </View>
    );
}
