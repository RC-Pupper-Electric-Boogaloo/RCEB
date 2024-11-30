import Constants from 'expo-constants';

const DarkTheme = (isDarkMode) => {
  return {
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
      alignItems: 'center',
      padding: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      color: isDarkMode ? '#FFF' : '#000',
      fontWeight: 'bold',
      marginBottom: 5,
    },
    list: {
      width: '100%',
      marginBottom: 20,
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
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    score: {
      fontSize: 18,
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },

    Label: {
      fontSize: 18,
      color: isDarkMode ? '#FFFFFF' : '#000000',
      fontWeight: 'bold',
    },
    Row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text: {
      fontSize: 16,
      lineHeight: 22,
      color: isDarkMode ? '#FFFFFF' : '#000000',
    },

        //GAMESCREEN
        pointsText: {
          textAlign: 'center',
          color: isDarkMode ? '#FFF' : '#000',
          fontSize: 40,
          fontWeight: 'bold',
          margin: 20,
          zIndex: 100,
          position: 'absolute',
          right: 20,
        },
        coinsText: {
          textAlign: 'center',
          color: isDarkMode ? '#FFF' : '#000',
          fontSize: 20,
          fontWeight: 'bold',
          position: 'absolute',
          top: 60,
          right: 20,
        },
    //BUTTONIT
    button: {
      backgroundColor: '#3498db',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      marginBottom: 5,
    },
    buttonTitle: {
      fontSize: 16,
      color: isDarkMode ? '#FFF' : '#000',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    activeButton: {
      backgroundColor: isDarkMode ? '#FF5722' : '#FF5722',
    },
    resetButton: {
      backgroundColor: isDarkMode ? '#F44336' : '#F44336',
    },
    returnButton: {
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 10,
      textAlign: 'center',
      backgroundColor: isDarkMode ? '#2196F3' : '#2196F3',
    },
    BButton: {
      backgroundColor: isDarkMode ? '#2196F3' : '#2196F3',
    },
 //Optionsview
    optionsContainer: {
      flex: 1,
      justifyContent: 'center',
    },

    shopLabel: {
      backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
      borderColor: isDarkMode ? "#ffffff" : "#1e1e1e",
      borderWidth: 1,
      fontSize: 18,
      color: isDarkMode ? '#FFFFFF' : '#000000',
      fontWeight: 'bold',
    },

    //SKINIT
    skinsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',      
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      alignItems: 'center',
      padding: 40,
      justifyContent: 'center',

    },
    skinBox: {
      width: 75,
      height: 75,
      margin: 2,
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

    //Mainmenu
    containerMainMenu: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      paddingTop: 200,
    },
    ButtonMainMenu: {
      backgroundColor: 'red',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginBottom: 10,
      width: '44%',
    },
    //StartScreen
    containerStart: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 50,
    },
  
  //highscore
  Hitem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
  },
  Hrank: {
      fontSize: 20,
      color: '#FFD700',
      fontWeight: 'bold',
  },
  Hscore: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
      flexShrink: 1,
  },

  // GameoverScreen
pointsTextGameOver: {
  fontSize: 30,
  color: 'white',
  marginBottom: 20,
},
coinsContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
},
coinImage: {
  width: 30,  
  height: 30, 
  marginRight: 10,
},
coinsTextGameOver: {
  fontSize: 25,
  color: 'white',
},

//GUIDESCREEN
Guidecontainer: {
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  padding: 10,
  borderRadius: 10,
  width: '90%',
  paddingTop: 20, 
},
Guidesection: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 10,
  backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
  padding: 10,
  borderRadius: 8,
},
Guideimage: {
  width: 80,
  height: 80,
  marginRight: 15,
  resizeMode: "contain",
},
GuideCenter: {
  flex: 1,
},
  };
};

export default DarkTheme;