import { View, Text, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import Draggable from 'react-native-draggable';
import React, { useState, useEffect } from 'react';
import SentenceTest from "../lib/SentenceTest";
import SentenceFixer from "../lib/SentenceFixer";
import SaveButton from "./SaveButton";
import SayWhisper from "../whisper/SayWhisper";
import { TouchableOpacity } from "react-native-gesture-handler";
import Microphone from "../../assets/microphone.svg";


// Launches Say It! modal

const SayItButton = ({ sentence, 
                        sentenceFixed,
                        setText, 
                        setSayVisible,
                        setSentenceText,
                        setSentenceEn, 
                        sentenceEn, 
                        sentenceWhisper, 
                        setSentenceWhisper, 
                        lang, 
                        langCode,
                        sentenceAnalyzed,
                        setSentenceAnalyzed,
                        sentenceSaidPercentage,
                        sentenceReady
                    }) => {

    // state for keeping track of sentence building process

    // Say! button

    let sayButton
    let sentenceFix

    if (sentenceFixed===false) {
        sayButton = 
            <View>
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Microphone fill={"#FFFFFF"} width={20} height={20} marginRight={10} />
                        <Text style={styles.buttonText}>Say it!</Text>                        
                    </View>
                </TouchableOpacity>
            </View>        
    }

    if (sentenceFixed===true) {
         sayButton = 
         <View>
             <TouchableOpacity onPress={() => setSayVisible(true)}>
                 <View style={styles.buttonReady}>
                     <Microphone fill={"#FFFFFF"} width={20} height={20} marginRight={10} />
                     <Text style={styles.buttonText}>Say it!</Text>                        
                 </View>
             </TouchableOpacity>
         </View>      
    }

    return (
        <View style={styles.buttonContainer}>
            { sentenceFix }
            { sayButton } 
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
        alignItems: 'center',
        position: 'relative',
    }
    , button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,

        width: 152,
        height: 35,

        backgroundColor: "#D9D9D9", // "rgba(255, 255, 255, 0.5)",
        borderRadius: 10,
    },
    buttonReady: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,

        width: 152,
        height: 35,

        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 10,
    }, 
    buttonText: {
        color: "#FFFFFF",
        fontSize: 17,
        height: 20,
        width: 50
    }
})

export default SayItButton

