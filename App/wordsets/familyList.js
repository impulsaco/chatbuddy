import React, { useState } from 'react';

// create words dataset

const familyList = (lang) => {

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

  var nounsEng = ["Mother", "Father", "Daughter", "Son", "Boyfriend", "Girlfriend", "Grandmother", "Grandfather", "Aunt", "Uncle", "Cousin", "Sister", "Brother", "Nephew", "Niece"]

  var subjectsEng =   ['I', 'You', 'We', 'They', 'He', 'She']

  var verbsEng = ["Have", "Am", "Will be"]


  if (lang === 'es-MX') {

    // Spanish set

    var nounsEs = ["Madre", "Padre", "Hija", "Hijo", "Novio", "Novia", "Abuela", "Abuelo", "Tía", "Tío", "Primo/a", "Hermana", "Hermano", "Sobrino/a", "Sobrina/o"]

    var verbsEs = ["Tener", "Soy", "Será"]

    var subjectsEs = ['Yo', 'Tú', 'Nosotros', 'Ellos', 'Él', 'Ella']

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


    return ["family", sentenceStructure, initialWordsEs];

  }

  if (lang === 'ko') {

    // Korean set

    var nounsKo = ["어머니", "아버지", "딸", "아들", "남자 친구", "여자 친구", "할머니", "할아버지", "삼촌", "사촌", "사촌", "여동생", "남동생", "조카", "조카"]

    var verbsKo = ["있다", "이다", "될 것입니다"]

    var subjectsKo = ['나', '너', '우리', '그들', '그', '그녀']

    // Korean romanized

    var nounsKoRom = ["eomeoni", "abeoji", "ttal", "adeul", "namja chingu", "yeoja chingu", "halmonee", "harabeoji", "samchon", "sachon", "sachon", "yeodongsaeng", "namdongsaeng", "joka", "joka"]

    var verbsKoRom = ["itda", "ida", "deul geosimnida"]

    var subjectsKoRom = ['na', 'neoneun', "uiri", "geudeul", "geu", "geunyeo"]

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


    return ["family", sentenceStructure, initialWordsKo];;
  }

  if (lang === 'bg') {

    // Bulgarian set

    var nounsBg = ["Майка", "Баща", "Дъщеря", "Син", "Момче", "Момиче", "Баба", "Дядо", "Леля", "Чичо", "Кузин/Кузън", "Сестра", "Брат", "Внук/Внучка", "Внуче/Внуко"]

    var verbsBg = ["Имам", "Съм", "Ще бъда"]

    var subjectsBg = ['Аз', 'Ти', 'Ние', 'Те', 'Той', 'Тя']

    // Romanized Bulgarian

    var nounsBgRom = ["Majka", "Basha", "Dusherya", "Sin", "Momche", "Momiche", "Baba", "Dyado", "Lelya", "Chicho", "Kuzin/Kuzun", "Sestra", "Brat", "Vnuk/Vnuchka", "Vnuche/Vnuko"]

    var verbsBgRom = ["Imam", "Sam", "Shta budya"]

    var subjectsBgRom = ['Az', 'Ti', 'Nie', 'Te', 'Toi', 'Tya']

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

    return ["family", sentenceStructure, initialWordsBg];;

  }
}

export default familyList;
