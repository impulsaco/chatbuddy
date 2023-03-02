import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput} from "react-native";
import { Button } from "@rneui/themed"
import { Configuration, OpenAIApi } from "openai";
import 'react-native-url-polyfill/auto'
import { OPENAI_API_KEY } from "@env" 
import googleTranslate from './googleTranslate';
import sentenceSpeak from './sentenceSpeak';

// Uses GPT to fix sentence

// Set up GPT3

const API_KEY = OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);


// SHOULD ONLY RUN WHEN READY

const SentenceFixer = (sentence,
                        setSentenceFixed, 
                        setSentenceText,
                        setSavedSentence, 
                        setSentenceEn, 
                        lang, 
                        langCode,
                        setSentenceAnalyzed,
                      ) => {


    console.log("CALLING FIXER")
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

    // Save sentence and translation to state
    const saveSentenceText = (input) => {
        setSavedSentence(input)
        setSentenceText(input)
        googleTranslate(input, langCode, setSentenceEn)
        let inputArray = input.split(" ")
        let sentenceAnalyzedTemp = []
        let id = 0
        for (let i = 0; i < inputArray.length; i++) {
          sentenceAnalyzedTemp.push({id: id, word: inputArray[i], said:false}); 
          id++
        }
        setSentenceAnalyzed(sentenceAnalyzedTemp)
        sentenceSpeak(input, langCode)
        setSentenceFixed(true)
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
    fixSentence()

}

export default SentenceFixer