import Constants from 'expo-constants'
import { Dimensions } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const DarkTheme = (isDarkMode) => {

  const insets = useSafeAreaInsets()
  const textWhite = '#FFFDFA'
  const labelOrange = isDarkMode ? 'rgba(227, 137, 17, 1)' : 'rgba(250, 165, 55, 1)'
  const themeBlue = '#3498db'
  const containerBackgroundColor = isDarkMode ? 'rgba(227, 137, 17, 0.9)' : 'rgba(250, 165, 55, 0.9)'

  return {
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    smallcontainer: {
      position: 'absolute',
      maxWidth: 450,
      right: 10,
      top: 10,
      alignItems: 'right',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 10,
      borderRadius: 8,
    },
    title: {
      fontSize: 24,
      color: themeBlue,
      fontWeight: 'bold',
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    name: {
      fontSize: 18,
      color: isDarkMode ? textWhite : '#000000',
    },
    score: {
      fontSize: 18,
      color: isDarkMode ? textWhite : '#000000',
    },
    label: {
      fontSize: 18,
      color: themeBlue,
      fontWeight: 'bold',
    },
    labelOrange: {
      fontSize: 18,
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
      backgroundColor: isDarkMode ? '#1e1e1e' : '#FFF9F3',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      lineHeight: 22,
      color: isDarkMode ? textWhite : '#000000',
    },

    //GAMESCREEN
    pointsText: {
      textAlign: 'center',
      color: isDarkMode ? '#FFF' : '#000',
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
      color: isDarkMode ? textWhite : '#000',
      fontSize: 20,
      fontWeight: 'bold',
      position: 'absolute',
      top: 60,
      right: 20,
    },

    //BUTTONIT
    button: {
      backgroundColor: themeBlue,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginBottom: 5,
    },
    buttonTitle: {
      fontSize: 16,
      color: textWhite,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    activeButton: {
      backgroundColor: isDarkMode ? '#FF5722' : '#FF5722',
    },
    resetButton: {
      backgroundColor: '#F44336',
      marginBottom: -5,
    },
    returnButton: {
      paddingVertical: 10,
      textAlign: 'center',
      marginTop: 16,
      marginBottom: 6,
      borderRadius: 10,
      textAlign: 'center',
      backgroundColor: '#2196F3',
      width: '60%',
    },
    bButton: { // shopin napit.
      backgroundColor: isDarkMode ? '#2196F3' : '#2196F3',
    },
    buttonStart: {
      backgroundColor: '#FD8A0B',
      paddingVertical: 15,
      textAlign: 'center',
      borderRadius: 10,
      marginBottom: 10,
      width: '44%',
    },

    //Optionsview
    optionsContainer: {
      flex: 1,
      justifyContent: 'center',
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
      borderRadius: 10,
      padding: 10,
      marginBottom: '65%',
    },
    optionsBottomContainer: {
      backgroundColor: containerBackgroundColor,
      width: '90%',
      borderRadius: 10,
      alignItems: 'center',
      padding: 5,
    },
    optionsRowContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },

    //SKINIT
    skinsContainer: {
      alignSelf: 'center', 
      flexDirection: 'row', 
      flexWrap: 'wrap', 
      justifyContent: 'center', 
      alignItems: 'center',
      paddingHorizontal: 10, 
      paddingVertical: 20, 
      backgroundColor: containerBackgroundColor, 
      borderRadius: 10, 
      marginHorizontal: windowWidth * 0.05,
    },
    skinsTextContainer: {
      alignSelf: 'center',
      flexDirection: 'column', // Käytä pystysuuntaa
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      backgroundColor: isDarkMode ? '#1e1e1e' : '#FFF9F3',
      borderRadius: 10,
      marginHorizontal: windowWidth * 0.05,
    },
    skinBox: {
      width: windowWidth / 6,
      height: windowWidth / 6,
      margin: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 10,
      overflow: 'hidden',
    },
    skinImage: {
      width: '100%',
      height: '100%',
      opacity: 0.5,
    },
    purchased: {
      opacity: 1,
    },
    selectedSkinBox: {
      borderWidth: 3,
      borderColor: 'gold',
    },
    signImage: {
      width: windowWidth / 4,
      height: windowWidth / 4,
    },
    //Mainmenu
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
      borderRadius: 10,
      marginBottom: 10,
      width: '55%',
    },

    //StartScreen
    containerStart: { // on myös shopScreenissä
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 50,
    },

    //GameoverScreen
    containerGameOver: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: containerBackgroundColor,
      width: '60%',
      padding: 20,
      borderRadius: 10,
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
      backgroundColor: isDarkMode ? '#1e1e1e' : textWhite,
      placeholderTextColor: '#FD8A0B',
      color: '#FD8A0B',
      textAlign: 'center',
      marginTop: 4,
      marginBottom: 12,
      borderRadius: 10,
    },
    gameOverButton: {
      backgroundColor: themeBlue,
      paddingVertical: 15,
      borderRadius: 10,
      marginBottom: 10,
      textAlign: 'center',
      width: '100%',
    },

    //guideScreen, statsScreen, achievementScreen ja highscoreScreen
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Constants.statusBarHeight + 8,
      marginBottom: insets.bottom,
    },
    colorContainer: {
      flex: 1,
      backgroundColor: containerBackgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
    screenHeader: {
      fontSize: 32,
      color: textWhite,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    scrollViewContent: {
      alignItems: 'center',
      borderRadius: 10,
      paddingRight: 8,
      width: '90%',
      marginBottom: 20,
      paddingBottom: 0,
    },
    guideSection: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      backgroundColor: isDarkMode ? "#1e1e1e" : "#FFF9F3",
      padding: 10,
      borderRadius: 10,
    },
    guideSectionLast: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#1e1e1e" : "#FFF9F3",
      padding: 10,
      borderRadius: 10,
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
  }
}

export default DarkTheme