import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, ImageBackground, View, Image, Text, TouchableOpacity } from 'react-native';
import SplashScreenComponent from './screens/SplashScreen'; 
import CreditsScreen from './screens/CreditsScreen'; 
import PlayScreen from './screens/PlayScreen';


const HomeScreen = ({ navigation }) => {
  const [backgroundImage, setBackgroundImage] = useState({
    uri: require('./assets/image1.png'), 
    opacity: 1, 
  });

  const handlePlayPress = () => navigation.navigate('PlayScreen');
  const handleCreditsPress = () => navigation.navigate('CreditsScreen');
  const handleOptionsPress = () => console.log('Options button pressed');

  return (
    <ImageBackground
      source={backgroundImage.uri}
      style={[styles.background, { opacity: backgroundImage.opacity }]}
    >
      <View style={styles.logoContainer}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.buttonsWrapper}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePlayPress}>
            <Image source={require('./assets/bouton1.png')} style={styles.buttonImage} />
            <View style={styles.overlayTextContainer}>
              <Text style={styles.overlayText}>Jouer</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleCreditsPress}>
            <Image source={require('./assets/bouton1.png')} style={styles.buttonImage} />
            <View style={styles.overlayTextContainer}>
              <Text style={styles.overlayText}>Crédits</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleOptionsPress}>
            <Image source={require('./assets/bouton1.png')} style={styles.buttonImage} />
            <View style={styles.overlayTextContainer}>
              <Text style={styles.overlayText}>Options</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => setBackgroundImage({ ...backgroundImage, opacity: 0.8 })}
        style={styles.optionButtonContainer}
      >
        <Image source={require('./assets/option1.png')} style={styles.optionButton} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

// Main App Component
const Stack = createStackNavigator();

const App = () => {
  const [isSplashFinished, setSplashFinished] = useState(false);

  const handleSplashFinish = () => setSplashFinished(true);

  if (!isSplashFinished) {
    return <SplashScreenComponent onFinish={handleSplashFinish} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PlayScreen" component={PlayScreen} />
        <Stack.Screen name="CreditsScreen" component={CreditsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// Styles for HomeScreen
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  buttonsWrapper: {
    flex: 2,
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20, 
  },
  buttonContainer: {
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  button: {
    alignItems: 'center',
    marginBottom: 20, 
  },
  buttonImage: {
    width: 250, 
    height: 80, 
    resizeMode: 'contain',
  },
  overlayTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlayText: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 5,
  },
  optionButtonContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 3,
  },
  optionButton: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});
