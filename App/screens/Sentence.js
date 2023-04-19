import React, { useState, useEffect, useContext } from 'react';
import { Switch } from "@rneui/themed";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from "react-native";
import SentenceWord from '../components/SentenceWord';
import SayItButton from '../components/SayItButton';
import AnalyzeWord from '../components/AnalyzeWord';
import Refresh from '../../assets/Refresh.svg';
import sentenceSpeak from '../lib/sentenceSpeak';
import Sound from '../../assets/Sound.svg';
import SentenceTest from '../lib/SentenceTest';
import SentenceFixer from '../lib/SentenceFixer';
import SayModal from '../components/SayModal';
import TranslationOn from '../../assets/translationOn.svg';
import TranslationOff from '../../assets/translationOff.svg';
import { SessionContext } from '../lib/SessionContext';
import { supabase } from '../lib/supabase';


const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const Sentence = ({ 
    navigation,
    sentenceInit,
    words, 
    setWords, 
    forward, 
    setForward, 
    translations, 
    setTranslations, 
    lang, 
    langCode, 
    sentence, 
    setSentence,
    sentenceType,
    sentenceEn,
    setSentenceEn,
    sayVisible,
    setSayVisible,
    sentenceWhisper,
    setSentenceWhisper,
    sentenceSaidPercentage,
    setSentenceSaidPercentage,
    text,
    setText,
    sentenceText,
    setSentenceText,
    sentenceRomanized,
    setSentenceRomanized}) => {

    // Set instructions and sentence placeholder

    let starterText = "Tap words to build your sentence:"

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



    // Sentence analyzed

    const [sentenceAnalyzed, setSentenceAnalyzed] = useState([])
    
    const gestureRootViewStyle = { flex: 1 };

    // Automatic completion checker

    const [sentenceReady, setSentenceReady] = useState(false);
    const [sentenceFixed, setSentenceFixed] = useState(false);
    const [savedSentence, setSavedSentence] = useState("");

    // Clear top sentence if re-entering sentence screen (e.g. when choosing new language)

    useEffect(() => {           
        if (sentenceReady === false) {
            setSentenceText(" ")
            setSentenceAnalyzed([])
            setSentenceEn(" ")
            setSentenceRomanized(null)
            setSentenceFixed(false)
            setForward(sentenceInit[0].type)
        }
    }, [sentenceReady])

    // Reset sentence structure if changed

    //useEffect(() => {


    // Sentence Test (to see if all necessary boxes are filled)

    useEffect(() => {
        SentenceTest(sentence, setSentenceReady)        
    }, [sentence])

    useEffect(() => {
        console.log("sentenceReady is NOW ", sentenceReady)
    }, [sentenceReady])


    // Sentence GPT fix (build with chosen words)

    // Prevent sentenceFix from running on initial load
    const sentenceFix = (sentence) => {
        console.log("sentenceReady FIXER is ", sentenceReady)
        if (sentenceReady === true && sentence !== sentenceInit) {
            SentenceFixer(sentence, 
                setSentenceFixed,
                sentenceText,
                setSentenceText,
                setSavedSentence, 
                setSentenceEn, 
                lang, 
                langCode,
                setSentenceAnalyzed,
                sentenceType,
                sentenceRomanized,
                setSentenceRomanized,
                session,
                sayVisible,
                setSayVisible)
        } 
    }
    
    useEffect(() => {
        if (sentence[0].id >= 0) {
            sentenceFix(sentence)
        }           
    }, [sentenceReady, sentence]) //solution to loading, add sentence to tracking?

    // Translate sentence

    const sentenceTranslation = () => {
        if (translations===true) {
            return (
                <Text style={styles.translationText}>{sentenceEn}</Text>
            )
        }
        else {
            return <Text style={styles.translationText}>{" "}</Text>
        }
    }

    // Sentence romanization

    const sentenceRomanization = () => {
        console.log("sentenceRomanized is ", sentenceRomanized)
        if (sentenceRomanized) {
            return (
                <Text style={styles.romanizationText}>{sentenceRomanized}</Text>
            )
        }
        else {
            return null
        }
    }

    // reset sentence

    const resetSentence = () => {        
        setSentence(sentenceInit);
        setSentenceReady(false);
        setSentenceWhisper("no whisper yet")
        setText(starterText)
        setSentenceText(" ")
        setSentenceEn(" ")
        setSentenceRomanized(null)
        setSentenceFixed(false)
        setForward(sentenceInit[0].type)
    }

    // check whispered sentence against sentence
    useEffect(() => {
        console.log("sentenceWhisper in Sentence is ", sentenceWhisper)  
        console.log("sentenceAnalyzed in Sentence is ", sentenceAnalyzed)      
        let interimCount = 0
        for (let i = 0; i < sentenceAnalyzed.length; i++) {
            let interimState = [...sentenceAnalyzed]
            if (sentenceWhisper.includes(sentenceAnalyzed[i].word)) {
                interimState[i].said = true
                setSentenceAnalyzed(interimState)
                interimCount++                
            }
        }
        setSentenceSaidPercentage(interimCount / sentenceAnalyzed.length)
      }, [sentenceWhisper]) //DOES NOT UPDATE WHEN SENTENCE SAID STAYS THE SAME!

    // set Text based on whispered

    const analyzeSentence = () => {
        return (
            <View style={styles.sentenceAnalyzed}>
                    {sentenceAnalyzed.map(
                        (word, id) => (
                            <AnalyzeWord 
                                key={id} 
                                word={word} 
                            />
                        ))
                    }
            </View>
        )
    }

    // EDIT THIS IF YOU WANT WORD TO STAY GREEN WHEN CLOSE MODAL
    useEffect(() => {
        analyzeSentence()
    }, [sentenceAnalyzed, sayVisible])

    const setWhispered = () => {
        if (sentenceWhisper == "no whisper yet") {
            return (
                <Text style={styles.sentenceText}>{sentenceText}</Text>
            )
        }
        else {
            return (
                analyzeSentence()
            )
        }
    }

    const sentenceLine = () => {
        return (
            <View
                style={{
                    borderBottomColor: 'white',                    
                    borderBottomWidth: 1,
                    height: 20,
                    width: 271,
                }}
            />
        )
    }

    const speakSentence = () => {
        return (
            <View style={styles.soundButton}>
                <TouchableOpacity onPress={() => sentenceSpeak(sentenceText, langCode)}>
                    <Sound/>
                </TouchableOpacity>
            </View>
        )
    }

    const toggleTranslations = () => {
        if (translations === true) {
            setTranslations(false)
        }
        else {
            setTranslations(true)
        }
    }

    const translationButton = () => {
        if (translations === true) {
            return (
                <TranslationOn/>
            )
        }
        else if (translations === false) {
            return (
                <TranslationOff/>
            )
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.sentenceContainer}>
                <View style={styles.topSentence}>
                    {setWhispered()}    
                </View>
                {sentenceRomanization()}
                {sentenceTranslation()}
            </View>
            <View style={styles.bottomContainer}>                                
                <TouchableOpacity style={styles.switchContainer} onPress={() => toggleTranslations()}>
                    {translationButton()
                    /*
                    <Switch 
                        value={translations}
                        onValueChange={() => toggleTranslations()}
                        trackColor={{ false: "#767577", true: "#f4f3f4" }}
                        thumbColor={translations ? "#2E93F2" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                    /> 
                    */
                    }
                    
                </TouchableOpacity> 
                <View style={styles.refreshContainer}>
                    <TouchableOpacity onPress={() => resetSentence()}>
                        <Refresh/>
                    </TouchableOpacity>    
                </View>                             
            </View>
            <View style={styles.textContainer}><Text style={styles.text}>{text}</Text></View>                
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        distributeContent: 'evenly',
        paddingBottom: PAGE_HEIGHT*0.03,
        width: PAGE_WIDTH*0.8,

    },
    buttonContainer: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 0,
    },
    switchContainer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 0,
    },
    topSentence: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    soundButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    refreshContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 10,
    },
    sentenceContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        paddingTop: 40,
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: PAGE_WIDTH*0.8,
        paddingBottom: PAGE_HEIGHT*0.03,

    },
    text: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',            
    },
    sentenceText: {
        fontSize: 36,
        color: 'white',
        textAlign: 'center',            
    },
    translationText: {
        fontSize: 20,
        marginTop: 5,
        color: '#B7B7B7',
        marginBottom: 15,
    },
    
    romanizationText: {
        fontSize: 20,
        marginTop: 0,
        color: 'white',
        fontStyle: 'italic',
        marginBottom: 5,
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
    sentenceAnalyzed: {
        flexDirection: 'row',
    },
  })

export default Sentence;