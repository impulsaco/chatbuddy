import React, { useState } from 'react';

// create words dataset

const placesList = (lang) => {

  var idCounter = 0;

  // Sentence structure: subject + verb + preposition + noun

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
        "type": "preposition",
        "word": "PREPOSITION",
    },
    {
        "id": -4,
        "type": "noun",
        "word": "NOUN",
    }  
  ]

  function consolidateWordSets(nouns, subjects, verbs, prepositions, nounsTranslations, subjectsTranslations, verbsTranslations, prepositionsTranslations, nounsRomanized, subjectsRomanized, verbsRomanized, prepositionsRomanized) {
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

    for (let i = 0; i < prepositions.length; i++) {
      words.push({ id: idCounter++, word: prepositions[i], type: "preposition", translation: prepositionsTranslations[i], romanized: prepositionsRomanized && prepositionsRomanized[i] });
    }

    return words;
  }


  // English set

  var nounsEng = ['Home', 'School', 'Office', 'Bus', 'Gym', 'Park', 'Bank', 'Grocery Store', 'Library', 'Movie Theater', 'Post Office', 'Shopping Mall'];

  var subjectsEng =   ['I', 'You', 'We', 'They', 'He', 'She']

  var verbsEng = ['Go', 'Sleep', 'Play', 'Run', 'Walk', 'Swim', 'Study', 'Work'];

  var prepositionsEng = ['To', 'On', 'In', 'At', 'From', 'Over', 'Under', 'Through'];


  if (lang === 'es-MX') {

    // Spanish set

    var nounsEs = ['Casa', 'Escuela', 'Oficina', 'Autobús', 'Gimnasio', 'Parque', 'Banco', 'Tienda de comestibles', 'Biblioteca', 'Cine', 'Oficina de correos', 'Centro comercial'];

    var verbsEs = ['Ir', 'Dormir', 'Jugar', 'Correr', 'Caminar', 'Nadar', 'Estudiar', 'Trabajar'];

    var prepositionsEs = ['A', 'En', 'En', 'En', 'De', 'Sobre', 'Debajo de', 'A través de'];

    var subjectsEs = ['Yo', 'Tú', 'Nosotros', 'Ellos', 'Él', 'Ella']

    return ["places", sentenceStructure, consolidateWordSets(nounsEs, subjectsEs, verbsEs, prepositionsEs, nounsEng, subjectsEng, verbsEng, prepositionsEng)];

  }

  if (lang === 'ko') {

    // Korean set

    var nounsKo = ['집', '학교', '사무실', '버스', '체육관', '공원', '은행', '식료품점', '도서관', '영화관', '우체국', '쇼핑몰'];

    var verbsKo = ['가다', '자다', '놀다', '달리다', '걷다', '수영하다', '공부하다', '일하다'];

    var prepositionsKo = ['~(으)로', '~에', '~에', '~에', '~로부터', '~위에', '~아래에', '~을(를) 통해'];

    var subjectsKo = ['나', '너', '우리', '그들', '그', '그녀']

    // Romanized Korean: 

    var subjectsKoRom = ['na', 'neoneun', "uiri", "geudeul", "geu", "geunyeo"]

    var nounsKoRom = ['Jip', 'Hakgyo', 'Samusil', 'Beoseu', 'Cheyukgwan', 'Gongwon', 'Eunhaeng', 'Sikryopumjeom', 'Doseogwan', 'Yeonghwagwan', 'Ucheguk', 'Syopingmol'];

    var verbsKoRom = ['Gada', 'Jada', 'Nolda', 'Dallida', 'Geotda', 'Suyeonghada', 'Gongbuhada', 'Ilhada'];

    var prepositionsKoRom = ['~(eu)ro', '~e', '~e', '~e', '~robeo', '~wie', '~arae-e', '~eul(leul) tonghae'];

    return ["places", sentenceStructure, consolidateWordSets(nounsKo, subjectsKo, verbsKo, prepositionsKo, nounsEng, subjectsEng, verbsEng, prepositionsKo, nounsKoRom, subjectsKoRom, verbsKoRom, prepositionsKoRom)];;
  }

  if (lang === 'bg') {

    // Bulgarian set

    var subjectsBg = ['Аз', 'Ти', 'Ние', 'Те', 'Той', 'Тя']

    var nounsBg = ['Къща', 'Училище', 'Офис', 'Автобус', 'Фитнес зала', 'Парк', 'Банка', 'Храни магазин', 'Библиотека', 'Кино', 'Пощенска станция', 'Търговски център'];

    var verbsBg = ['Отивам', 'Спя', 'Играя', 'Тичам', 'Ходя', 'Плувам', 'Уча', 'Работя'];

    var prepositionsBg = ['До', 'На', 'В', 'В', 'От', 'Над', 'Под', 'През'];


    // Romanized Bulgarian

    var subjectsBgRom = ['Az', 'Ti', 'Nie', 'Te', 'Toi', 'Tya']

    var nounsBgRom = ['Kashta', 'Uchilishte', 'Ofis', 'Avtobus', 'Sporten tsentar', 'Park', 'Banka', 'Magazin', 'Biblioteka', 'Kino', 'Poshta', 'Turgovski tsentar'];

    var verbsBgRom = ['Otviam', 'Spia', 'Igraia', 'Ticham', 'Hodia', 'Pluvam', 'Ucha', 'Rabotia'];

    var prepositionsBgRom = ['Kam', 'Na', 'V', 'Varhu', 'Ot', 'Nad', 'Pod', 'Prez'];

    return ["places", sentenceStructure, consolidateWordSets(nounsBg, subjectsBg, verbsBg, prepositionsBg, nounsEng, subjectsEng, verbsEng, prepositionsBg, nounsBgRom, subjectsBgRom, verbsBgRom, prepositionsBgRom)];;

  }

  if (lang === 'de') {
    // German set
    var nounsDe = ['Zuhause', 'Schule', 'Büro', 'Bus', 'Fitnessstudio', 'Park', 'Bank', 'Lebensmittelgeschäft', 'Bibliothek', 'Kino', 'Post', 'Einkaufszentrum'];
    var subjectsDe = ['Ich', 'Du', 'Wir', 'Sie', 'Er', 'Sie'];
    var verbsDe = ['Gehen', 'Schlafen', 'Spielen', 'Laufen', 'Gehen', 'Schwimmen', 'Lernen', 'Arbeiten'];
    var prepositionsDe = ['Zu', 'Auf', 'In', 'An', 'Von', 'Über', 'Unter', 'Durch'];
  
    return ["places", sentenceStructure, consolidateWordSets(nounsDe, subjectsDe, verbsDe, prepositionsDe, nounsEng, subjectsEng, verbsEng, prepositionsEng)];
  }
  
  if (lang === 'ja') {
    // Japanese set
    var nounsJa = ['家', '学校', 'オフィス', 'バス', 'ジム', '公園', '銀行', '食料品店', '図書館', '映画館', '郵便局', 'ショッピングモール'];
    var subjectsJa = ['私', 'あなた', '私たち', '彼ら', '彼', '彼女'];
    var verbsJa = ['行く', '寝る', '遊ぶ', '走る', '歩く', '泳ぐ', '勉強する', '働く'];
    var prepositionsJa = ['へ', 'で', 'で', 'で', 'から', '上', '下', 'を通って'];
  
    return ["places", sentenceStructure, consolidateWordSets(nounsJa, subjectsJa, verbsJa, prepositionsJa, nounsEng, subjectsEng, verbsEng, prepositionsEng)];
  }

  if (lang === 'bn') {
    // Bengali set
    var nounsBn = ['বাড়ি', 'স্কুল', 'অফিস', 'বাস', 'জিম', 'পার্ক', 'ব্যাংক', 'মুদিখানা', 'গ্রন্থাগার', 'সিনেমা হল', 'ডাকঘর', 'শপিং মল'];
    var subjectsBn = ['আমি', 'তুমি', 'আমরা', 'তারা', 'সে', 'সে'];
    var verbsBn = ['যাওয়া', 'ঘুমানো', 'খেলা', 'দৌড়ানো', 'হাঁটা', 'সাঁতার কাটা', 'পড়া', 'কাজ করা'];
    var prepositionsBn = ['প্রতি', 'উপর', 'মধ্যে', 'এ', 'থেকে', 'উপর', 'নিচে', 'মাধ্যমে'];

    return ["places", sentenceStructure, consolidateWordSets(nounsBn, subjectsBn, verbsBn, prepositionsBn, nounsEng, subjectsEng, verbsEng, prepositionsEng)];
  }
  
  if (lang === 'sq') {
    // Albanian set
    var nounsSq = ['Shtëpi', 'Shkollë', 'Zyrë', 'Autobus', 'Palestër', 'Park', 'Bankë', 'Dyqan ushqimesh', 'Bibliotekë', 'Kinema', 'Postë', 'Qendër tregtare'];
    var subjectsSq = ['Unë', 'Ti', 'Ne', 'Ata', 'Ai', 'Ajo'];
    var verbsSq = ['Shkoj', 'Fle', 'Luaj', 'Vrapoj', 'Ec', 'Not', 'Studioj', 'Punoj'];
    var prepositionsSq = ['Për', 'Mbi', 'Në', 'Tek', 'Nga', 'Mbi', 'Nën', 'Përmes'];
  
    return ["places", sentenceStructure, consolidateWordSets(nounsSq, subjectsSq, verbsSq, prepositionsSq, nounsEng, subjectsEng, verbsEng, prepositionsEng)];
  }
}

export default placesList;
