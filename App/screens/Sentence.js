import React, { useState, useEffect } from 'react';
import { Switch } from "@rneui/themed";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import SentenceWord from '../components/SentenceWord';
import SaveSentence from '../components/SaveSentence';
import AnalyzeWord from '../components/AnalyzeWord';
import Refresh from '../../assets/Refresh.svg';
import sentenceSpeak from '../lib/sentenceSpeak';
import Sound from '../../assets/Sound.svg';

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

    let starterText = "Drag and drop words to build your sentence:"

    const [text, setText] = useState(starterText)

    const [sentenceText, setSentenceText] = useState("")

    // Set translation placeholder
    const [sentenceEn, setSentenceEn] = useState(null)

    // Create Whisper sentence
    const [sentenceWhisper, setSentenceWhisper] = useState("no whisper yet")

    // Sentence analyzed

    const [sentenceAnalyzed, setSentenceAnalyzed] = useState([])
    
    const gestureRootViewStyle = { flex: 1 };

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
        },
        wordsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            paddingLeft: 10,
        },
        topContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            distributeContent: 'evenly',
            padding: 0,
            width: 321,
        },
        buttonContainer: {
            flex: 4,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: 20,
        },
        switchContainer: {
            flex: 1,
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

    // Automatic completion checker

    const [sentenceReady, setSentenceReady] = useState(false);
    const [savedSentence, setSavedSentence] = useState("");

    const sentenceTest = () => {
        // check to see three main boxes are full
        if ((sentence.some((element) => ((element.type==="noun") && (element.id >= 0)))) &&
        (sentence.some((element) => (element.type==="verb") && (element.id >= 0))) &&
        (sentence.some((element) => (element.type==="subject") && (element.id >= 0))))
        {
            console.log("sentence is complete")
            setSentenceReady(true);
        }
        else {
            console.log("you are missing words")
        }
    }

    const concatSentence = () => {
        if (sentenceReady===true) {
            var midSentence = "";
            for (let i = 0; i < sentence.length; i++) {
                if (sentence[i].id >= 0) {
                    midSentence = midSentence.concat(sentence[i].word, " ");
                }
            }
            setSavedSentence(midSentence);
            alert("you have completed sentence ", midSentence);
        }
    }

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
        setText(starterText)
        setSentenceText("")
        console.log("sentenceReady is ", sentenceReady)
    }

    useEffect(() => {
        resetSentence()
    }, [sentenceReady])

    // Check if sentence has been said and is understood enough to save
    const [sentenceSaidPercentage, setSentenceSaidPercentage] = useState(0);

    // check whispered sentence against sentence
    useEffect(() => {
        console.log("sentenceWhisper in Sentence is ", sentenceWhisper)
        for (let i = 0; i < sentenceAnalyzed.length; i++) {
            let interimState = [...sentenceAnalyzed]
            if (sentenceWhisper.includes(sentenceAnalyzed[i].word)) {
                interimState[i].said = true
                setSentenceAnalyzed(interimState)
                setSentenceSaidPercentage((sentenceSaidPercentage + 1) / sentenceAnalyzed.length)
            }
        }
      }, [sentenceWhisper])

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
    
    // set Text based on whispered

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
                <View style={styles.buttonContainer}>
                    <SaveSentence 
                        sentence={sentence} 
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
                </View>
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
            <View style={styles.wordsContainer}>
                {(sentence || []).map(
                    (word, index) => (
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
                    ))
                }
            </View>
        </View>
    )
}

export default Sentence;