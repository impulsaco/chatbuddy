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


const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

export default ({ route }) => {

    // set up translations toggle 

    const [translations, setTranslations] = useState(true)

    // set up the tab navigator

    const [tab, setTab] = useState("Subjects")

    const page = () => {
        switch (tab) {
            case 'Subjects':
                return <SubjectRoute />
            case 'Verbs':
                return <VerbRoute/>
            case 'Adjectives':
                return <AdjectiveRoute />
            case 'Nouns':
                return <NounRoute />
            default:
                return <SubjectRoute />
        }
    }
    
    // Set styles
    //const gestureRootViewStyle = { flex: 1 };

    const styles = StyleSheet.create({
        gestureRootViewStyle: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            //alignItems: 'center',
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
    const words = route.params.words;
    const setWords = route.params.setWords;
    const lang = route.params.lang;
    const langCode = route.params.langCode;

    // Load user words and set up state for it

    const [userWords, setUserWords] = useState([])

    // Set up state for sentence

    const sentenceInit = [
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

    const [sentence, setSentence] = useState(sentenceInit); // Sets the initial sentence state, will be modified on drag or tap

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

  // Fetch words based on session

  let wordsLang

  if (lang === "ko") {
    wordsLang = 'wordsKo'
  }

  if (lang === "es") {
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
    console.log("user is ", session.user.id)

    console.log("userWords is ", userWords)

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

    // create word tab sliders filtered by type

    const NounRoute = () => (
        <View>
            <DraxScrollView contentContainerStyle={styles.wordContainer}>
                <AddWord type="noun" setUserWords={setUserWords} userWords={userWords} langCode={langCode}/> 
                {userWords.filter ? userWords.filter(obj => {return obj.type === "noun"})
                .map((word) => <DraggableWord key = {word.id} word={word} translations={translations} sentence={sentence} setSentence={setSentence} setForward={setForward}/>) : null}
                {words.filter(obj => {return obj.type === "noun"})
                .map((word) => <DraggableWord key = {word.id} word={word} translations={translations} sentence={sentence} setSentence={setSentence} setForward={setForward}/>)}
            </DraxScrollView>
        </View>
    )

    const VerbRoute = () => (
        <View>
            <DraxScrollView contentContainerStyle={styles.wordContainer}>
                <AddWord type="verb" setUserWords={setUserWords} userWords={userWords} langCode={langCode}/>
                {userWords.filter ? userWords.filter(obj => {return obj.type === "verb"})
                .map((word) => <DraggableWord key = {word.id} word={word} translations={translations} sentence={sentence} setSentence={setSentence} setForward={setForward}/>) : null}
                {words.filter(obj => {return obj.type === "verb"})
                .map((word) => <DraggableWord key = {word.id} word={word} translations={translations} sentence={sentence} setSentence={setSentence} setForward={setForward}/>)}
            </DraxScrollView>
        </View>
    )

    const AdjectiveRoute = () => (
        <View>
            <DraxScrollView contentContainerStyle={styles.wordContainer}>
                <AddWord type="adjective" setUserWords={setUserWords} userWords={userWords} langCode={langCode}/>
                {userWords.filter ? userWords.filter(obj => {return obj.type === "adjective"})
                .map((word) => <DraggableWord key = {word.id} word={word} translations={translations} sentence={sentence} setSentence={setSentence} setForward={setForward}/>) : null}
                {words.filter(obj => {return obj.type === "adjective"})
                .map((word) => <DraggableWord key = {word.id} word={word} translations={translations} sentence={sentence} setSentence={setSentence} setForward={setForward}/>)}
            </DraxScrollView>
        </View>
    )

    const SubjectRoute = () => (
        <View>
            <DraxScrollView contentContainerStyle={styles.wordContainer}>
                <AddWord type="subject" setUserWords={setUserWords} userWords={userWords} langCode={langCode}/>
                {userWords.filter ? userWords.filter(obj => {return obj.type === "subject"})
                .map((word) => <DraggableWord key = {word.id} word={word} translations={translations} sentence={sentence} setSentence={setSentence} setForward={setForward}/>) : null}
                {words.filter(obj => {return obj.type === "subject"})
                .map((word) => <DraggableWord key = {word.id} word={word} translations={translations} sentence={sentence} setSentence={setSentence} setForward={setForward}/>)}
            </DraxScrollView>
        </View>
    )

   // const initialLayout = { width: Dimensions.get('window').width };

    const renderScene = SceneMap({
        nounScene: NounRoute,
        verbScene: VerbRoute,
        adjectiveScene: AdjectiveRoute,
        subjectScene: SubjectRoute,
      });

    // tab router setup
    
    const [forward, setForward] = useState("");

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
                    initialRouteName={'Subjects'} 
                    sceneContainerStyle={{backgroundColor: 'transparent'}}
                    >
                        <Tab.Screen name="Subjects" component={SubjectRoute} />
                        <Tab.Screen name="Verbs" component={VerbRoute} />
                        <Tab.Screen name="Adjectives" component={AdjectiveRoute} />
                        <Tab.Screen name="Nouns" component={NounRoute} />
                    </Tab.Navigator>
                </View>
            </DraxProvider>
        </GestureHandlerRootView>
    )
}