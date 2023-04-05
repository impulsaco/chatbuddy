import { OPENAI_API_KEY } from "@env" 
import axios from "axios";
import 'react-native-url-polyfill/auto'


// Romanize sentence

const romanizer = (input, setSentenceRomanized, lang, langCode) => {
    console.log("entered romanizer")

    const romanizeSentence = async (input, lang, langCode) => {
        console.log("entered romanizeSentence")
        console.log("input is ", input)
        console.log("lang is ", lang)
        console.log("langCode is ", langCode)
        if (langCode === "ko" || langCode === "bg") {
        console.log("ROMANIZING API")
        const prompt = `Romanize the following sentence in  ${lang}: ${input}. Output only the romanized sentence`;
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
    }
    romanizeSentence(input, lang, langCode)
}

export default romanizer