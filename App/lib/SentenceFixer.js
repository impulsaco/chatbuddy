import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput} from "react-native";
import { Button } from "@rneui/themed"
import { Configuration, OpenAIApi } from "openai";
import 'react-native-url-polyfill/auto'
import { OPENAI_API_KEY } from "@env" 
import googleTranslate from './googleTranslate';
import sentenceSpeak from './sentenceSpeak';
import axios from "axios";


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
  // Romanize sentence
    const romanizer = async (input) => {
      console.log("ROMANIZING API")
      const prompt = `Romanize the following sentence in  ${lang}: ${input}.`;
      const role = `Simple ${lang} romanizer.`;
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": role}, {"role": "system", "content": prompt}],
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      });      
      const sentenceRomanizedTemp = response.data.choices[0].message.content.trim();
      setSentenceRomanized(sentenceRomanizedTemp);
    }


    console.log("Sentence to send is ", sentence)
    const fixSentence = async () => {
      const prompt = `Make a simple sentence in ${lang} using only these four words, keeping in mind the English meaning of each word: ${JSON.stringify(sentence)}. Output only the ${lang} sentence, not the English one.`;
      const role = `Helping beginners in ${lang} make a simple sentence.`;
      console.log("role is ", role)
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": role}, {"role": "system", "content": prompt}],
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      });      
      const sentenceText = response.data.choices[0].message.content.trim();
      saveSentenceText(sentenceText);
      romanizer(sentenceText)
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