import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput} from "react-native";
import { Button } from "@rneui/themed"
import { Configuration, OpenAIApi } from "openai";
import 'react-native-url-polyfill/auto'
import { OPENAI_API_KEY } from "@env" 
import googleTranslate from '../lib/googleTranslate';
import sentenceSpeak from '../lib/sentenceSpeak';

// Set up GPT3

const API_KEY = OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);


// SHOULD ONLY RUN WHEN READY

const SentenceFixer = ({ sentence, 
                        setText, 
                        setSavedSentence, 
                        setSentenceChecked, 
                        setSentenceEn, 
                        lang, 
                        langCode,
                        sentenceAnalyzed,
                        setSentenceAnalyzed,
                      }) => {

    console.log("within fixer, sentence is ", sentence)

    var sentenceFixInit = ""

    for (let i = 0; i < sentence.length; i++) {
        console.log("sentence i word ", sentence[i].word )
        if (sentence[i].id >= 0) {
          sentenceFixInit = sentenceFixInit.concat(sentence[i].word, " ")
          console.log("building sentence ", sentenceFixInit)
        }
    }

    console.log("sentenceFixInit is ", sentenceFixInit)

    const [sentenceInput, setSentenceInput] = useState();
    
    useEffect(() => {
      setSentenceInput(sentenceFixInit)
    }, [sentenceFixInit])
  
    console.log("sentenceInput is ", sentenceInput)

    // Save sentence and translation to state
    const saveSentenceText = (input) => {
        setSentenceChecked(true)
        setSavedSentence(input)
        setText(input)
        googleTranslate(input, langCode, setSentenceEn)
        let inputArray = input.split(" ")
        let sentenceAnalyzedTemp = []
        let id = 0
        for (let i = 0; i < inputArray.length; i++) {
          sentenceAnalyzedTemp.push({id: id, word: inputArray[i].replaceAll(".",""), said:false}); 
          id++
        }
        setSentenceAnalyzed(sentenceAnalyzedTemp)
        sentenceSpeak(input, langCode)
    }

    console.log("Sentence to send is ", sentence)
    const fixSentence = () => {
      openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Make a simple sentence in ${lang} using only these four words, keeping in mind the English translation: ${JSON.stringify(sentence)} Do not add any new words besides conjugations and particles.`,
        temperature: 0,
        max_tokens: 100,
      }).then(response => saveSentenceText(response.data.choices[0].text.trim()))
    } 

    return (
          <View style={styles.buttons}>
            <Button buttonStyle={{ backgroundColor: '#FFC107' }} onPress={fixSentence}>Ready</Button>
          </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 0,
      paddingBottom: 0,
    },
    button: {
      backgroundColor: 'white',
    },
    text: {
        fontSize: 14,
        color: 'white',
        paddingTop: 0,
    }
})

export default SentenceFixer