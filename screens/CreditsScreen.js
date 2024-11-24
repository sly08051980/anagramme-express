import React from 'react';
import { StyleSheet, ImageBackground, View, Text, TouchableOpacity, Image } from 'react-native';

const CreditsScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/image1.png')} 
      style={styles.background}
    >
      {/* Bouton retour en haut à gauche */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('../assets/retour.png')} 
          style={styles.backButtonImage}
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.text}>Crédits</Text>
        <Text style={styles.text}>Développé par SlyFly12</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 50, 
    left: 20, 
    zIndex: 2, 
  },
  backButtonImage: {
    width: 80, 
    height: 80, 
    resizeMode: 'contain', 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50, 
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
});

export default CreditsScreen;
