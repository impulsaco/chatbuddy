import { REACT_APP_SERVER_URL } from "@env";
import axios from "axios";
import "react-native-url-polyfill/auto";
import { supabase } from "../../lib/supabase";

// Romanize sentence
const romanizeWord = (input, lang, session) => {
  const romanizer = async (input, lang) => {
    const prompt = `Romanize the following word in  ${lang}: ${input}. Output only the romanized sentence`;
    const role = `Simple ${lang} romanizer.`;
    const costPerToken = 0.002 / 1000;
    let wordRomanizedTemp = "";

    const serverUrl = REACT_APP_SERVER_URL;
    // Send call to node.js
    const response = await axios.post(`${serverUrl}/api/gpt-completions`, {
      role: role,
      prompt: prompt,
    });
    wordRomanizedTemp = response.data.choices[0].message.content.trim();

    return wordRomanizedTemp;
  };


    // Save call to Supabase
    const saveCall = async () => {  
        const { error } = await supabase
        .from('aiUsage')
        .insert({ 
            created_at: new Date().toISOString(), 
            user: session.user.id, 
            model: "gpt-3.5-turbo",
            type: "wordRomanizer",
            chars: role.length + prompt.length,
            tokens: (role.length + prompt.length)/4,
            seconds: null,
            cost: (role.length + prompt.length)/4 * costPerToken,
            prompt: `${role} ${prompt}`,
            output: wordRomanizedTemp,
            api_key: null,
            }
        )
        if (error) alert(error.message)
    }
    saveCall()

  return romanizer(input, lang); // Return the promise here
};

export default romanizeWord;
