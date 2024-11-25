import React, { useState, useEffect, useRef } from "react"
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Image} from "react-native"
import { StatusBar } from 'expo-status-bar';
import DarkTheme from '../styles/theme'
import { useTheme } from '../components/Theme'
import { GameEngine } from 'react-native-game-engine';
import entities from '../entities/menuentities';
import Physics from '../physics';

const GuideScreen = ({navigation}) => {
    const { isDarkMode } = useTheme()
    const styles = DarkTheme(isDarkMode)
    const gameEngine = useRef(null)
  
    const backgroundImage = isDarkMode
    ? require('../assets/Taustakuvatakatumma.jpg')
    : require('../assets/Taustakuvatakavaalea.jpg')
  
    const backdropImage = require('../assets/Taustakuva8ala.png');
    return (
    <ImageBackground 
        source={backgroundImage} 
        style={styles.Hbackground}
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

     
        <ScrollView contentContainerStyle={styles.Guidecontainer}>
            <Text style={styles.Guidetitle}>Guide</Text>

            <View style={styles.Guidesection}>
                <Image
                    source={require('../assets/CharDog.png')}
                    style={styles.Guideimage}
                    />
                <View style={styles.GuideCenter}>
                    <Text style={styles.sectionTitle}>Playing</Text>
                    <Text style={styles.Guidetext}>
                    Move puppy with your finger
                    </Text>
                </View>
            </View>
            
            <View style={styles.Guidesection}>
                <Image
                    source={require('../assets/Point.png')}
                    style={styles.Guideimage}
                />
                <View style={styles.GuideCenter}>
                    <Text style={styles.sectionTitle}>Points</Text>
                    <Text style={styles.Guidetext}>
                    The bone is point
                    </Text>
                </View>
            </View>

            <View style={styles.Guidesection}>
                <Image
                    source={require('../assets/Coin.png')}
                    style={styles.Guideimage}
                />
                <View style={styles.GuideCenter}>
                    <Text style={styles.sectionTitle}>Coin</Text>
                    <Text style={styles.Guidetext}>
                    Collect coins and use them in store
                    </Text>
                </View>
            </View>

            <View style={styles.Guidesection}>
                <Image
                    source={require('../assets/Choco.png')}
                    style={styles.Guideimage}
                />
                <View style={styles.GuideCenter}>
                    <Text style={styles.sectionTitle}>Choco</Text>
                    <Text style={styles.Guidetext}>
                    Chocolate steals one point
                    </Text>
                </View>
            </View>

            <View style={styles.Guidesection}>
                <Image
                    source={require('../assets/Cat.png')}
                    style={styles.Guideimage}
                    />
                <View style={styles.GuideCenter}>
                    <Text style={styles.sectionTitle}>Cat</Text>
                    <Text style={styles.Guidetext}>
                    Cat ends the game if you hit it
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={[styles.button, styles.GuidereturnButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonTitle}>Return</Text>
      </TouchableOpacity>
        </ScrollView>
    </ImageBackground>
    )
}

export default GuideScreen;
