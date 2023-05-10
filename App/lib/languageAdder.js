import googleTranslateWord from "./googleTranslateWord";

const languageAdder = async (targetLanguage) => {

    // Function to translate an array of words from English to the target language
    async function translateWords(words, targetLanguage) {
        const translations = [];
    
        for (const word of words) {
        const response = googleTranslateWord(word, targetLanguage)
    
        const data = await response.json();
        translations.push(data.data.translations[0].translatedText);
        }
    
        return translations;
  }
  
  // Function to romanize an array of words using the GPT API
  async function romanizeWords(words, targetLanguage) {
    const romanized = [];
  
    for (const word of words) {
      // Replace this with a call to GPT API for romanization
      const romanizedWord = await someFunctionToGetRomanizedVersion(word, targetLanguage);
      romanized.push(romanizedWord);
    }
  
    return romanized;
  }
  
  // Function to add a new language
  async function addNewLanguage(targetLanguage) {
    // English word sets
    const nounsEng = [...];
    const subjectsEng = [...];
    const verbsEng = [...];
  
    // Get translated word sets
    const nounsTranslated = await translateWords(nounsEng, targetLanguage);
    const subjectsTranslated = await translateWords(subjectsEng, targetLanguage);
    const verbsTranslated = await translateWords(verbsEng, targetLanguage);
  
    // Get romanized word sets if required
    let nounsRomanized, subjectsRomanized, verbsRomanized;
    if (['ko', 'bg'].includes(targetLanguage)) {
      nounsRomanized = await romanizeWords(nounsTranslated, targetLanguage);
      subjectsRomanized = await romanizeWords(subjectsTranslated, targetLanguage);
      verbsRomanized = await romanizeWords(verbsTranslated, targetLanguage);
    }
  
    // Add the new language to the hobbiesList function
  }
  

}

export default languageAdder