import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DarkTheme from '../styles/theme';
import { useTheme } from '../components/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameEngine } from 'react-native-game-engine';
import entities from '../entities/menuentities';
import Physics from '../physics';

//Skinien importit
import Skin1 from '../assets/CharDog.png';
import Skin2 from '../assets/rcDocDog.png';
import Skin3 from '../assets/rcShopDog.png';
import Skin4 from '../assets/rcSilkeneer.png';
import Skin5 from '../assets/rcWinWhippet.png';
import Skin6 from '../assets/rcProfPoodle.png';
import Skin7 from '../assets/rcBusinessBorzoi.png';
import Skin8 from '../assets/rcPugLifePupper.png';
import Skin9 from '../assets/rcGentlePuppy.png';
import Skin10 from '../assets/rcTimeKeeper.png';
import Skin11 from '../assets/rcPiratePup.png';
import Skin12 from '../assets/rcPupperOg.png';

const ShopScreen = ({ navigation }) => {
  const Skins = [Skin1, Skin2, Skin3, Skin4, Skin5, Skin6, Skin7, Skin8, Skin9, Skin10, Skin11, Skin12];
  const SkinNames = [
    'RC Puppy', 'Doc Dog', 'ShopDog', 'Silken Engineer', 
    'Win Whippet', 'Professor Poodle', 'Business Borzoi', 
    'Maurice "PugLife" Pupper', 'Golden Puppy', 'Timekeeper Dachshund',
    'Pirate Corgi', 'OG RC Pupper'
  ];
  const SkinPrices = [0, 50, 100, 250, 500, 1000, 2500, 5000, 0, 0, 0, 0 ];

  const { isDarkMode } = useTheme();
  const styles = DarkTheme(isDarkMode);
  const gameEngine = useRef(null);

  const backgroundImage = isDarkMode
  ? require('../assets/Taustakuvatakatumma.jpg')
  : require('../assets/Taustakuvatakavaalea.jpg');

  const backdropImage = require('../assets/Taustakuva6ala.png'); 


  const [selectedSkin, setSelectedSkin] = useState(null);
  const [purchasedSkins, setPurchasedSkins] = useState([]);
  const [coinCount, setCoinCount] = useState(0); // Track coin count from AsyncStorage
  const [activeSkin, setActiveSkin] = useState(null);

  // Load purchased skins and coin count from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const mySkins = await AsyncStorage.getItem('purchasedSkins');
        if (mySkins) {
          setPurchasedSkins(JSON.parse(mySkins));
        }

        const storedCoinCount = await AsyncStorage.getItem('coinCount');
        if (storedCoinCount) {
          setCoinCount(JSON.parse(storedCoinCount)); // Set coin count from AsyncStorage
        }
        const updatedSkins = await AsyncStorage.getItem('purchasedSkins');
        let skinsArray = updatedSkins ? JSON.parse(updatedSkins) : [];
  
        if (!skinsArray.includes(0)) {
          skinsArray.push(0); 
          setPurchasedSkins(skinsArray);
  
          await AsyncStorage.setItem('purchasedSkins', JSON.stringify(skinsArray));
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage", error);
      }
    };
    loadData();
  }, []); // Empty dependency array to run this only once when the component mounts

  useEffect(() => {
    const loadActiveSkin = async () => {
      try {
        const storedActiveSkin = await AsyncStorage.getItem('activeSkin');
        if (storedActiveSkin) {
          setActiveSkin(JSON.parse(storedActiveSkin));
        }
      } catch (error) {
        console.error('Error loading active skin from AsyncStorage', error);
      }
    };
  
    loadActiveSkin();
  }, []);

  const selectSkin = (index) => {
    setSelectedSkin(index); // Salli skini-indeksin asettaminen aina
  };

  const activateSkin = async () => {
    if (purchasedSkins.includes(selectedSkin)) {
      setActiveSkin(selectedSkin); // Päivitä aktiivinen skini
      try {
        await AsyncStorage.setItem('activeSkin', JSON.stringify(selectedSkin));
      } catch (error) {
        console.error('Error saving active skin to AsyncStorage', error);
      }
    } else {
      alert('You must purchase the skin before using it!');
    }
  };

  const handlePurchase = async () => {
    if (selectedSkin === null) {
      return;
    }

    const skinPrice = SkinPrices[selectedSkin];
    if (coinCount >= skinPrice) {
      // Update purchased skins and coins after successful purchase
      const updatedSkins = [...purchasedSkins, selectedSkin];
      setPurchasedSkins(updatedSkins);
      setCoinCount(coinCount - skinPrice); // Subtract the cost of the skin from coin count

      // Save the updated data to AsyncStorage
      try {
        await AsyncStorage.setItem('purchasedSkins', JSON.stringify(updatedSkins));
        await AsyncStorage.setItem('coinCount', JSON.stringify(coinCount - skinPrice));
      } catch (error) {
        console.error("Error saving data to AsyncStorage", error);
      }
    } else {
      alert("You don't have enough coins!");
    }
  };

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
          <Text style={styles.title}>Shop</Text>
          <Text style={styles.Label}>Your Coins: {coinCount}</Text>

          <View style={styles.skinsContainer}>
            {Skins.map((skin, index) => {
              if (index === 8 && !purchasedSkins.includes(index)) {
                return null; 
              }
              if (index === 9 && !purchasedSkins.includes(index)) {
                return null; 
              }
              if (index === 10 && !purchasedSkins.includes(index)) {
                return null; 
              }
              if (index === 11 && !purchasedSkins.includes(index)) {
                return null; 
              }
              const isPurchased = purchasedSkins.includes(index);
              const isSelected = selectedSkin === index;
            return (
              <TouchableOpacity 
                key={index} 
                style={[styles.skinBox, isSelected && styles.selectedSkinBox, isPurchased && styles.purchased]}
                onPress={() => selectSkin(index)}
              >
                <Image source={skin} style={[styles.skinImage, isPurchased && styles.purchasedSkin]} />
              </TouchableOpacity>
              );
            })}
          </View>
          
          <View style={styles.optionsContainer}>
          {selectedSkin !== null && (
            <>
              <Text style={styles.Label}>Name: {SkinNames[selectedSkin]}</Text>
              {!purchasedSkins.includes(selectedSkin) && (
                <Text style={styles.Label}>Price: {SkinPrices[selectedSkin]} Coins</Text>
              )}
            </>
          )}
         {/*  
       <TouchableOpacity style={[styles.button, styles.TLButton]} onPress={() => alert('Try Your Luck nappi toimii')}>
         <Text style={styles.buttonTitle}>Try Your Luck 20 Coins</Text>
       </TouchableOpacity>
    
        <TouchableOpacity style={[styles.button, styles.RAdsButton]} onPress={() => alert('Remove Ads nappi toimii')}>
         <Text style={styles.buttonTitle}>Remove Ads 3€</Text>
        </TouchableOpacity>
      
       <TouchableOpacity style={[styles.button, styles.WAdButton]} onPress={() => alert('Watch Ad nappi toimii')}>
          <Text style={styles.buttonTitle}>Watch Ad for Coin</Text>
       </TouchableOpacity>
      */}
      </View>
      {selectedSkin !== null && (purchasedSkins.includes(selectedSkin) ? (
        <TouchableOpacity style={[styles.button, styles.BButton]} onPress={activateSkin}>
          <Text style={styles.buttonTitle}>Use</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.button, styles.BButton]} onPress={handlePurchase}>
          <Text style={styles.buttonTitle}>Buy</Text>
        </TouchableOpacity>
      ))}

        <TouchableOpacity style={[styles.button, styles.returnButton]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonTitle}>Return</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ShopScreen;
