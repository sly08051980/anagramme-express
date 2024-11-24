import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

const SplashScreenComponent = ({ onFinish }) => {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (isVideoLoaded) {
      console.log('Video loaded');
      videoRef.current.playAsync();
    }
  }, [isVideoLoaded]);

  console.log('Rendering SplashScreenComponent');

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../assets/intro.mp4')} 
        style={styles.video}
        resizeMode="cover"
        shouldPlay
        isLooping={false}
        onLoad={() => {
          console.log('Video is loading');
          setIsVideoLoaded(true);
        }}
        onPlaybackStatusUpdate={(status) => {
          console.log('Playback status:', status);
          if (status.didJustFinish) {
            console.log('Video finished playing');
            onFinish(); 
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: '90%', // Ajustez ce pourcentage pour contrôler la largeur de la vidéo
    aspectRatio: 16 / 9, // Maintient le ratio d'aspect pour les vidéos 16:9
  },
});

export default SplashScreenComponent;
