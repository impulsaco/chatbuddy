import React, { useState } from 'react';

// create words dataset

const hobbiesList = (lang) => {

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
  
  // Consolidate word sets

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

  var nounsEng = ["Guitar", "Tennis", "Painting", "Writing", "Baking", "Cooking", "Fishing", "Camping", "Skiing", "Yoga", "Jogging", "Books", "Chess", "Hiking", "Cycling", "Badminton", "Volleyball", "Dancing", "Singing"]

  var subjectsEng =   ['I', 'You', 'We', 'They', 'He', 'She']

  var verbsEng = ["Play", "Like", "Do", "Read", "Go for"]


  // Spanish set

  if (lang === 'es-MX') {

    var nounsEs = ["Guitarra", "Tenis", "Pintura", "Escritura", "Horneado", "Cocinar", "Pescar", "Acampar", "Esquí", "Yoga", "Correr", "Libros", "Ajedrez", "Senderismo", "Ciclismo", "Badminton", "Voleibol", "Bailar", "Cantar"]

    var verbsEs = ["Jugar", "Gustar", "Hacer", "Leer", "Ir por"]

    var subjectsEs = ['Yo', 'Tú', 'Nosotros', 'Ellos', 'Él', 'Ella']

    return ["hobbies", sentenceStructure, consolidateWordSets(nounsEs, subjectsEs, verbsEs, nounsEng, subjectsEng, verbsEng)];

  }

  // Korean set

  if (lang === 'ko') {

    var nounsKo = ["기타", "테니스", "회화", "글쓰기", "바이킹", "요리", "낚시", "캠핑", "스키", "요가", "조깅", "책", "체스", "하이킹", "사이클링", "배드민턴", "배구", "춤추기", "노래하기"]

    var verbsKo = ["놀이", "좋아하다", "하다", "읽다", "가다"]

    var subjectsKo = ['나', '너', '우리', '그들', '그', '그녀']

    // Romanized Korean

    var nounsKoRom = ["gita", "teniseu", "hoehwa", "geulsseugi", "baiking", "yori", "naksi", "kaemping", "seuki", "yoga", "joging", "chaek", "cheseu", "hai king", "saikelring", "baedeumin teon", "baegu", "chumchugi", "noraehagi"];

    var verbsKoRom = ["nori", "johahada", "hada", "ikda", "gada"];

    var subjectsKoRom = ['na', 'neo', 'uri', 'geudeul', 'geu', 'geunyeo'];

    return ["hobbies", sentenceStructure, consolidateWordSets(nounsKo, subjectsKo, verbsKo, nounsEng, subjectsEng, verbsEng, nounsKoRom, subjectsKoRom, verbsKoRom)];;
  }

  if (lang === 'bg') {

    // Bulgarian set

    var nounsBg = ["Китара", "Тенис", "Живопис", "Писане", "Печене", "Готвене", "Риболов", "Къмпинг", "Ски", "Йога", "Бягане", "Книги", "Шах", "Планински преход", "Колоездене", "Бадминтон", "Волейбол", "Танци", "Пеене"]

    var subjectsBg = ['Аз', 'Ти', 'Ние', 'Те', 'Той', 'Тя']

    var verbsBg = ["Свиря", "Харесвам", "Упражнявам", "Чета", "Ходя на"]

    // Romanized Bulgarian

    var nounsBgRom = ["Kitara", "Tenis", "Zhivopis", "Pisane", "Pechene", "Gotvene", "Ribolov", "Kamping", "Ski", "Yoga", "Byagane", "Knigi", "Shah", "Planinski prehod", "Koloezdene", "Badminton", "Voleybol", "Tantsi", "Peene"];

    var subjectsBgRom = ['Az', 'Ti', 'Nie', 'Te', 'Toi', 'Tya'];

    var verbsBgRom = ["Sviriya", "Haresvam", "Uprazhnyavam", "Cheta", "Hodya na"];

    return ["hobbies", sentenceStructure, consolidateWordSets(nounsBg, subjectsBg, verbsBg, nounsEng, subjectsEng, verbsEng, nounsBgRom, subjectsBgRom, verbsBgRom)];;

  }
}

export default hobbiesList;
