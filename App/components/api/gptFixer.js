import { OPENAI_API_KEY } from "@env" 
import axios from "axios";
import 'react-native-url-polyfill/auto'
import { supabase } from '../lib/supabase';
import { SessionContext } from '../lib/SessionContext';


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
/// Save calls to Supabase 
/// Set up dashboard React
/// Dashboard metric visualizations




const gptFixer = (lang, sentence, saveSentenceText) => {

  const { session, setSession } = useContext(SessionContext);    
  
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
  }
  fixSentence()
}

export default gptFixer
