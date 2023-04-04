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

  // English set

  var subjectsEng = ['I', 'You', 'We', 'They', 'He', 'She']

  var verbsEng = ['Am from', 'Grew up in', 'Live in', 'Lived in']

  var nounsEng = ['America', 'China', 'Chile', 'Bulgaria', 'Korea']


  if (lang === 'es-MX') {

    // Spanish set

    var subjectsEs = ['Yo', 'Tú', 'Nosotros', 'Ellos', 'Él', 'Ella']

    var verbsEs = ['Soy de', 'Crecí en', 'Vivo en', 'Viví en']

    var nounsEs = ['Estados Unidos', 'China', 'Chile', 'Bulgaria', 'Corea']

    const initialWordsEs = [];

    for (var i=0; i<nounsEs.length; i++) {
      initialWordsEs.push({id: idCounter, word: nounsEs[i], type:"noun", translation: nounsEng[i]});
      idCounter++;  
    }

    for (var i=0; i<verbsEs.length; i++) {
      initialWordsEs.push({id: idCounter, word: verbsEs[i], type:"verb", translation: verbsEng[i]}); 
      idCounter++;   
    }

    for (var i=0; i<subjectsEs.length; i++) {
      initialWordsEs.push({id: idCounter, word: subjectsEs[i], type:"subject", translation: subjectsEng[i]}); 
      idCounter++;   
    }


    return ["hometown", sentenceStructure, initialWordsEs];

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


    const initialWordsKo = [];

    // add words to initial array Korean
    for (var i=0; i<nounsKo.length; i++) {
      initialWordsKo.push({id: idCounter, word: nounsKo[i], type:"noun", translation: nounsEng[i], romanized: nounsKoRom[i]});
      idCounter++;  
    }

    for (var i=0; i<verbsKo.length; i++) {
      initialWordsKo.push({id: idCounter, word: verbsKo[i], type:"verb", translation: verbsEng[i], romanized: verbsKoRom[i]}); 
      idCounter++;   
    }

    for (var i=0; i<subjectsKo.length; i++) {
      initialWordsKo.push({id: idCounter, word: subjectsKo[i], type:"subject", translation: subjectsEng[i], romanized: subjectsKoRom[i]}); 
      idCounter++;   
    }


    return ["hometown", sentenceStructure, initialWordsKo];;
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


    const initialWordsBg = [];

    // add words to initial array Bulgarian
    for (var i=0; i<nounsBg.length; i++) {
      initialWordsBg.push({id: idCounter, word: nounsBg[i], type:"noun", translation: nounsEng[i], romanized: nounsBgRom[i]});
      idCounter++;  
    }

    for (var i=0; i<verbsBg.length; i++) {
      initialWordsBg.push({id: idCounter, word: verbsBg[i], type:"verb", translation: verbsEng[i], romanized: verbsBgRom[i]}); 
      idCounter++;   
    }

    for (var i=0; i<subjectsBg.length; i++) {
      initialWordsBg.push({id: idCounter, word: subjectsBg[i], type:"subject", translation: subjectsEng[i], romanized: subjectsBgRom[i]}); 
      idCounter++;   
    }

    return ["hometown", sentenceStructure, initialWordsBg];;

  }
}

export default hometownList;
