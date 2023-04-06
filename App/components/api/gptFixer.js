import React, { useState, useEffect, useContext } from 'react';
import { OPENAI_API_KEY } from "@env" 
import axios from "axios";
import 'react-native-url-polyfill/auto'
import { supabase } from '../../lib/supabase';
import { SessionContext } from '../../lib/SessionContext';

const gptFixer = (lang, sentence, saveSentenceText, session) => {

  
  const costPerToken = 0.002/1000;
  
  const fixSentence = async () => {
    const prompt = `Make a simple sentence in ${lang} using only these four words, keeping in mind the English meaning of each word: ${JSON.stringify(sentence)}. Output only the ${lang} sentence, not the English one.`;
    const role = `Helping beginners in ${lang} make a simple sentence.`;
  
    console.log("fixSentence is running")
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

    // Save call to Supabase
    const saveCall = async () => {  
      console.log("saving!")      
      const { error } = await supabase
      .from('aiUsage')
      .insert({ 
          created_at: new Date().toISOString(), 
          user: session.user.id, 
          model: "gpt-3.5-turbo",
          type: "fixer",
          chars: role.length + prompt.length,
          tokens: (role.length + prompt.length)/4,
          seconds: null,
          cost: (role.length + prompt.length)/4 * costPerToken,
          prompt: `${role} ${prompt}`,
          output: sentenceText,
          api_key: OPENAI_API_KEY,
          }
      )
      if (error) alert(error.message)
    }
    saveCall()

  }

  fixSentence();  

}

export default gptFixer;
