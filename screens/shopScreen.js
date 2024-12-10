import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import DarkTheme from '../styles/theme'
import { useTheme } from '../components/Theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GameEngine } from 'react-native-game-engine'
import entities from '../entities/menuentities'
import Physics from '../physics'

//Skinien importit
import Skin1 from '../assets/CharDog.png'
import Skin2 from '../assets/rcDocDog.png'
import Skin3 from '../assets/rcShopDog.png'
import Skin4 from '../assets/rcSilkeneer.png'
import Skin5 from '../assets/rcBreakBernard.png'
import Skin6 from '../assets/rcProfPoodle.png'
import Skin7 from '../assets/rcBusinessBorzoi.png'
import Skin8 from '../assets/rcPugLifePupper.png'
import Skin9 from '../assets/rcGentlePuppy.png'
import Skin10 from '../assets/rcTimeKeeper.png'
import Skin11 from '../assets/rcPiratePup.png'
import Skin12 from '../assets/rcBonusPuppy.png'
import Skin13 from '../assets/rcSgtWoofer.png'
import Skin14 from '../assets/rcMeclarBeagle.png'
import Skin15 from '../assets/rcPowerPuppy.png'
import Skin16 from '../assets/rcWinWhippet.png'
import Skin17 from '../assets/rcFluffers.png'
import Skin18 from '../assets/rcCrashBuldog.png'
import Skin19 from '../assets/rcPupperOg.png'
import Skin20 from '../assets/Random.png'

