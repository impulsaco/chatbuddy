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

  // Move forward if new word entered

  useEffect(() => {
    if (forward !== "") {
      navigation.navigate(forward);
      setForward("")
    }
  }, [forward]) 

  // Sets color of icons if pressed
  const color = (pageName, currentIndex) => {
    
    const nameArray = state.routeNames
    if (currentIndex === nameArray.indexOf(pageName)) {
      return 'rgba(242, 242, 242, 0.5)'
    }
    else {
      return 'rgba(0, 0, 0, 0)'
    }
  }

  // Used SVG to be able to change the color of the icons exported from Figma.
  const icon = (pageName, currentIndex) => {
    /*if (pageName === 'subject') return <PersonIcon fill={color(pageName, currentIndex)} />
    if (pageName === 'verb') return <RunnerIcon fill={color(pageName, currentIndex)} />
    if (pageName === 'adjective') return <IdentityIcon fill={color(pageName, currentIndex)} />
    if (pageName === 'noun') return <AppleIcon fill={color(pageName, currentIndex)} />
    return pageName;*/
    return <View></View>
  }


  const [backgroundColor, setBackgroundColor] = useState('rgba(0, 0, 0, 0)')

  useEffect((pageName, currentIndex) => {
    setBackgroundColor(color(pageName, currentIndex))
  }, [state.index])

  const tabButton = (word, index) => {
    const isFocused = state.index === index; // Checks if the current page is the same as the page in the array 
    return (   
    <View style={[styles.wordContainer, {backgroundColor: backgroundColor}]}>
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
          { icon(word.type, state.index) }
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
  },
  buttonsContainer: {
    flexDirection: 'row',
  
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: PAGE_WIDTH*.7,
    height: PAGE_HEIGHT*.1,
    padding: 10,
  },
  wordContainer:
  {
    //backgroundColor: ,
    justifyContent: 'center',
    alignItems: 'center',
    height: PAGE_HEIGHT*.1,
    width: PAGE_WIDTH*.2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

  },
  button: {
    padding: 10
  },
});

export default WordMenu;