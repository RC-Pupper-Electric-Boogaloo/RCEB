import Constants from 'expo-constants'
import { Dimensions } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const DarkTheme = (isDarkMode) => {

  const insets = useSafeAreaInsets()
  const textWhite = '#FFFDFA'
  const textBlack = '#190C00'
  const textColor = isDarkMode ? textWhite : textBlack
  const labelOrange = isDarkMode ? 'rgba(227, 137, 17, 1)' : 'rgba(250, 165, 55, 1)'
  const themeBlue = '#2196F3'
  const containerBackgroundColor = isDarkMode ? 'rgba(227, 137, 17, 0.9)' : 'rgba(250, 165, 55, 0.9)'
  const sectionBackgroundColor = isDarkMode ? '#190C00' : '#FFF5EB'
  const borderRadius = 10

  return {
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    title: {
      fontSize: 24,
      color: themeBlue,
      fontWeight: 'bold',
    },
    label: {
      fontSize: 18,
      color: themeBlue,
      fontWeight: 'bold',
    },
    labelOrange: {
      fontSize: 20,
      color: labelOrange,
      fontWeight: 'bold',
      textAlign: 'right',
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      backgroundColor: sectionBackgroundColor,
      borderRadius: borderRadius,
      padding: 10,
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      lineHeight: 22,
      color: textColor,
    },
    creditsText: {
      marginVertical: 10,
      fontSize: 16,
      lineHeight: 22,
      color: textColor,
      textAlign: 'center',
      color: textWhite,
    },

    //gameScreen
    pointsText: {
      textAlign: 'center',
      color: textColor,
      fontSize: 24,
      fontWeight: 'bold',
      margin: 20,
      marginBottom: 10,
      zIndex: 100,
      position: 'absolute',
      right: 10,
    },
    coinsText: {
      textAlign: 'center',
      color: textColor,
      fontSize: 20,
      fontWeight: 'bold',
      position: 'absolute',
      top: 60,
      right: 20,
    },

    //BUTTONIT
    button: {
      backgroundColor: themeBlue,
      paddingVertical: 1,
      paddingHorizontal: 10,
      borderRadius: borderRadius,
      marginBottom: 5,
    },
    buttonTitle: {
      fontSize: 16,
      color: textWhite,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    activeButton: {
      backgroundColor: '#FD8A0B',
    },
    resetButton: {
      backgroundColor: '#F44336',
    },
    returnButton: {
      paddingVertical: 10,
      textAlign: 'center',
      marginTop: 6,
      marginBottom: 6,
      borderRadius: borderRadius,
      textAlign: 'center',
      backgroundColor: themeBlue,
      width: '60%',
    },
    buttonStart: {
      backgroundColor: '#FD8A0B',
      paddingVertical: 15,
      textAlign: 'center',
      borderRadius: borderRadius,
      marginBottom: insets.bottom + 8,
      width: windowWidth * 0.44,
    },

    //optionsScreen
    optionsContainer: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: Constants.statusBarHeight + 8,
      marginBottom: insets.bottom + 8,
      width: '100%',
    },
    optionsColorContainer: {
      flex: 1,
      backgroundColor: containerBackgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      borderRadius: borderRadius,
      padding: 10,
      maxHeight: windowHeight / 2,
    },
    optionButtonContainer: {
      width: '90%',
      backgroundColor: containerBackgroundColor,
      borderRadius: borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
    },
    optionsRowContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },

    //mainMenuScreen
    containerMainMenu: { // on myös optionScreenissä
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      paddingTop: 200,
    },
    buttonMainMenu: {
      backgroundColor: '#FD8A0B',
      paddingVertical: 15,
      textAlign: 'center',
      borderRadius: borderRadius,
      marginBottom: 10,
      width: windowWidth * 0.55,
    },

    //startScreen
    containerStart: { // on myös shopScreenissä
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 50,
    },

    //gameOverScreen
    containerGameOver: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: containerBackgroundColor,
      width: windowWidth * 0.6,
      padding: 20,
      borderRadius: borderRadius,
    },
    pointsTextGameOver: {
      fontSize: 30,
      color: textWhite,
      marginBottom: 10,
    },
    coinsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    coinImage: {
      width: 30,
      height: 30,
      marginRight: 10,
      zIndex: 10,
    },
    coinsTextGameOver: {
      fontSize: 25,
      color: textWhite,
    },
    gameOverText: {
      fontSize: 18,
      color: textWhite,
      marginBottom: 8,
      textAlign: 'center',
    },
    initialsInput: {
      backgroundColor: isDarkMode ? textBlack : textWhite,
      placeholderTextColor: '#FD8A0B',
      color: '#FD8A0B',
      textAlign: 'center',
      marginTop: 4,
      marginBottom: 12,
      paddingVertical: 8,
      borderRadius: borderRadius,
    },
    gameOverButton: {
      backgroundColor: themeBlue,
      paddingVertical: 15,
      borderRadius: borderRadius,
      marginBottom: 10,
      textAlign: 'center',
      width: windowWidth * 0.5,
    },

    //guideScreen, statsScreen, achievementScreen ja highscoreScreen
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: Constants.statusBarHeight + 8,
      marginBottom: insets.bottom,
      width: '100%',
    },
    colorContainer: {
      flex: 1,
      backgroundColor: containerBackgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
      borderRadius: borderRadius,
      padding: 10,
      marginBottom: 10,
    },
    screenHeader: {
      fontSize: 32,
      color: textWhite,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    scrollViewContent: {
      alignItems: 'center',
      borderRadius: borderRadius,
      paddingRight: 8,
      width: '100%',
      marginBottom: 20,
      paddingBottom: 0,
    },
    guideSection: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      backgroundColor: sectionBackgroundColor,
      padding: 10,
      borderRadius: borderRadius,
    },
    guideSectionLast: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: sectionBackgroundColor,
      padding: 10,
      marginBottom: 0,
      borderRadius: borderRadius,
    },
    guideImage: {
      width: 80,
      height: 80,
      marginRight: 15,
      resizeMode: "contain",
    },
    guideCenter: {
      flex: 1,
    },
    statBox: {
      flex: 1,
      backgroundColor: sectionBackgroundColor,
      borderRadius: borderRadius,
      paddingBottom: 5,
    },

    //shopScreen
    shopHeaderContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: 8,
    },
    shopHeader: {
      width: '32%',
      paddingHorizontal: 6,
      borderRadius: borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
    },
    coinCountContainer: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius,
      padding: 5,
    },
    coinsTextShop: {
      textAlign: 'center',
      color: textWhite,
      fontSize: 20,
      fontWeight: 'bold',
      marginHorizontal: 10, // Asetetaan marginaali oikealle
    },
    skinsContainer: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%',
      borderRadius: borderRadius,
      padding: 5,
    },
    signImage: {
      width: windowWidth / 4,
      height: windowWidth / 4,
      position: 'absolute',
      top: Constants.statusBarHeight + 8, // Asetetaan 8px statusbarin alapuolelle
      left: windowWidth * 0.5, // Keskittää vaakasuunnassa
      marginLeft: -(windowWidth / 8), // Korjaa, jotta kuva on täysin keskitetty
    },
    coinImageSmall: {
      width: 10,
      height: 10,
      marginLeft: 10,
    },
    skinBox: {
      width: '45%',
      backgroundColor: '#190C00',
      borderRadius: borderRadius,
      alignItems: 'center',
      padding: 8,
      margin: 5,
      marginBottom: 15,
    },
    selectedSkinBox: {
      borderWidth: 3,
      borderColor: themeBlue,
    },
    activeSkinBox: {
      borderWidth: 3,
      borderColor: labelOrange,
    },
    purchased: {
      backgroundColor: '#FFF5EB',
    },
    skinImage: {
      width: 80,
      height: 80,
      marginBottom: 10,
    },
    skinName: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: labelOrange,
    },
    skinPrice: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      color: themeBlue,
    },
    buyButtonContainer: {
      backgroundColor: themeBlue,
      paddingVertical: 10,
      paddingHorizontal: 5,
      borderRadius: borderRadius,
      marginTop: 10,
      width: '100%',
    },
    buyButton: {
      backgroundColor: themeBlue,
      borderRadius: borderRadius,
      justifyContent: 'center',
      width: '100%',
    },
    shopButtonContainer: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 5,
      borderRadius: borderRadius,
      marginTop: 10,
      marginBottom: 10,
      width: '100%',
    },
    shopButton: {
      backgroundColor: sectionBackgroundColor,
      paddingVertical: 3,
      paddingHorizontal: 3,
      borderRadius: borderRadius,
      width: '30%',
      justifyContent: 'center',
    },
    shopButtonTitleOrange: {
      fontSize: 13,
      color: labelOrange,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    shopButtonTitle: {
      fontSize: 13,
      color: themeBlue,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  }
}

export default DarkTheme