import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, Modal, Text, StyleSheet, Dimensions} from "react-native";
import Back from '../../assets/Back.svg'
import { supabase } from '../lib/supabase';
import SayWhisper from '../whisper/SayWhisper';
import SaveButton from './SaveButton';
import AudioPlayback from "../../assets/audioPlayback.svg"
import MicrophonePlayback from "../../assets/microphonePlayback.svg"
import Playback from "../../assets/playback.svg"
import sentenceSpeak from '../lib/sentenceSpeak';
import playRecording from '../lib/playRecording';
import Sound from '../../assets/Sound.svg'

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const SayModal = ({ drawerNavigation,
                    sentence, 
                    sentenceEn, 
                    sayVisible, 
                    setSayVisible, 
                    sentenceWhisper, 
                    setSentenceWhisper, 
                    lang, 
                    langCode, 
                    sentenceSaidPercentage, 
                    setSentenceSaidPercentage, 
                    sentenceText, 
                    sentenceType, 
                    setText, 
                    setForward,
                    sentenceInit,
                    onMounted,                                  
                }) => {    

    // Create variables for modal   
    
    // Communicate rendered for navigation
    useEffect(() => {
        if (onMounted) {
          onMounted();
        }
      }, [onMounted]);

    console.log("lang is ", lang)

    //console.log("navigation is ", navigation)

    console.log("drawerNavigation is", drawerNavigation)

    const navigateDrawer = () => {
        drawerNavigation.navigate("noun");
    };

    const PracticeText = 'Practice your sentence'

    const [topText, setTopText] = useState(PracticeText);

    const [bottomText, setBottomText] = useState(' ');

    const [attempted, setAttempted] = useState(false);

    const [recordingUri, setRecordingUri] = useState(null);

    const [playSound, setPlaySound] = useState(null);

    const [closeVisible, setCloseVisible] = useState(true); // to prevent premature recording end

    const [sentenceSaved, setSentenceSaved] = useState(false)

    // Sets success upon 50% of sentence said
    useEffect (() => {
        console.log("sentenceSaidPercentage", sentenceSaidPercentage)
        if (sentenceSaidPercentage > 0 && sentenceSaidPercentage < 1 && attempted) {        
            setSayVisible("partly");
        }
        if (sentenceSaidPercentage === 1 && attempted) {
            setSayVisible("success");
        }
        if (sentenceSaidPercentage === 0 && attempted) {
            setSayVisible("none");
        }

    }, [sentenceSaidPercentage, attempted, recordingUri, sentenceWhisper, sayVisible])

    useEffect (() => {
    }, [attempted, sayVisible])    

    const close = () => {
        //setSayVisible("invisible");
        setAttempted(false);
        setSentenceSaidPercentage(0);
        setSentenceWhisper("no whisper yet");
        setTopText(PracticeText);
        setBottomText(' ');
        setSentenceSaved(false)

        // reset sentence states
        // setSentence(sentenceInit); // full reset of sentence
        //setSentenceReady(false);
        setText("Pick words to build your sentence")
        //setSentenceText(" ")
        //setSentenceEn(" ")
        //setSentenceRomanized(null)
        //setSentenceFixed(false)
        console.log("sentenceInit[0].type is ", sentenceInit[0].type)
        setForward(sentenceInit[0].type)
    }

    const keepImproving = () => {
        setSayVisible("record");
        setAttempted(false);        
        setTopText(PracticeText);
        setBottomText('Say it!');
    }

    // Logic for which modal renders
    useEffect(() => {
        console.log("UPDATE!", attempted, sayVisible)
        if (attempted && (sayVisible==="success")) {
            console.log("attempted HERE is ", attempted)
            if (lang === "Spanish") {
                setTopText("¡Felicidades! 🚀 We understood everything :) Save it to your phrasebook?")
              }  
              if (lang === "Korean") {
                setTopText("축하해요! 🚀 We understood everything :) Save it to your phrasebook?")
              } 
              if (lang === "Bulgarian") {
                setTopText("Честито! 🚀 We understood everything :) Save it to your phrasebook?")
              }  
        } 
        else if (attempted && (sayVisible==="partly")) {
            setAttempted(false);            
            if (lang === "Spanish") {
                setTopText(
                    <Text>
                      ¡Bien! 👏 We understood the words in{" "}<Text style={{ color: "#8CFF98" }}>green</Text>. Save it or keep practicing?
                    </Text>
                )
              }  
              if (lang === "Korean") {
                setTopText(
                    <Text>
                      축하해요! 👏 We understood the words in{" "}<Text style={{ color: "#8CFF98" }}>green</Text>. Save it or keep practicing?
                    </Text>                
                )
              }  
              if (lang === "Bulgarian") {
                setTopText(
                    <Text>
                      Честито! 👏 We understood the words in{" "}<Text style={{ color: "#8CFF98" }}>green</Text>. Save it or keep practicing?
                    </Text>                
                )
              } 
        }
        else if (attempted && (sayVisible==="none")) {
            setAttempted(false);            
            if (lang === "Spanish") {
                setTopText("¡Disculpa! 🫠 We couldn't understand you. Keep trying?")
              }  
              if (lang === "Korean") {
                setTopText(("죄송합니다! 🫠 We couldn't understand you. Keep trying?"))
              } 
              if (lang === "Bulgarian") {
                setTopText(("съжалявам! 🫠 We couldn't understand you. Keep trying?"))
              }  
        }            
      }, [attempted, sentenceSaidPercentage, sayVisible]);

    const closeButton = () => {
        if (closeVisible) {
            return (
                <TouchableOpacity onPress={() => close()}>
                    <Back/>
                </TouchableOpacity> 
            )
        }
        else {
            return (
                <View/>
            )
        }
    }

    const continueWithoutSavingButton = () => {
        if (!sentenceSaved) {
            return (
                <TouchableOpacity style={styles.grayButton} onPress={() => close()}>
                    <Text style={[styles.smallText, { paddingLeft: 10} ]}>Continue without saving</Text>
                </TouchableOpacity>
            )
        }
        else if (sentenceSaved) {
            return (
                <TouchableOpacity style={styles.grayButton} onPress={() => {navigateDrawer(); close()}}>
                    <Text style={[styles.smallText, { paddingLeft: 10} ]}>Go to phrasebook</Text>
                </TouchableOpacity>
            )
        }
    }

    const keepImprovingButton = () => {
        if (!sentenceSaved) {
            return (
                <TouchableOpacity style={styles.grayButton} onPress={() => keepImproving()}>
                    <Text style={[styles.smallText, { paddingLeft: 10} ]}>Keep improving</Text>
                </TouchableOpacity>
            )
        }
        else if (sentenceSaved) {
            return (
                <TouchableOpacity style={styles.grayButton} onPress={() => {navigateDrawer(); close()}}>
                    <Text style={[styles.smallText, { paddingLeft: 10} ]}>Go to phrasebook</Text>
                </TouchableOpacity>
            )
        }
    }

    useEffect(() => {
    }, [closeVisible])

    // Load session

    const [session, setSession] = useState()

    useEffect(() => {

        supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })
    }, [])
            

    const sayModal = () => {        
        

        console.log("sayVisible in sayModal() is ", sayVisible)
        if (sayVisible==="record") {      
            console.log("sayVisible in sayModal() is ", sayVisible) // testing      
            return (
                <View style={styles.modalContainer}> 
                    <View style={styles.topContainer}>
                        {closeButton()}                                                
                    </View>
                    <View style={styles.smallTextContainer}>
                        <Text style={styles.smallText}>{topText}</Text>
                    </View>                                              
                    <TouchableOpacity style={styles.mikeContainer}>                    
                        <SayWhisper 
                        sentenceWhisper={sentenceWhisper} 
                        setSentenceWhisper={setSentenceWhisper} 
                        lang={lang}
                        langCode={langCode}
                        setTopText={setTopText}
                        setBottomText={setBottomText}
                        setRecordingUri={setRecordingUri}
                        setAttempted={setAttempted}
                        setPlaySound={setPlaySound}
                        sentenceText={sentenceText}     
                        closeVisible={closeVisible}                       
                        setCloseVisible={setCloseVisible}
                        session={session}
                    />
                    </TouchableOpacity>                    
                    <View style={styles.bigTextContainer}>
                        <Text style={styles.bigText}>{bottomText}</Text>
                    </View>                                        
                </View>
            )
        }
        else if (sayVisible==="success") {
            return (
                <View style={[styles.modalContainer, { height: PAGE_HEIGHT/2.5,} ]}> 
                        <View style={styles.topContainer}>
                            {closeButton()}                       
                        </View>
                        <View style={styles.smallTextContainer}>
                            <Text style={styles.smallText}>{topText}</Text>
                        </View>
                        <View style={styles.playbackContainer}>
                            <TouchableOpacity style={styles.playbackButton} onPress={() => sentenceSpeak(sentenceText, langCode)}>
                                <AudioPlayback/>
                                <Text style={styles.playbackText}>We said</Text>
                                <Playback/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.playbackButton} onPress={() => playRecording(recordingUri)}>
                                <MicrophonePlayback/>
                                <Text style={styles.playbackText}>You said</Text>
                                <Playback/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonsContainer}>    
                            <SaveButton sentence={sentence} savedSentence={sentenceText} sentenceEn={sentenceEn} lang={lang} langCode={langCode} sentenceType={sentenceType} sentenceSaved={sentenceSaved} setSentenceSaved={setSentenceSaved}/>                                        
                            {continueWithoutSavingButton()}                             
                        </View>                                               
                    </View>
            )
        }
        else if (sayVisible==="partly") {
            return (
                <View style={[styles.modalContainer, { height: PAGE_HEIGHT/2.5,} ]}> 
                    <View style={styles.topContainer}>
                        <TouchableOpacity onPress={() => close()}>
                            <Back/>
                        </TouchableOpacity>                        
                    </View>
                    <View style={styles.smallTextContainer}>
                        <Text style={styles.smallText}>{topText}</Text>
                    </View>
                    <View style={styles.playbackContainer}>
                        <TouchableOpacity style={styles.playbackButton} onPress={() => sentenceSpeak(sentenceText, langCode)}>
                            <AudioPlayback/>
                            <Text style={styles.playbackText}>We said</Text>
                            <Playback/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.playbackButton} onPress={() => playRecording(recordingUri)}>
                            <MicrophonePlayback/>
                            <Text style={styles.playbackText}>You said</Text>
                            <Playback/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonsContainer}>    
                        <SaveButton sentence={sentence} savedSentence={sentenceText} sentenceEn={sentenceEn} lang={lang} langCode={langCode} sentenceType={sentenceType} sentenceSaved={sentenceSaved} setSentenceSaved={setSentenceSaved}/>                                        
                        {keepImprovingButton()}
                    </View>                                               
                </View>
            )
        }
        else if (sayVisible==="none") {
            return (
                <View style={[styles.modalContainer, { height: PAGE_HEIGHT/2.5,} ]}> 
                    <View style={styles.topContainer}>
                        <TouchableOpacity onPress={() => close()}>
                            <Back/>
                        </TouchableOpacity>                        
                    </View>
                    <View style={styles.smallTextContainer}>
                        <Text style={styles.smallText}>{topText}</Text>
                    </View>
                    <View style={styles.playbackContainer}>
                        <TouchableOpacity style={styles.playbackButton} onPress={() => sentenceSpeak(sentenceText, langCode)}>
                            <AudioPlayback/>
                            <Text style={styles.playbackText}>We said</Text>
                            <Playback/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.playbackButton} onPress={() => playRecording(recordingUri)}>
                            <MicrophonePlayback/>
                            <Text style={styles.playbackText}>You said</Text>
                            <Playback/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonsContainer}>    
                        <TouchableOpacity style={styles.blueButton} onPress={() => keepImproving()}>
                            <Text style={[styles.smallText, { paddingLeft: 10} ]}>Try again</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.grayButton} onPress={() => close()}>
                            <Text style={[styles.smallText, { paddingLeft: 10} ]}>Back to builder</Text>
                        </TouchableOpacity>                                                                                           
                    </View>                                               
                </View>
            )
        }
    }
    

    /// Modals   
   
    return (
        <View style={styles.container}>
            {sayModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
          
    },  
    smallText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FFFFFF',        
    },    
    smallTextContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        width: PAGE_WIDTH*.8,        
    },
    bigText: {
        fontSize: 25,
        height: 30,
        textAlign: 'center',
        color: "#FFFFFF"
        
    },
    bigTextContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: PAGE_WIDTH*.8,
    },
    mikeContainer: {
        display: "flex",
        flex: 0.5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: PAGE_WIDTH*.8,
    },

    
    modalContainer: {
        backgroundColor: '#143e66',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        flexDirection: 'column',

        height: PAGE_HEIGHT/2.2,
        width: PAGE_WIDTH*.9,
        marginLeft: PAGE_WIDTH*.05,
        borderRadius: 10,  
    },
    topContainer: {
        display: "flex",
        
        flexDirection: "column",        
        padding: 10,
        justifyContent: "center",
        alignItems: "start",
        height: PAGE_HEIGHT*.09,
        width: PAGE_WIDTH*.9,
        paddingLeft: PAGE_WIDTH*.1,

    },
    playbackContainer: {
        flexDirection: "column",
        padding: 0,
        justifyContent: "space-evenly",
        alignItems: "center",
        width: PAGE_WIDTH*.4,
        height: PAGE_HEIGHT/9,
    },
    playbackButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 15,
        width: PAGE_WIDTH*.4,

    },
    playbackText: {
        fontSize: 16,
        color: "#2E92F0"
    },
    buttonsContainer: {
        flexDirection: "column",
        padding: 10,
        justifyContent: "space-evenly",
        alignItems: "center",
        width: PAGE_WIDTH*.7,
        height: PAGE_HEIGHT/7,

    },
    grayButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: PAGE_WIDTH*.7,

        backgroundColor: "#8B8B8B",
        borderRadius: 10,
    },
    blueButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: PAGE_WIDTH*.7,

        backgroundColor: "#2E92F0",
        borderRadius: 10,
    },
})

    

export default SayModal