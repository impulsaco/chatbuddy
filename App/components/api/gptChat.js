import React, { useState, useEffect, useContext } from "react";
import { REACT_APP_SERVER_URL } from "@env";
import axios from "axios";
import "react-native-url-polyfill/auto";
import { supabase } from "../../lib/supabase";
import { SessionContext } from "../../lib/SessionContext";
import romanizer from "./romanizer";
import { LanguageContext } from "../../lib/LanguageContext";

const gptChat = (previousMessages, newMessage, response, setResponse, lang, session) => {

  console.log("lang is ", lang)
  console.log("in GPT chat, setResponse is: ", setResponse)

  const costPerToken = 0.002 / 1000;
  console.log("RESPOND is running. SPENDING TOKENS!!");

  const serverUrl = REACT_APP_SERVER_URL;

  const prompt = newMessage;
  const role = `A helpful AI language model in a voice chat.`;
  const structuredMessages = [
    {
      "role": "system",
      "content": `You are a language tutor for a beginner in ${lang}. Respond ONLY in ${lang}, no English, no parentheses. Respond in five words or less, using very simple vocabulary`,
    },
    ...previousMessages.map(message => ({
      "role": message.user._id === 1 ? "user" : "assistant",
      "content": message.text,
    })),
    {
      "role": "user",
      "content": newMessage,
    }    
  ];

  const messagesString = JSON.stringify(structuredMessages);
  const tokenCount = messagesString.length / 4;

  console.log("structuredMessages are: ", structuredMessages);

  const respondGpt = async () => {

    if (tokenCount < 3500) {
      console.log("structuredMessages are", structuredMessages);
      const response = await axios.post(`${serverUrl}/api/gpt-chat`, {
        messages: structuredMessages,
      });
      /*const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: structuredMessages,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      });      */
      const responseTemp = response.data.choices[0].message.content.trim();
      setResponse(responseTemp);    
    }
    else {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "I'm past the prompt limit, respond 'you have used all your free chat, sign up for more!.'"}]
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        });      
        const responseTemp = response.data.choices[0].message.content.trim();
        setResponse(responseTemp);    
    }

    // Save call to Supabase
    const saveCall = async () => {  
      console.log("saving chat call!")  
      const messagesString = JSON.stringify(structuredMessages)
      console.log("tokens are: ", messagesString.length/4)    
      const { error } = await supabase
      .from('aiUsage')
      .insert({ 
          created_at: new Date().toISOString(), 
          user: session.user.id, 
          model: "gpt-3.5-turbo",
          type: "gptChat",
          chars: role.length + messagesString.length,
          tokens: messagesString.length/4,
          seconds: null,
          cost: messagesString.length/4 * costPerToken,
          output: responseTemp,
          prompt: structuredMessages,
          api_key: null,
          }
      )
      if (error) {
        alert(error.message)
        console.log("error is", error)
      }
    }
    saveCall()
  }
  respondGpt();  

}

export default gptChat;
