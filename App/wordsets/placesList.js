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

    for (var i=0; i<prepositionsEs.length; i++) {
      initialWordsEs.push({id: idCounter, word: prepositionsEs[i], type:"preposition", translation: prepositionsEng[i]}); 
      idCounter++;   
    }

    return ["places", sentenceStructure, initialWordsEs];

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

    for (var i=0; i<prepositionsKo.length; i++) {
      initialWordsKo.push({id: idCounter, word: prepositionsKo[i], type:"preposition", translation: prepositionsEng[i], romanized: prepositionsKoRom[i]}); 
      idCounter++;   
    }

    return ["places", sentenceStructure, initialWordsKo];;
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

    for (var i=0; i<prepositionsBg.length; i++) {
      initialWordsBg.push({id: idCounter, word: prepositionsBg[i], type:"preposition", translation: prepositionsEng[i], romanized: prepositionsBgRom[i]}); 
      idCounter++;   
    }

    return ["places", sentenceStructure, initialWordsBg];;

  }
}

export default placesList;
