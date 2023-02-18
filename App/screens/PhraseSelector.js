import { View, StyleSheet, Dimensions, Text} from 'react-native';
import React, { useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient'
import { Button } from '@rneui/themed'
import { supabase } from '../lib/supabase';
import createWordList from '../lib/createWordList';

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

function PhraseSelector({navigation, route}) {

    // set up word lists  
    // create state with words


    const lang = route.params.lang;
    const langCode= route.params.langCode;

    const [words, setWords] = useState(createWordList(langCode));

    // Set up state for sentence

    const selfintroduction = [
        {
            "id": -1,
            "type": "subject",
            "word": "SUBJECT",
        },
        {
            "id": -2,
            "type": "verb",
            "word": "VERB",
        },
        {
            "id": -3,
            "type": "noun",
            "word": "NOUN",
        }  
    ]

    const basic = [
        {
            "id": -1,
            "type": "subject",
            "word": "SUBJECT",
        },
        {
            "id": -2,
            "type": "verb",
            "word": "VERB",
        },
        {
            "id": -3,
            "type": "noun",
            "word": "NOUN",
        }  
    ]
    
    const anything = [
        {
            "id": -1,
            "type": "subject",
            "word": "SUBJECT",
        },
        {
            "id": -2,
            "type": "verb",
            "word": "VERB",
        },
        {
            "id": -3,
            "type": "adjective",
            "word": "ADJECTIVE",
        },
        {
            "id": -4,
            "type": "noun",
            "word": "NOUN",
        }  
    ]

    const renderButtons = () => { 
        return (
            <View>
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>What do you want to say?</Text>
                </View>     
                <View style={styles.buttonsContainer}>
                    <View style={styles.phrasebookContainer}>
                        <Button buttonStyle={{ backgroundColor: '#FFC107', width: 200}} onPress={() => navigation.navigate('Build', {words: words, setWords: setWords, lang: lang, langCode: langCode, sentenceInit: selfintroduction})}>Introduce myself</Button>
                    </View>
                    <View style={styles.phrasebookContainer}>
                        <Button buttonStyle={{ backgroundColor: '#FFC107', width: 200}} onPress={() => navigation.navigate('Build', {words: words, setWords: setWords, lang: lang, langCode: langCode, sentenceInit: basic})}>Describe people and things</Button>
                    </View>
                    <View style={styles.phrasebookContainer}>
                        <Button buttonStyle={{ backgroundColor: '#FFC107', width: 200}} onPress={() => navigation.navigate('Build', {words: words, setWords: setWords, lang: lang, langCode: langCode, sentenceInit: anything})}>Anything!</Button>
                    </View>
                </View>
            </View>
        )
    } 
  
    return (
      <View style={styles.mainContainer}>
        <LinearGradient 
        colors={['#9F00B9', '#FFDC61']}
        locations={[0, .99]}
        style={styles.linearGradient}
        />
        <View style={styles.bottomContainer}>                    
          {renderButtons()}
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    topContainer: {
      flex: 1,
      paddingTop: PAGE_HEIGHT/10,      
    },
    linearGradient: {
      position: 'absolute',
      height: PAGE_HEIGHT,
      left: 0,
      right: 0,
      top: 0,    
    },
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', 
      padding: 10
    },
    bottomContainer: {
      display: 'flex',
      padding: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT*.8
  },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: PAGE_WIDTH,
    },
    mainText: {
      fontSize: 54,
      color: "white",
      textAlign: 'center',
     },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 10
    },
    phrasebookContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 10
    },
    logOutContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 10
    },      
  })

export default PhraseSelector