import React, { useState } from 'react';

// create words dataset

const hobbiesList = (lang) => {

  var idCounter = 0;

  // Sentence structure: subject + verb + adjective + noun

  const sentenceStructure = [
    {
        "id": -1,
        "type": "word",
        "word": "WORD",
    },    
  ]
  
  // Consolidate word sets

function consolidateWordSets(words, wordsTranslations, wordsRomanized) {
  const wordSet = [];

  for (let i = 0; i < words.length; i++) {
    wordSet.push({ id: idCounter++, word: words[i], type: "word", translation: wordsTranslations[i], romanized: wordsRomanized && wordsRomanized[i] });
  }

  return wordSet;
}

// English set

var wordsEng = ["Hello", "Yes", "No", "Goodbye", "Please", "Thanks", "Sorry", "Help"];

// Spanish set

if (lang === 'es-MX') {

  var wordsEs = ["Hola", "Sí", "No", "Adiós", "Por favor", "Gracias", "Lo siento", "Ayuda"];

  return ["words", sentenceStructure, consolidateWordSets(wordsEs, wordsEng)];

}

// Korean set

if (lang === 'ko') {

  var wordsKo = ["안녕하세요", "네", "아니요", "안녕히 가세요", "부탁드립니다", "감사합니다", "미안합니다", "도와주세요"];

  // Romanized Korean

  var wordsKoRom = ["annyeonghaseyo", "ne", "aniyo", "annyeonghi gaseyo", "butakdeurimnida", "gamsahamnida", "mianhamnida", "dowajuseyo"];

  return ["words", sentenceStructure, consolidateWordSets(wordsKo, wordsEng, wordsKoRom)];

}

// Bulgarian set

if (lang === 'bg') {

  var wordsBg = ["Здравей", "Да", "Не", "Довиждане", "Моля", "Благодаря", "Съжалявам", "Помощ"];

  // Romanized Bulgarian

  var wordsBgRom = ["Zdravei", "Da", "Ne", "Dovizhdane", "Molya", "Blagodarya", "Sazhalyavam", "Pomosht"];

  return ["words", sentenceStructure, consolidateWordSets(wordsBg, wordsEng, wordsBgRom)];

}

// German set

if (lang === 'de') {

  var wordsDe = ["Hallo", "Ja", "Nein", "Auf Wiedersehen", "Bitte", "Danke", "Es tut mir leid", "Hilfe"];

  return ["words", sentenceStructure, consolidateWordSets(wordsDe, wordsEng)];

}

// Japanese set

if (lang === 'ja') {

  var wordsJa = ["こんにちは", "はい", "いいえ", "さようなら", "お願いします", "ありがとう", "ごめんなさい", "助けて"];

  // Romanized Japanese

  var wordsJaRom = ["konnichiwa", "hai", "iie", "sayounara", "onegaishimasu", "arigatou", "gomennasai", "tasukete"];

  return ["words", sentenceStructure, consolidateWordSets(wordsJa, wordsEng, wordsJaRom)];

}

// Bengali set

if (lang === 'bn') {

  var wordsBn = ["হ্যালো", "হ্যাঁ", "না", "বিদায়", "অনুগ্রহ করে", "ধন্যবাদ", "দুঃখিত", "সাহায্য"];

  // Romanized Bengali

  var wordsBnRom = ["hyālō", "hyā̃", "nā", "bidāẏ", "anugrha karē", "dhan'yabād", "duḥkhita", "sāhāẏẏa"];

  return ["words", sentenceStructure, consolidateWordSets(wordsBn, wordsEng, wordsBnRom)];

}

 

}

export default hobbiesList;
