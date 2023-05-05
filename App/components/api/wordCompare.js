import { OPENAI_API_KEY } from "@env" 
import axios from "axios";
import 'react-native-url-polyfill/auto'
import { supabase } from '../../lib/supabase';

const wordCompare = (words, messages) => {

  //console.log("in wordCompare, words is ", words)
  //console.log("in wordCompare, messages is ", messages)

  console.log("WORD COMPARE is running. SPENDING TOKENS!!")

  function getWordsArray(data) {
    return data.map(item => item.word);
  }

  function getTextArray(messages) {
    return messages.map(message => message.text);
  }

  const wordsToSend = getWordsArray(words)

  const messagesToSend = getTextArray(messages)

  console.log(wordsToSend)
  console.log(messagesToSend)

  
  const compareGpt = async (text) => {
      console.log("text to embed is", text)
      const response = await axios.post('https://api.openai.com/v1/embeddings', {
        model: "text-embedding-ada-002",
        input: text,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      });            
      console.log("embeddings is", response.data)   
  }  

  compareGpt(JSON.stringify(messages))

}

export default wordCompare;
