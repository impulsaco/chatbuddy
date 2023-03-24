import { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, Text, Dimensions} from "react-native";
import PersonIcon from '../../assets/person.svg'
import RunnerIcon from '../../assets/runner.svg'
import IdentityIcon from '../../assets/identity.svg'
import AppleIcon from '../../assets/apple.svg'
import SentenceWord from './SentenceWord';

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const WordMenu = ({ state, navigation, forward, setForward, words, sentence, setSentence}) => {


  useEffect(() => {
  }, [sentence])

  // Move forward if new word entered

  useEffect(() => {
    if (forward !== "") {
      navigation.navigate(forward);
      setForward("")
    }
  }, [forward]) 

  // Sets background color of tabs if pressed (disabled for now)
  const color = (pageName, currentIndex) => {
    const nameArray = state.routeNames
    if (currentIndex === nameArray.indexOf(pageName)) {
      return 'rgba(0, 0, 0, 0)'
      // return 'rgba(242, 242, 242, 0.5)' // tab color
    }
    else {
      return 'rgba(0, 0, 0, 0)'
    }
  }

  const tabButton = (word, index) => {
    const isFocused = state.index === index; // Checks if the current page is the same as the page in the array 
    return (   
    <View style={[styles.wordContainer, {backgroundColor: color(word.type, state.index)}]}>
      <Pressable
          key={`wordmenu-${index}`}
          style={styles.button}
          
          onPress={() => {
              const event = navigation.emit({
              type: 'tabPress',
              target: word.key,
              canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved

              navigation.navigate({ name: word.type, merge: true });              
              }
          }}
          >
          <SentenceWord 
            key={index} 
            word={word} 
            index={index} 
            words={words} 
            sentence={sentence} 
            setSentence={setSentence}
            forward={forward} 
            setForward={setForward}            
          />
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
      {(sentence || []).map(
        (word, index) => {
          return (
            tabButton(word, index)
          )
        }
      )}         
    </View>
  </View>
  )  
}

const styles = StyleSheet.create({
  container:
  {
    alignItems: 'center',
    height: PAGE_HEIGHT*.07,
  },
  buttonsContainer: {
    flexDirection: 'row',
  
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    height: PAGE_HEIGHT*.07,
    width: PAGE_WIDTH,    
    padding: 10,
    marginBottom: PAGE_HEIGHT*.01,

  },
  wordContainer:
  {
    justifyContent: 'center',
    alignItems: 'center',
    height: PAGE_HEIGHT*.07,
    width: PAGE_WIDTH*.2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  button: {
    padding: 10
  },
});

export default WordMenu;