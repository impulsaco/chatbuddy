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

    const [text, setText] = useState("Build your sentence:")

    // Set translation placeholder
    const [sentenceEn, setSentenceEn] = useState(null)

    // Create Whisper sentence
    const [sentenceWhisper, setSentenceWhisper] = useState("no whisper yet")

    // Sentence analyzed

    const [sentenceAnalyzed, setSentenceAnalyzed] = useState([])

    // Set initial empty sentence

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
    
    const gestureRootViewStyle = { flex: 1 };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingLeft: 10,
        },
        topContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        buttonContainer: {
            flex: 4,
            flexDirection: 'row',
            justifyContent: 'flex-end',
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
            paddingRight: 20,
        },
        refreshContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingRight: 10,
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
        setText("Build your sentence:")
        console.log("sentenceReady is ", sentenceReady)
    }

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
                <Text style={styles.text}>{text}</Text>
            )
        }
        else {
            return (
                analyzeSentence()
            )
        }
    }

    const speakSentence = () => {
        if (text==="Build your sentence:") {
            return (
                <View style={styles.soundButton}>
                    <TouchableOpacity onPress={() => sentenceSpeak(text, "en-UK")}>
                        <Sound/>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return (
                <View style={styles.soundButton}>
                    <TouchableOpacity onPress={() => sentenceSpeak(text, langCode)}>
                        <Sound/>
                    </TouchableOpacity>
                </View>
            )
        }
    }


    return (
        <View>
            <View style={styles.topContainer}>
                <View style={styles.buttonContainer}>
                    <SaveSentence 
                        sentence={sentence} 
                        setText={setText} 
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
            <View style={styles.textContainer}>
                <View style={styles.topSentence}>
                    {speakSentence()}                  
                    {setWhispered()}    
                </View>
                {sentenceTranslation()}
            </View>
            <ScrollView contentContainerStyle={styles.container}>
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
            </ScrollView>
        </View>
    )
}

export default Sentence;