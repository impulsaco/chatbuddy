import { REACT_APP_SERVER_URL } from "@env" 
import axios from "axios";
import 'react-native-url-polyfill/auto'
import { supabase } from '../../lib/supabase';

// Romanize sentence

const romanizer = (input, setSentenceRomanized, lang, langCode, session) => {

    const romanizeSentence = async (input, lang, langCode) => {
        
        if (langCode === "ko" || langCode === "bg" || langCode === "ja" ) {
            const prompt = `Romanize the following sentence in  ${lang}: ${input}. Output only the romanized sentence`;
            const role = `Simple ${lang} romanizer.`;
            const costPerToken = 0.002/1000;
            let sentenceRomanizedTemp = "";

            const serverUrl = REACT_APP_SERVER_URL;
            // Send call to node.js
            const response = await axios.post(`${serverUrl}/api/gpt-completions`, {
                role: role,
                prompt: prompt,
            });    
            sentenceRomanizedTemp = response.data.choices[0].message.content.trim();
            setSentenceRomanized(sentenceRomanizedTemp);

            // Save call to Supabase
            const saveCall = async () => {  
                const { error } = await supabase
                .from('aiUsage')
                .insert({ 
                    created_at: new Date().toISOString(), 
                    user: session.user.id, 
                    model: "gpt-3.5-turbo",
                    type: "romanizer",
                    chars: role.length + prompt.length,
                    tokens: (role.length + prompt.length)/4,
                    seconds: null,
                    cost: (role.length + prompt.length)/4 * costPerToken,
                    prompt: `${role} ${prompt}`,
                    output: sentenceRomanizedTemp,
                    api_key: null,
                    }
                )
                if (error) alert(error.message)
            }
            saveCall()
        }        
    }

    romanizeSentence(input, lang, langCode)
}

export default romanizer