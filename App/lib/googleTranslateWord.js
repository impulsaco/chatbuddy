import { OPENAI_API_KEY } from "@env"

// Google Translate API one way 

const googleTranslateWord = async (word, lang) => {

// const [sentenceTrans, setSentenceTrans] = useState("")

    console.log("Translating  ", word)
    // console.log("setState function is", setTranslation)
    let fromLang = 'en';
    let toLang = lang; // translate to target language
    let translation = ""

    const API_KEY = GOOGLE_API_KEY

    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(word);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`;

    console.log("url is ", url)

    
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
        translation = response.data.translations[0].translatedText
        })
    .catch(error => {
        console.log("There was an error with the translation request: ", error);
    });

    console.log("translation is ", translation)

    return translation
} 

export default googleTranslateWord