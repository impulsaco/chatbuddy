import React, { useState, useEffect } from 'react';
import { Dimensions, View, StyleSheet } from "react-native";
import { SceneMap } from 'react-native-tab-view';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider, DraxScrollView } from 'react-native-drax';
import Sentence from "../screens/Sentence"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DraggableWord from '../components/DraggableWord';
import WordMenu from '../components/WordMenu';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient'
import AddWord from '../components/AddWord';
import { supabase } from '../lib/supabase';
import WordRoute from '../lib/WordRoute';


const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

export default ({ route }) => {

    // set up translations toggle 

    const [translations, setTranslations] = useState(true)

    // set up the tab navigator, for alternative navigation

    /* const [tab, setTab] = useState("subject")

    const page = () => {
        switch (tab) {
            case 'subject':
                return <subjectRoute />
            case 'verb':
                return <verbRoute/>
            case 'adjective':
                return <adjectiveRoute />
            case 'noun':
                return <nounRoute />
            default:
                return <subjectRoute />
        }
    } */
    
    // Set styles
    //const gestureRootViewStyle = { flex: 1 };

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
            height: PAGE_HEIGHT,
            left: 0,
            right: 0,
            top: 0,    
        },
      })
    
    // Import params
    
    const wordSet = route.params.wordSet;
    const lang = route.params.lang;
    const langCode = route.params.langCode;

    // set up word lists based on choice

    const createWordList = wordSet(langCode)

    const [words, setWords] = useState(createWordList[2]);
    
    const sentenceInit = createWordList[1];

    const sentenceType = createWordList[0];

    const routeList = sentenceInit.map(item => item.type);

    // Load user words and set up state for it

    const [userWords, setUserWords] = useState([])

    const [sentence, setSentence] = useState(sentenceInit); // Sets the initial sentence state, will be modified on drag or tap
      // SHOULD BE USEEFFECT FOR UPDATING

    useEffect(() => {
        setSentence(sentenceInit)
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

  if (lang === "ko") {
    wordsLang = 'wordsKo'
  }

  if (lang === "es-MX") {
    wordsLang = 'wordsEs'
  }

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
            <DraxProvider> 
                <View style={styles.gestureRootViewStyle}>
                    <LinearGradient 
                        colors={['#9F00B9', '#FFDC61']}
                        locations={[0, .99]}
                        style={styles.linearGradient}
                    />
                    <Header />
                    <Sentence 
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
                    />
                    <Tab.Navigator
                    tabBar={props => <WordMenu {...props} forward={forward} setForward ={setForward}/>}
                    initialRouteName={'subject'} 
                    sceneContainerStyle={{backgroundColor: 'transparent'}}
                    >
                        {routeList.map((route) => (
                        <Tab.Screen
                        name={route}
                        component={WordRoute(route, setUserWords, userWords, langCode, words, translations, sentence, setSentence, setForward)}
                        />
                    ))} 
                    </Tab.Navigator>
                </View>
            </DraxProvider>
        </GestureHandlerRootView>
    )
}