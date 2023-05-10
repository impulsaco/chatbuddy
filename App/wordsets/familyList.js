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

  var nounsEng = ["Mother", "Father", "Daughter", "Son", "Boyfriend", "Girlfriend", "Grandmother", "Grandfather", "Aunt", "Uncle", "Cousin", "Sister", "Brother", "Nephew", "Niece"]

  var subjectsEng =   ['I', 'You', 'We', 'They', 'He', 'She']

  var verbsEng = ["Have", "Am", "Will be"]


  if (lang === 'es-MX') {

    // Spanish set

    var nounsEs = ["Madre", "Padre", "Hija", "Hijo", "Novio", "Novia", "Abuela", "Abuelo", "Tía", "Tío", "Primo/a", "Hermana", "Hermano", "Sobrino/a", "Sobrina/o"]

    var verbsEs = ["Tener", "Soy", "Será"]

    var subjectsEs = ['Yo', 'Tú', 'Nosotros', 'Ellos', 'Él', 'Ella']    

    return ["family", sentenceStructure, consolidateWordSets(nounsEs, subjectsEs, verbsEs, nounsEng, subjectsEng, verbsEng)];

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

    return ["family", sentenceStructure, consolidateWordSets(nounsKo, subjectsKo, verbsKo, nounsEng, subjectsEng, verbsEng, nounsKoRom, subjectsKoRom, verbsKoRom)];;
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

    return ["family", sentenceStructure, consolidateWordSets(nounsBg, subjectsBg, verbsBg, nounsEng, subjectsEng, verbsEng, nounsBgRom, subjectsBgRom, verbsBgRom)];;

  }

  if (lang === 'de') {
    // German set
    var nounsDe = ["Mutter", "Vater", "Tochter", "Sohn", "Freund", "Freundin", "Großmutter", "Großvater", "Tante", "Onkel", "Cousin/e", "Schwester", "Bruder", "Neffe", "Nichte"];
    var subjectsDe = ['Ich', 'Du', 'Wir', 'Sie', 'Er', 'Sie'];
    var verbsDe = ["Habe", "Bin", "Werde sein"];
  
    return ["family", sentenceStructure, consolidateWordSets(nounsDe, subjectsDe, verbsDe, nounsEng, subjectsEng, verbsEng)];
  }
  
  if (lang === 'ja') {
    // Japanese set
    var nounsJa = ["母", "父", "娘", "息子", "彼氏", "彼女", "祖母", "祖父", "叔母", "叔父", "いとこ", "姉", "兄", "甥", "姪"];
    var subjectsJa = ['私', 'あなた', '私たち', '彼ら', '彼', '彼女'];
    var verbsJa = ["持っている", "である", "になる"];
  
    return ["family", sentenceStructure, consolidateWordSets(nounsJa, subjectsJa, verbsJa, nounsEng, subjectsEng, verbsEng)];
  }
  
  if (lang === 'bn') {
    // Bengali set
    var nounsBn = ["মা", "বাবা", "মেয়ে", "ছেলে", "প্রেমিক", "প্রেমিকা", "দিদিমা", "দাদু", "পিসি", "কাকা", "চাচাতো/ভাইবোনের সন্তান", "বোন", "ভাই", "ভাইপো", "বোনপো"];
    var subjectsBn = ['আমি', 'তুমি', 'আমরা', 'তারা', 'সে', 'সে'];
    var verbsBn = ["আছে", "আমি", "হবে"];
  
    return ["family", sentenceStructure, consolidateWordSets(nounsBn, subjectsBn, verbsBn, nounsEng, subjectsEng, verbsEng)];
  }

  if (lang === 'sq') {
    // Albanian set
    var nounsSq = ["Nëna", "Babai", "Vajza", "Djali", "I dashuri", "E dashura", "Gjyshja", "Gjyshi", "Halla", "Daja", "Kushëri/a", "Motra", "Vëllai", "Nip", "Mbesa"];
    var subjectsSq = ['Unë', 'Ti', 'Ne', 'Ata', 'Ai', 'Ajo'];
    var verbsSq = ["Kam", "Jam", "Do të jem"];
  
    return ["family", sentenceStructure, consolidateWordSets(nounsSq, subjectsSq, verbsSq, nounsEng, subjectsEng, verbsEng)];
  }
}

export default familyList;
