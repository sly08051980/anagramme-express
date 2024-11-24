import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';

const PlayScreen = ({ navigation }) => {
  const phrase = 'il n’y a que les montagnes qui ne se rencontrent jamais';
  const traitWidth = 25; 
  const spaceWidth = 20; 
  const maxCharsPerLine = 14; 

  const lettres = phrase.replace(/ /g, '').split('').filter(char => char !== '’' && char !== "'");

  const countOccurrences = (array) => {
    return array.reduce((acc, lettre) => {
      acc[lettre] = (acc[lettre] || 0) + 1;
      return acc;
    }, {});
  };

  const occurrences = countOccurrences(lettres);
  const lettresUniques = Object.keys(occurrences);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const [lettresMelangees, setLettresMelangees] = useState([]);
  const [selectedTrait, setSelectedTrait] = useState(null);
  const [traitsLetters, setTraitsLetters] = useState([]);
  const [letterCounts, setLetterCounts] = useState({ ...occurrences });

  useEffect(() => {
    setLettresMelangees(shuffleArray(lettresUniques));

   
    const initialTraits = phrase.split('').map((char, index) => {
      if (char === ' ') {
        return ' ';
      } else if (char === '’' || char === "'") {
        return char; 
      } else {
        return null;
      }
    });

    setTraitsLetters(initialTraits);


    const firstEmptyTrait = initialTraits.findIndex(char => char === null);
    if (firstEmptyTrait !== -1) {
      setSelectedTrait(firstEmptyTrait);
    }
  }, []);

  const handleTraitPress = (index) => {
    setSelectedTrait(index);
  };

  const handleLetterPress = (lettre) => {
    if (letterCounts[lettre] <= 0) return;

    if (selectedTrait !== null && traitsLetters[selectedTrait] === null) {
      const updatedTraitsLetters = [...traitsLetters];
      updatedTraitsLetters[selectedTrait] = lettre.toUpperCase(); 
      setTraitsLetters(updatedTraitsLetters);
      setLetterCounts((prevCounts) => ({
        ...prevCounts,
        [lettre]: prevCounts[lettre] - 1,
      }));

      
      let nextEmptyTrait = -1;
      for (let i = selectedTrait + 1; i < updatedTraitsLetters.length; i++) {
        if (updatedTraitsLetters[i] === null && phrase[i] !== ' ') {
          nextEmptyTrait = i;
          break;
        }
        if (phrase[i] === ' ') break; 
      }

      
      if (nextEmptyTrait === -1) {
        nextEmptyTrait = updatedTraitsLetters.findIndex((char, index) => char === null && phrase[index] !== ' ');
      }

      setSelectedTrait(nextEmptyTrait !== -1 ? nextEmptyTrait : null);
    }
  };

  const handleRemoveLetter = () => {
    if (
      selectedTrait !== null &&
      traitsLetters[selectedTrait] !== null &&
      traitsLetters[selectedTrait] !== ' ' &&
      traitsLetters[selectedTrait] !== '’' && 
      traitsLetters[selectedTrait] !== "'"    
    ) {
      const lettreToRemove = traitsLetters[selectedTrait];
      const updatedTraitsLetters = [...traitsLetters];
      updatedTraitsLetters[selectedTrait] = null;

      setTraitsLetters(updatedTraitsLetters);
      setLetterCounts((prevCounts) => ({
        ...prevCounts,
        [lettreToRemove]: prevCounts[lettreToRemove] + 1,
      }));

      setSelectedTrait(null); 
    }
  };

  const renderTraits = () => {
    const traits = [];
    let currentLine = [];
    let currentCharCount = 0;
    let currentWord = [];

    for (let i = 0; i < traitsLetters.length; i++) {
      const char = phrase[i];
      const isSpace = char === ' ';

      if (isSpace) {
        if (currentCharCount + currentWord.length + 1 > maxCharsPerLine) {
          traits.push([...currentLine]);
          currentLine = [];
          currentCharCount = 0;
        }

        currentLine = [...currentLine, ...currentWord, <View key={`space-${i}`} style={{ width: spaceWidth }} />];
        currentCharCount += currentWord.length + 1;
        currentWord = [];
      } else {
        currentWord.push(
          <TouchableOpacity
            key={`trait-${i}`}
            onPress={() => handleTraitPress(i)}
            style={[
              styles.trait,
              selectedTrait === i && styles.traitSelected,
            ]}
          >
            {traitsLetters[i] && (
              <Text style={styles.traitLetter}>{traitsLetters[i].toUpperCase()}</Text>
            )}
          </TouchableOpacity>
        );
      }
    }

    if (currentWord.length > 0) {
      if (currentCharCount + currentWord.length > maxCharsPerLine) {
        traits.push(currentLine);
        currentLine = [];
      }
      currentLine = [...currentLine, ...currentWord];
    }

    if (currentLine.length > 0) {
      traits.push(currentLine);
    }

    return traits.map((line, lineIndex) => (
      <View key={`line-${lineIndex}`} style={styles.traitLineContainer}>
        {line}
      </View>
    ));
  };

  return (
    <ImageBackground
      source={require('../assets/image1.png')}
      style={styles.background}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('../assets/retour.png')}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.boutonLigneContainer}>
          <Image
            source={require('../assets/boutonligne.png')}
            style={styles.boutonLigne}
          />
          <Text style={styles.boutonLigneText} numberOfLines={0}>
            {phrase}
          </Text>
        </View>

        <View style={styles.traitContainer}>
          {renderTraits()}
        </View>

        <View style={styles.letterImageContainer}>
          {lettresMelangees.map((lettre, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.boutonLettreContainer,
                letterCounts[lettre] <= 0 && styles.boutonLettreDisabled,
              ]}
              onPress={() => handleLetterPress(lettre)}
              disabled={letterCounts[lettre] <= 0}
            >
              <Image
                source={require('../assets/boutonlettre.png')}
                style={styles.boutonLettre}
              />
              {occurrences[lettre] > 1 && (
                <Text style={styles.occurrenceText}>{letterCounts[lettre]}</Text>
              )}
              <Text style={styles.lettreText}>{lettre.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actionButtonsContainer}>
          {/* Bouton effacer */}
          <TouchableOpacity style={styles.boutonLettreContainer} onPress={handleRemoveLetter}>
            <Image
              source={require('../assets/effacer.png')}
              style={styles.boutonLettre}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.boutonLettreContainer}>
            <Image
              source={require('../assets/valider.png')}
              style={styles.boutonLettre}
            />
          </TouchableOpacity>
        </View>
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
    top: 20,
    left: 0,
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
    paddingTop: 0,
    paddingBottom: '30%',
    paddingLeft: 20,
  },
  boutonLigneContainer: {
    position: 'relative',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '45%',
  },
  boutonLigne: {
    width: '100%',
    height: 150,
    resizeMode: 'stretch',
  },
  boutonLigneText: {
    position: 'absolute',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 30,
    flexWrap: 'wrap',
  },
  traitContainer: {
    marginTop: 20,
    paddingLeft: 20,
  },
  traitLineContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  trait: {
    width: 25,
    height: 28,
    backgroundColor: 'lightgray',
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  traitSelected: {
    borderColor: 'blue',
    borderWidth: 1,
  },
  traitLetter: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
  },
  letterImageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  boutonLettreContainer: {
    position: 'relative',
    margin: 2,
    alignItems: 'center',
  },
  boutonLettre: {
    width: 60,
    height: 60,
  },
  boutonLettreDisabled: {
    opacity: 0.5,
  },
  lettreText: {
    position: 'absolute',
    left: '35%',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
    top: '10%',
  },
  occurrenceText: {
    position: 'absolute',
    top: -5,
    right: -5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default PlayScreen;
