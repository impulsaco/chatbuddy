import React, { useState, useEffect } from 'react';
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

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const Sentence = ({ 
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
    setSentence}) => {

    // Set instructions and sentence placeholder

    let starterText = "Drag and drop words into the boxes below:"

    const [text, setText] = useState(starterText)

    const [sentenceText, setSentenceText] = useState("")

    // Set translation placeholder
    const [sentenceEn, setSentenceEn] = useState(null)

    // Create Whisper sentence
    const [sentenceWhisper, setSentenceWhisper] = useState("no whisper yet")

    // Say/recording modal setup

    const [sayVisible, setSayVisible] = useState(false);

    // Sentence analyzed

    const [sentenceAnalyzed, setSentenceAnalyzed] = useState([])
    
    const gestureRootViewStyle = { flex: 1 };

    // Automatic completion checker

    const [sentenceReady, setSentenceReady] = useState(false);
    const [sentenceFixed, setSentenceFixed] = useState(false);
    const [savedSentence, setSavedSentence] = useState("");

    // Sentence Test (to see if all necessary boxes are filled)

    useEffect(() => {
        SentenceTest(sentence, setSentenceReady)        
    }, [sentence])

    // Sentence GPT fix (build with chosen words)

    const sentenceFix = (sentence) => {
        console.log("sentence to send to fix is ", sentence)
        if (sentenceReady === true) {
            SentenceFixer(sentence, 
                setSentenceFixed,
                setSentenceText,
                setSavedSentence, 
                setSentenceEn, 
                lang, 
                langCode,
                setSentenceAnalyzed)
        } 
    }

    //sentenceFix(sentence)
    useEffect(() => {
       sentenceFix(sentence)       
    }, [sentenceReady])

    // Translate sentence

    const sentenceTranslation = () => {
        if (translations===true) {
            return (
                <Text style={styles.translationText}>{sentenceEn}</Text>
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
        setSentenceText("")
        setSentenceEn("")
        setSentenceFixed(false)
        console.log("sentenceReady is ", sentenceReady)
    }

    // Check if sentence has been said and is understood enough to save
    const [sentenceSaidPercentage, setSentenceSaidPercentage] = useState(0);

    // check whispered sentence against sentence
    useEffect(() => {
        console.log("sentenceWhisper in Sentence is ", sentenceWhisper)
        console.log("sentenceSaidPercentage in Sentence is ", sentenceSaidPercentage)
        console.log("sentenceAnalyzed in Sentence is ", sentenceAnalyzed)
        let interimCount = 0
        for (let i = 0; i < sentenceAnalyzed.length; i++) {
            let interimState = [...sentenceAnalyzed]
            if (sentenceWhisper.includes(sentenceAnalyzed[i].word)) {
                console.log("sentenceWhisper includes ", sentenceAnalyzed[i].word)
                console.log("adding 1 to interimPercentage which is currently ", interimCount)
                interimState[i].said = true
                setSentenceAnalyzed(interimState)
                interimCount++                
            }
        }
        setSentenceSaidPercentage(interimCount / sentenceAnalyzed.length)
      }, [sentenceWhisper])

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
    const setWhispered = () => {
        if (sentenceWhisper == "no whisper yet") {
            return (
                <Text style={styles.text}>{sentenceText}</Text>
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
                    height: 45,
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


    return (
        <View style={styles.container}>
            <View style={styles.sentenceContainer}>
                <View style={styles.topSentence}>
                    {setWhispered()}    
                </View>
                {sentenceTranslation()}
                {sentenceLine()}
                <View style={styles.textContainer}><Text style={styles.text}>{text}</Text></View>                
            </View>
            <View style={styles.topContainer}>
                {speakSentence()}                  
                <TouchableOpacity style={styles.buttonContainer}>
                    <SayItButton 
                        sentence={sentence} 
                        sentenceFixed={sentenceFixed}
                        setSayVisible={setSayVisible}
                        setText={setText} 
                        setSentenceText={setSentenceText}
                        setSentenceEn={setSentenceEn} 
                        sentenceEn={sentenceEn}
                        sentenceWhisper={sentenceWhisper}
                        setSentenceWhisper={setSentenceWhisper}
                        lang={lang}
                        langCode={langCode}
                        sentenceAnalyzed={sentenceAnalyzed}
                        setSentenceAnalyzed={setSentenceAnalyzed}
                        sentenceSaidPercentage={sentenceSaidPercentage}
                        sentenceReady={sentenceReady}
                    />
                </TouchableOpacity>
                <SayModal 
                        sayVisible={sayVisible} 
                        setSayVisible={setSayVisible}
                        sentenceWhisper={sentenceWhisper}
                        setSentenceWhisper={setSentenceWhisper}
                        lang={lang}
                        langCode={langCode}
                        sentenceSaidPercentage={sentenceSaidPercentage}
                        sentenceText={sentenceText}
                />
                <View style={styles.switchContainer}>
                    <Switch
                        value={translations}
                        color={'#FFC107'}
                        onValueChange={(value) => setTranslations(value)}
                    />
                </View> 
                <View style={styles.refreshContainer}>
                    <TouchableOpacity onPress={() => resetSentence()}>
                        <Refresh/>
                    </TouchableOpacity>    
                </View>             
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        distributeContent: 'evenly',
        padding: 0,
        width: PAGE_WIDTH*0.8,
    },
    buttonContainer: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,
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
        padding: 20,
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    text: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',            
    },
    translationText: {
        fontSize: 16,
        marginTop: 5,
        color: '#B7B7B7',
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