import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput} from "react-native";
import { Button } from "@rneui/themed"
import { Configuration, OpenAIApi } from "openai";
import 'react-native-url-polyfill/auto'
import { OPENAI_API_KEY } from "@env" 
import googleTranslate from './googleTranslate';
import sentenceSpeak from './sentenceSpeak';
import axios from "axios";
import gptFixer from '../components/api/gptFixer';
import romanizer from '../components/api/romanizer';


// Uses GPT to fix sentence

// Set up GPT3

const API_KEY = OPENAI_API_KEY;

//const {Configuration, OpenAIApi} = require('openai');

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
                        sentenceType,
                        sentenceRomanized,
                        setSentenceRomanized
                      ) => {

    console.log("within fixer, sentence is ", sentence)

    console.log("sentenceType in FIXER is ", sentenceType)

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
    const fixSentence = async () => {
      gptFixer(lang, sentence, saveSentenceText)
      romanizer(sentenceFixInit, setSentenceRomanized, lang, langCode)
    }
    fixSentence()
}

export default SentenceFixer

/* 




    const fixSentence = async () => {
      const messages = [{role: "Language teacher", content: "say hi to me"}]
      const response = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: messages,        
        });
        console.log(response.data.choices[0].message)
        // .then(response => saveSentenceText(response.data.choices[0].text.trim()))
        saveSentenceText("hello world")
    }
    
*/