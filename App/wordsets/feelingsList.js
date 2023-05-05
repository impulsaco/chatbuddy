import React, { useState } from 'react';

// create words dataset

const feelingsList = (lang) => {

  var idCounter = 0;

  // Sentence structure: subject + verb + adjective + adjective

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
        "type": "adjective",
        "word": "ADJECTIVE",
    }  
  ]
  
  function consolidateWordSets(adjectives, subjects, verbs, adjectivesTranslations, subjectsTranslations, verbsTranslations, adjectivesRomanized, subjectsRomanized, verbsRomanized) {
    const words = [];

    for (let i = 0; i < adjectives.length; i++) {
      words.push({ id: idCounter++, word: adjectives[i], type: "adjective", translation: adjectivesTranslations[i], romanized: adjectivesRomanized && adjectivesRomanized[i] });
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

  var adjectivesEng = ['Joyful', 'Hopeful', 'Happy', 'Loved', 'Amused', 'Determined', 'Energetic', 'Calm', 'Fulfilled', 'Relaxed', 'Sad', 'Anxious', 'Disillusioned'];

  var subjectsEng =   ['I', 'You', 'We', 'They', 'He', 'She']

  var verbsEng = ["Is", "Am", "Are", "Feel"]


  if (lang === 'es-MX') {

    // Spanish set

    var verbsEs = ["Es", "Soy", "Son", "Siento"]

    var adjectivesEs = ['Alegre', 'Esperanzado', 'Feliz', 'Amado', 'Divertido', 'Determinado', 'Energético', 'Calmado', 'Realizado', 'Relajado', 'Triste', 'Ansioso', 'Desilusionado']

    var subjectsEs = ['Yo', 'Tú', 'Nosotros', 'Ellos', 'Él', 'Ella']

    return ["feelings", sentenceStructure, consolidateWordSets(adjectivesEs, subjectsEs, verbsEs, adjectivesEng, subjectsEng, verbsEng)];

  }

  if (lang === 'ko') {

    // Korean set

    var verbsKo = ['이다', '있다', '입니다', '느끼다']

    var adjectivesKo = ['기쁜', '희망적인', '행복한', '사랑받는', '재미있는', '결심한', '에너지넘치는', '차분한', '만족한', '편안한', '슬픈', '불안한', '환멸한']

    var subjectsKo = ['나', '너', '우리', '그들', '그', '그녀']

    // Korean romanized

    var verbsKoRom = ['ida', 'issda', 'imnida', 'neukkida'] 

    var adjectivesKoRom = ['Gippeun', 'Huimangjeog-in', 'Haengbokhan', 'Sarangbad-neun', 'Jaemi-in-neun', 'Gyeolsimhan', 'Eneoji-neomchineun', 'Chabunhan', 'Manjokhan', 'Pyonanhan', 'Seulpeun', 'Buranhan', 'Hwanmyeolhan']

    var subjectsKoRom = ['na', 'neoneun', "uiri", "geudeul", "geu", "geunyeo"]

    return ["feelings", sentenceStructure, consolidateWordSets(adjectivesKo, subjectsKo, verbsKo, adjectivesEng, subjectsEng, verbsEng, adjectivesKoRom, subjectsKoRom, verbsKoRom)];;
  }

  if (lang === 'bg') {

    // Bulgarian set

    var verbsBg = ['Е', 'Съм', 'Са', 'Усещам']

    var adjectivesBg = ['Радостен', 'Надежден', 'Щастлив', 'Любим', 'Забавен', 'Решителен', 'Енергичен', 'Спокоен', 'Удовлетворен', 'Релаксиран', 'Тъжен', 'Тревожен', 'Разочарован']

    var subjectsBg = ['Аз', 'Ти', 'Ние', 'Те', 'Той', 'Тя']

    // Romanized Bulgarian

    var verbsBgRom = ['E', 'Sum', 'Sa', 'Useshtam']

    var adjectivesBgRom = ['Radosten', 'Nadezhdenn', 'Shtastlivi', 'Lyubim', 'Zabaven', 'Reshitelen', 'Energiichen', 'Spokoen', 'Udovletvoren', 'Relaksiran', 'Tazhen', 'Trevozhen', 'Razocharovann']

    var subjectsBgRom = ['Az', 'Ti', 'Nie', 'Te', 'Toi', 'Tya']

    return ["feelings", sentenceStructure, consolidateWordSets(adjectivesBg, subjectsBg, verbsBg, adjectivesEng, subjectsEng, verbsEng, adjectivesBgRom, subjectsBgRom, verbsBgRom)];;

  }
}

export default feelingsList;
