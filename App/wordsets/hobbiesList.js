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

  // English set

  var nounsEng = ["Guitar", "Tennis", "Painting", "Writing", "Baking", "Cooking", "Fishing", "Camping", "Skiing", "Yoga", "Jogging", "Books", "Chess", "Hiking", "Cycling", "Badminton", "Volleyball", "Dancing", "Singing"]

  var subjectsEng =   ['I', 'You', 'We', 'They', 'He', 'She']

  var verbsEng = ["Play", "Like", "Do", "Read", "Go for"]


  if (lang === 'es-MX') {

    // Spanish set

    var nounsEs = ["Guitarra", "Tenis", "Pintura", "Escritura", "Horneado", "Cocinar", "Pescar", "Acampar", "Esquí", "Yoga", "Correr", "Libros", "Ajedrez", "Senderismo", "Ciclismo", "Badminton", "Voleibol", "Bailar", "Cantar"]

    var verbsEs = ["Jugar", "Gustar", "Hacer", "Leer", "Ir por"]

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


    return ["hobbies", sentenceStructure, initialWordsEs];

  }

  if (lang === 'ko') {

    // Korean set

    var nounsKo = ["기타", "테니스", "회화", "글쓰기", "바이킹", "요리", "낚시", "캠핑", "스키", "요가", "조깅", "책", "체스", "하이킹", "사이클링", "배드민턴", "배구", "춤추기", "노래하기"]

    var verbsKo = ["놀이", "좋아하다", "하다", "읽다", "가다"]

    var subjectsKo = ['나', '너', '우리', '그들', '그', '그녀']

    const initialWordsKo = [];

    // add words to initial array Korean
    for (var i=0; i<nounsKo.length; i++) {
      initialWordsKo.push({id: idCounter, word: nounsKo[i], type:"noun", translation: nounsEng[i]});
      idCounter++;  
    }

    for (var i=0; i<verbsKo.length; i++) {
      initialWordsKo.push({id: idCounter, word: verbsKo[i], type:"verb", translation: verbsEng[i]}); 
      idCounter++;   
    }

    for (var i=0; i<subjectsKo.length; i++) {
      initialWordsKo.push({id: idCounter, word: subjectsKo[i], type:"subject", translation: subjectsEng[i]}); 
      idCounter++;   
    }


    return ["hobbies", sentenceStructure, initialWordsKo];;
  }

  if (lang === 'bg') {

    // Bulgarian set

    var nounsBg = ["Китара", "Тенис", "Живопис", "Писане", "Печене", "Готвене", "Риболов", "Къмпинг", "Ски", "Йога", "Бягане", "Книги", "Шах", "Планински преход", "Колоездене", "Бадминтон", "Волейбол", "Танци", "Пеене"]

    var subjectsBg = ['Аз', 'Ти', 'Ние', 'Те', 'Той', 'Тя']

    var verbsBg = ["Свиря", "Харесвам", "Упражнявам", "Чета", "Ходя на"]

    const initialWordsBg = [];

    // add words to initial array Bulgarian
    for (var i=0; i<nounsBg.length; i++) {
      initialWordsBg.push({id: idCounter, word: nounsBg[i], type:"noun", translation: nounsEng[i]});
      idCounter++;  
    }

    for (var i=0; i<verbsBg.length; i++) {
      initialWordsBg.push({id: idCounter, word: verbsBg[i], type:"verb", translation: verbsEng[i]}); 
      idCounter++;   
    }

    for (var i=0; i<subjectsBg.length; i++) {
      initialWordsBg.push({id: idCounter, word: subjectsBg[i], type:"subject", translation: subjectsEng[i]}); 
      idCounter++;   
    }

    return ["hobbies", sentenceStructure, initialWordsBg];;

  }
}

export default hobbiesList;
