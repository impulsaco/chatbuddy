import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, View, StyleSheet } from "react-native";
import { SceneMap } from 'react-native-tab-view';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider, DraxScrollView } from 'react-native-drax';
import VoiceSentence from "../screens/Sentence"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DraggableWord from '../components/DraggableWord';
import WordMenu from '../components/WordMenu';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient'
import AddWord from '../components/AddWord';
import { supabase } from '../lib/supabase';
import WordRoute from '../lib/WordRoute';
import { LanguageContext } from '../lib/LanguageContext';


const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

export default ({ navigation, route }) => {

    // set up translations toggle 

    const [translations, setTranslations] = useState(true)

    
    // Import params

    const { langCode, setLangCode, lang, setLang } = useContext(LanguageContext);        
    
    const wordSet = route.params.wordSet;

    let createWordList = wordSet(langCode)
    
    // Update based on language context
    useEffect((createWordList) => {
        createWordList = wordSet(langCode)
        setWords(createWordList[2])
        setSentenceInit(createWordList[1])
        setSentenceType(createWordList[0])
    }, [route.params, langCode])

    

    const [words, setWords] = useState(createWordList[2]);
    
    const [sentenceInit, setSentenceInit] = useState(createWordList[1]);

    const [sentenceType, setSentenceType] = useState(createWordList[0]);

    const routeList = sentenceInit.map(item => item.type);

    // Load user words and set up state for it

    const [userWords, setUserWords] = useState([])

    const [sentence, setSentence] = useState(sentenceInit); // Sets the initial sentence state, will be modified on drag or tap
      // SHOULD BE USEEFFECT FOR UPDATING

    // Updates word boxes to load on choose phrase structure
    useEffect(() => {
        setSentence(createWordList[1])
        setSentenceType(createWordList[0])
        setSentenceInit(createWordList[1])
        setWords(createWordList[2])
    }, [route.params])

    // Retrieve session

  const [session, setSession] = useState()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  // Fetch user-created words based on session

  let wordsLang

  useEffect(() => {    
    if (lang === "ko") {
        wordsLang = 'wordsKo'
    }

    if (lang === "es-MX") {
        wordsLang = 'wordsEs'
    }
}, [langCode, lang])  

  useEffect(() => {
    const fetchWords = async () => {
        if (session) {
            const { data, error } = await supabase
            .from('userData')
            .select(wordsLang)
            .eq('user', session.user.id)
        
            if (error) alert(error.message)
        
            if (data) {
                setUserWords(data)
            }
        }
    }

    fetchWords()
  }, [session])

  // update words

  // Update words in backend

  async function saveWord() {

    if (langCode === "ko") {
        const { error } = await supabase
        .from('userData')
        .update({ 
            wordsKo: userWords
            }
        ).eq('user', session.user.id)
        if (error) alert(error.message)
      }
    if (langCode === "es") {
        console.log("creating new spanish word")            
        const { error } = await supabase
        .from('profiles')
        .update({ wordsEs: userWords})
        .eq('id', session.user.id)
        if (error) alert(error.message)
    }        
} 

saveWord()

    // setup tab navigation

    const Tab = createMaterialTopTabNavigator();

    // tab router setup
    
    const [forward, setForward] = useState("");
    
    // Note: DraxProvider doesn't work on Android with Tab.Navigator
    
    return (
        <GestureHandlerRootView style={styles.gestureRootViewStyle}>
                <View style={styles.gestureRootViewStyle}>
                    <LinearGradient 
                        colors={['#319CFF', '#319CFF']}
                        locations={[0, .99]}
                        style={styles.linearGradient}
                    />
                    <Header />
                    <VoiceSentence 
                        sentenceInit={sentenceInit}
                        words={words} 
                        setWords={setWords} 
                        forward={forward} 
                        setForward={setForward}
                        translations={translations}
                        setTranslations={setTranslations}
                        lang={lang}
                        langCode={langCode}
                        sentence={sentence}
                        setSentence={setSentence}
                        sentenceType={sentenceType}
                        navigation={navigation}
                    />                    
                </View>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    gestureRootViewStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        display: 'flex',
    },
    wordContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        paddingLeft: 10,
    },
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '33%'
    },
    draggable: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
    },
    dragging: {
        opacity: 0.1,
    },

    linearGradient: {
        position: 'absolute',
        height: PAGE_HEIGHT*1.5,
        left: 0,
        right: 0,
        top: 0,  
        
    },
  })