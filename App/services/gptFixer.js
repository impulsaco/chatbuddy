import React, { useState, useEffect, useContext } from "react";
import { REACT_APP_SERVER_URL } from "@env";
import axios from "axios";
import "react-native-url-polyfill/auto";
import { supabase } from "@app/lib/supabase";
import romanizer from "@app/services/romanizer";

const gptFixer = (
  lang,
  langCode,
  sentence,
  saveSentenceText,
  session,
  setSentenceRomanized
) => {
  const costPerToken = 0.002 / 1000;

  const fixSentence = async () => {
    const prompt = `Make a simple sentence in ${lang} using only these four words, keeping in mind the English meaning of each word: ${JSON.stringify(
      sentence
    )}. Output only the ${lang} sentence, not the English one. Nothing besides the sentence, no parentheses or explanations.`;
    const role = `Helping beginners in ${lang} make a simple sentence.`;

    console.log("fixSentence is running OPEN AI CREDITS!!");
    const serverUrl = REACT_APP_SERVER_URL;
    // send call to node.js server
    const response = await axios.post(`${serverUrl}/api/gpt-completions`, {
      role: role,
      prompt: prompt,
    });

    const sentenceText = response.data.choices[0].message.content.trim();
    saveSentenceText(sentenceText);
    romanizer(sentenceText, setSentenceRomanized, lang, langCode, session);

    // Save call to Supabase
    const saveCall = async () => {
      const { error } = await supabase.from("aiUsage").insert({
        created_at: new Date().toISOString(),
        user: session.user.id,
        model: "gpt-3.5-turbo",
        type: "fixer",
        chars: role.length + prompt.length,
        tokens: (role.length + prompt.length) / 4,
        seconds: null,
        cost: ((role.length + prompt.length) / 4) * costPerToken,
        prompt: `${role} ${prompt}`,
        output: sentenceText,
        api_key: null,
      });
      if (error) alert(error.message);
    };
    saveCall();
  };
  fixSentence();
};

export default gptFixer;

// Aisso MVP
/// Decompose fixer API DONE
/// Decompose romanize API DONE
/// Decompose whisper API ???
/// Set up Supabase backend DONE
//// One call one row
//// id
//// timestamp
//// user
//// type (fixer, romanizer, whisper)
//// characters
//// seconds
//// cost
//// input/prompt
//// output
//// API key
/// Save calls to Supabase DONE
/// Set up dashboard React DONE
/// Dashboard metric visualizations DONE
