import {decode} from 'html-entities'
import { GOOGLE_API_KEY } from "@env"

// Google Translate API one way 

const googleTranslate = async (savedSentence, lang, setSentenceEn) => {

// const [sentenceTrans, setSentenceTrans] = useState("")

    let fromLang = lang;
    let toLang = 'en'; // translate to English

    let url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`;
    url += '&q=' + encodeURI(savedSentence);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;


    
    const result = await fetch(url, { 
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
        })
    .then(res => res.json())
    .then((response) => {
        console.log("response from google API: ", response.data.translations[0].translatedText)
        setSentenceEn(decode(response.data.translations[0].translatedText)) // set to translated sentence state
        })
    .catch(error => {
        console.log("There was an error with the translation request: ", error);
    });
} 

export default googleTranslate