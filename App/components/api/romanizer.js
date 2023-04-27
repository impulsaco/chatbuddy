import { OPENAI_API_KEY } from "@env" 
import axios from "axios";
import 'react-native-url-polyfill/auto'
import { supabase } from '../../lib/supabase';

// Romanize sentence

const romanizer = (input, setSentenceRomanized, lang, langCode, session) => {

    const romanizeSentence = async (input, lang, langCode) => {
        
        if (langCode === "ko" || langCode === "bg") {
            const prompt = `Romanize the following sentence in  ${lang}: ${input}. Output only the romanized sentence`;
            const role = `Simple ${lang} romanizer.`;
            const costPerToken = 0.002/1000;
            let sentenceRomanizedTemp = "";
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo",
                messages: [{"role": "user", "content": role}, {"role": "system", "content": prompt}],
            }, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
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
                    api_key: OPENAI_API_KEY,
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