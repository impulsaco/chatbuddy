import React, { useState } from 'react';

// create words dataset

const hometownList = (lang) => {

  var idCounter = 0;

  // Sentence structure: subject + verb + adjective + noun

  const sentenceStructure = [
    {
        "id": -1,
        "type": "subject",
        "word": "SUBJECT",
    },
    {
        "id": -2,
        "type": "verb",
        "word": "VERB",
    },
    {
        "id": -3,
        "type": "noun",
        "word": "NOUN",
    }  
  ]
  
  function consolidateWordSets(nouns, subjects, verbs, nounsTranslations, subjectsTranslations, verbsTranslations, nounsRomanized, subjectsRomanized, verbsRomanized) {
    const words = [];

    for (let i = 0; i < nouns.length; i++) {
      words.push({ id: idCounter++, word: nouns[i], type: "noun", translation: nounsTranslations[i], romanized: nounsRomanized && nounsRomanized[i] });
    }

    for (let i = 0; i < verbs.length; i++) {
      words.push({ id: idCounter++, word: verbs[i], type: "verb", translation: verbsTranslations[i], romanized: verbsRomanized && verbsRomanized[i] });
    }

    for (let i = 0; i < subjects.length; i++) {
      words.push({ id: idCounter++, word: subjects[i], type: "subject", translation: subjectsTranslations[i], romanized: subjectsRomanized && subjectsRomanized[i] });
    }

    return words;
  }

  // English set

  var subjectsEng = ['I', 'You', 'We', 'They', 'He', 'She']

  var verbsEng = ['Am from', 'Grew up in', 'Live in', 'Lived in']

  var nounsEng = ['America', 'China', 'Chile', 'Bulgaria', 'Korea']


  if (lang === 'es-MX') {

    // Spanish set

    var subjectsEs = ['Yo', 'Tú', 'Nosotros', 'Ellos', 'Él', 'Ella']

    var verbsEs = ['Soy de', 'Crecí en', 'Vivo en', 'Viví en']

    var nounsEs = ['Estados Unidos', 'China', 'Chile', 'Bulgaria', 'Corea']

    return ["hometown", sentenceStructure, consolidateWordSets(nounsEs, subjectsEs, verbsEs, nounsEng, subjectsEng, verbsEng)];

  }

  if (lang === 'ko') {

    // Korean set

    var subjectsKo = ['나', '너', '우리', '그들', '그', '그녀']

    var verbsKo = ['출신', '자랐어요', '살고 있어요', '살았어요']

    var nounsKo = ['미국', '중국', '칠레', '불가리아', '한국']

    // Romanized set

    var subjectsKoRom = ['na', 'neo', 'uri', 'geudeul', 'geu', 'geunyeo']

    var verbsKoRom = ['chulsin', 'jarasseoyo', 'salgo isseoyo', 'salasseoyo']

    var nounsKoRom = ['Miguk', 'Jungguk', 'Chille', 'Bulgaria', 'Hanguk']

    return ["hometown", sentenceStructure, consolidateWordSets(nounsKo, subjectsKo, verbsKo, nounsEng, subjectsEng, verbsEng, nounsKoRom, subjectsKoRom, verbsKoRom)];;
  }

  if (lang === 'bg') {

    // Bulgarian set

    var subjectsBg = ['Аз', 'Ти', 'Ние', 'Те', 'Той', 'Тя']

    var verbsBg = ['Съм от', 'Отгледан съм в', 'Живея в', 'Живях в']

    var nounsBg = ['Америка', 'Китай', 'Чили', 'България', 'Корея']

    // Romanized

    var subjectsBgRom = ['Az', 'Ti', 'Nie', 'Te', 'Toy', 'Tya']

    var verbsBgRom = ['Sum ot', 'Otgledan sum v', 'Jiveya v', 'Jivyah v']

    var nounsBgRom = ['Amerika', 'Kitai', 'Chili', 'Bulgaria', 'Koreya']

    return ["hometown", sentenceStructure, consolidateWordSets(nounsBg, subjectsBg, verbsBg, nounsEng, subjectsEng, verbsEng, nounsBgRom, subjectsBgRom, verbsBgRom)];;

  }
}

export default hometownList;
