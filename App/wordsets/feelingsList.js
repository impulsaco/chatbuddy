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

  // English set

  var adjectivesEng = ['Joyful', 'Hopeful', 'Happy', 'Loved', 'Amused', 'Determined', 'Energetic', 'Calm', 'Fulfilled', 'Relaxed', 'Sad', 'Anxious', 'Disillusioned'];

  var subjectsEng =   ['I', 'You', 'We', 'They', 'He', 'She']

  var verbsEng = ["Is", "Am", "Are", "Feel"]


  if (lang === 'es-MX') {

    // Spanish set

    var verbsEs = ["Es", "Soy", "Son", "Siento"]

    var adjectivesEs = ['Alegre', 'Esperanzado', 'Feliz', 'Amado', 'Divertido', 'Determinado', 'Energético', 'Calmado', 'Realizado', 'Relajado', 'Triste', 'Ansioso', 'Desilusionado']

    var subjectsEs = ['Yo', 'Tú', 'Nosotros', 'Ellos', 'Él', 'Ella']

    const initialWordsEs = [];

    for (var i=0; i<adjectivesEs.length; i++) {
      initialWordsEs.push({id: idCounter, word: adjectivesEs[i], type:"adjective", translation: adjectiveEng[i]});
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


    return ["feelings", sentenceStructure, initialWordsEs];

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

    const initialWordsKo = [];

    // add words to initial array Korean
    for (var i=0; i<adjectivesKo.length; i++) {
      initialWordsKo.push({id: idCounter, word: adjectivesKo[i], type:"adjective", translation: adjectivesEng[i], romanized: adjectivesKoRom[i]});
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


    return ["feelings", sentenceStructure, initialWordsKo];;
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

    const initialWordsBg = [];

    // add words to initial array Bulgarian
    for (var i=0; i<adjectivesBg.length; i++) {
      initialWordsBg.push({id: idCounter, word: adjectivesBg[i], type:"adjective", translation: adjectivesEng[i], romanized: adjectivesBgRom[i]});
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

    return ["feelings", sentenceStructure, initialWordsBg];;

  }
}

export default feelingsList;