const ShopScreen = ({ navigation }) => {
  const Skins = [Skin1, Skin2, Skin3, Skin4, Skin5, Skin6, Skin7, Skin8, Skin9, Skin10, Skin11, Skin12, Skin13, Skin14, Skin15, Skin16, Skin17, Skin18, Skin19, Skin20]
  const SkinNames = [
    'RC Puppy', 'Doc Dog', 'ShopDog', 'Silken Engineer',
    'Saint Bernard', 'Professor Poodle', 'Business Borzoi',
    'Maurice "PugLife" Pupper', 'Golden Puppy', 'Timekeeper Dachshund',
    'Pirate Corgi', 'Bonus Pupper', 'Sergeant Woofer', 'Merchant Beagle',
    'Power Puppy Pampai', 'Win Whippet', 'Precious', 'Crash Buldog',
    'OG RC Pupper', 'Random'
  ]
  const SkinPrices = [0, 50, 100, 250, 500, 1000, 2500, 5000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  const { isDarkMode } = useTheme()
  const styles = DarkTheme(isDarkMode)
  const gameEngine = useRef(null)

  const backgroundImage = isDarkMode
    ? require('../assets/Taustakuvatakatumma.jpg')
    : require('../assets/Taustakuvatakavaalea.jpg')

  const backdropImage = require('../assets/Taustakuva6ala.png')


  const [selectedSkin, setSelectedSkin] = useState(null)
  const [purchasedSkins, setPurchasedSkins] = useState([])
  const [coinCount, setCoinCount] = useState(0) // Track coin count from AsyncStorage
  const [activeSkin, setActiveSkin] = useState(null)

  // Load purchased skins and coin count from AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const mySkins = await AsyncStorage.getItem('purchasedSkins');
        if (mySkins) {
          setPurchasedSkins(JSON.parse(mySkins))
        }

        const storedCoinCount = await AsyncStorage.getItem('coinCount')
        if (storedCoinCount) {
          setCoinCount(JSON.parse(storedCoinCount)) // Set coin count from AsyncStorage
        }
        const updatedSkins = await AsyncStorage.getItem('purchasedSkins')
        let skinsArray = updatedSkins ? JSON.parse(updatedSkins) : []

        if (!skinsArray.includes(0)) {
          skinsArray.push(0);
          setPurchasedSkins(skinsArray)

          await AsyncStorage.setItem('purchasedSkins', JSON.stringify(skinsArray))
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage", error)
      }
    }
    loadData();
  }, []); // Empty dependency array to run this only once when the component mounts

  useEffect(() => {
    const loadActiveSkin = async () => {
      try {
        const storedActiveSkin = await AsyncStorage.getItem('activeSkin')
        if (storedActiveSkin) {
          setActiveSkin(JSON.parse(storedActiveSkin))
        }
      } catch (error) {
        console.error('Error loading active skin from AsyncStorage', error)
      }
    }

    loadActiveSkin()
  }, [])

  const selectSkin = (index) => {
    setSelectedSkin(index) // Salli skini-indeksin asettaminen aina
  }

  const activateSkin = async () => {
    if (purchasedSkins.includes(selectedSkin)) {
      setActiveSkin(selectedSkin); // Päivitä aktiivinen skini
      try {
        await AsyncStorage.setItem('activeSkin', JSON.stringify(selectedSkin))
        alert('Skin activated!')
      } catch (error) {
        console.error('Error saving active skin to AsyncStorage', error)
      }
    } else {
      alert('You must purchase the skin before using it!')
    }
  }

  const handlePurchase = async () => {
    if (selectedSkin === null) {
      return
    }

    const skinPrice = SkinPrices[selectedSkin]
    if (coinCount >= skinPrice) {
      // Update purchased skins and coins after successful purchase
      const updatedSkins = [...purchasedSkins, selectedSkin]
      setPurchasedSkins(updatedSkins)
      setCoinCount(coinCount - skinPrice)

      try {
        await AsyncStorage.setItem('purchasedSkins', JSON.stringify(updatedSkins))
        await AsyncStorage.setItem('coinCount', JSON.stringify(coinCount - skinPrice))
      } catch (error) {
        console.error("Error saving data to AsyncStorage", error)
      }
    } else {
      alert("You don't have enough coins!");
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
      <View style={styles.container}>
        <View style={styles.colorContainer}>
          <View style={styles.shopHeaderContainer}>
            <View style={styles.shopHeader}></View>
            <Text style={styles.shopHeader}>
              <Image source={require('../assets/sign.png')} style={styles.signImage} />
            </Text>
            <View style={styles.shopHeader}>
              <View style={styles.coinCountContainer}>
                <Text style={styles.coinsTextShop}>
                  {coinCount > 9999 ? 9999 : coinCount}
                </Text>
                <Image source={require('../assets/Coin.png')} style={styles.coinImage} />
              </View>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.skinsContainer}>
            {Skins.map((skin, index) => {
              if (index >= 8 && !purchasedSkins.includes(index)) {
                return null
              }
              const isPurchased = purchasedSkins.includes(index)
              const isSelected = selectedSkin === index
              const isActive = activeSkin === index

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.skinBox,
                    isSelected && styles.selectedSkinBox,
                    isActive && styles.activeSkinBox,
                    isPurchased && styles.purchased,
                  ]}
                  onPress={() => selectSkin(index)}
                >
                  <Image source={skin} style={styles.skinImage} />
                  <Text style={styles.skinName}>{SkinNames[index]}</Text>
                  <Text style={styles.skinPrice}>
                    {isPurchased ? (
                      isActive ? 'Chosen' : 'Adopted'
                    ) : (
                      <>
                        {`${SkinPrices[index]} `}
                        <Image source={require('../assets/Coin.png')} style={styles.coinImageSmall} />
                      </>
                    )}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
          {selectedSkin === null ? (
            <View style={styles.buyButtonContainer}>
              <TouchableOpacity
                style={[styles.buyButton, { opacity: selectedSkin === null || purchasedSkins.includes(selectedSkin) ? 0.5 : 1 }]}
                onPress={handlePurchase}
                disabled={selectedSkin === null || purchasedSkins.includes(selectedSkin)}
              >
                <Text style={styles.buttonTitle}>BUY</Text>
              </TouchableOpacity>
            </View>
          ) : purchasedSkins.includes(selectedSkin) ? (
            <View style={styles.buyButtonContainer}>
              <TouchableOpacity style={[styles.buyButton, { opacity: activeSkin === selectedSkin ? 0.5 : 1 }]} onPress={activateSkin} disabled={activeSkin === selectedSkin}>
                <Text style={styles.buttonTitle}>USE</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.buyButtonContainer}>
              <TouchableOpacity style={styles.buyButton} onPress={handlePurchase}>
                <Text style={styles.buttonTitle}>BUY</Text>
              </TouchableOpacity>
            </View>
          )}
          {/*
          <View style={styles.shopButtonContainer}>
            <TouchableOpacity style={[styles.shopButton]} onPress={() => alert('Try Your Luck nappi toimii')}>
              <Text style={styles.shopButtonTitleOrange}>LUCKY SKIN{'\n'}</Text>
              <Text style={styles.shopButtonTitle}>20 COINS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shopButton]} onPress={() => alert('Remove Ads nappi toimii')}>
              <Text style={styles.shopButtonTitleOrange}>REMOVE ADS{'\n'}</Text>
              <Text style={styles.shopButtonTitle}>3 €</Text>
            </TouchableOpacity>            
            <TouchableOpacity style={[styles.shopButton]} onPress={() => alert('Watch Ad nappi toimii')}>
              <Text style={styles.shopButtonTitleOrange}>WATCH AD{'\n'}</Text>
              <Text style={styles.shopButtonTitle}>FOR 50 <Image source={require('../assets/Coin.png')} style={styles.coinImageSmall} /></Text>
            </TouchableOpacity>            
          </View>
          */}
          <TouchableOpacity style={styles.returnButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonTitle}>RETURN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground >
  )
}

export default ShopScreen
