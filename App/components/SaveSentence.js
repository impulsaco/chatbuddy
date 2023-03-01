import { View, Text, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import Draggable from 'react-native-draggable';
import React, { useState, useEffect } from 'react';
import SentenceTest from "./SentenceTest";
import SentenceFixer from "./SentenceFixer";
import SaveButton from "./SaveButton";
import SayWhisper from "../whisper/SayWhisper";
import { TouchableOpacity } from "react-native-gesture-handler";
import Microphone from "../../assets/microphone.svg";

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

        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 10,
    }
    , buttonText: {
        color: "#FFFFFF",
        fontSize: 17,
        height: 20,
        width: 50
    }
})

const SaveSentence = ({ sentence, 
                        setText, 
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

    /*useEffect(() => {
            alert("Your sentence is " + savedSentence)
    })*/

    // state for keeping track of sentence building process
    const [sentenceComplete, setSentenceComplete] = useState(false);
    const [savedSentence, setSavedSentence] = useState("");
    const [sentenceChecked, setSentenceChecked] = useState(false);

    // check to see if sentence is complete
    
    const sentenceTest = () => {
        // check to see three main boxes are full
        if ((sentence.some((element) => ((element.type==="noun") && (element.id >= 0)))) &&
        (sentence.some((element) => (element.type==="verb") && (element.id >= 0))) &&
        (sentence.some((element) => (element.type==="subject") && (element.id >= 0))))
        {
            console.log("sentence is complete")
            setSentenceComplete(true);
        }
        else {
            setSentenceComplete(false);
            setSentenceChecked(false);
            setText("Build your sentence:");
            setSentenceEn("");
        }
    }
    
    const concatSentence = () => {
        if (sentenceComplete===true) {
            var midSentence = "";
            for (let i = 0; i < sentence.length; i++) {
                if (sentence[i].id >= 0) {
                    midSentence = midSentence.concat(sentence[i].word, " ");
                }
            }
            setSavedSentence(midSentence);
            console.log("savedSentence IS ", savedSentence);
        }
    }

    useEffect(() => {
        sentenceTest()
        concatSentence()
    }, [sentence])

//    let sentenceFix

    /*if (sentenceComplete===false) {
        sentenceFix = 
            <View>
                <Button buttonStyle={{ backgroundColor: '#B7B7B7' }} onPress={ () => {alert("Add a few more words :) ") } }>Ready</Button>
            </View>
    }

    if (sentenceComplete===true) {
        console.log("Sentence is complete")
        
    } */
    
    // Say! button

    let sayButton

    if (sentenceChecked===false) {
        console.log("Sentence is not checked")
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

    if (sentenceChecked===true) {
        sayButton = <SentenceFixer 
                        sentence={sentence} 
                        setText={setText} 
                        setSentenceText={setSentenceText}
                        setSavedSentence={setSavedSentence} 
                        setSentenceChecked={setSentenceChecked}
                        setSentenceEn={setSentenceEn}
                        lang={lang}
                        langCode={langCode}
                        sentenceAnalyzed={sentenceAnalyzed}
                        setSentenceAnalyzed={setSentenceAnalyzed}
                    />
        //sayButton = <SayWhisper sentenceWhisper={sentenceWhisper} setSentenceWhisper={setSentenceWhisper} lang={lang}/>
    }

    return (
        <View style={styles.buttonContainer}>
            { sayButton }            
        </View>
    );
};

export default SaveSentence

