import React, { useState } from 'react';

// create words dataset

const introductionList = (lang) => {

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

  var nounsEng = ["Student", "Writer", "Developer", "Designer", "Researcher", "Lawyer", "Teacher", "Engineer", "Artist", "Scientist", "Doctor", "Journalist"]

  var subjectsEng =   ['I', 'You', 'We', 'They', 'He', 'She']

  var verbsEng = ["To be", "Want to be", "Studying"]


  if (lang === 'es-MX') {

    // Spanish set

    var nounsEs = ["Estudiante", "Escritor", "Desarrollador", "Diseñador", "Investigador", "Abogado", "Profesor", "Ingeniero", "Artista", "Científico", "Doctor", "Periodista"]

    var verbsEs = ["Ser", "Quiero ser", "Estudiando"]

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


    return ["introduction", sentenceStructure, initialWordsEs];

  }

  if (lang === 'ko') {

    // Korean set

    var nounsKo = ["학생", "작가", "개발자", "디자이너", "연구원", "변호사", "교사", "기술자", "예술가", "과학자", "의사", "저널리스트"]

    var verbsKo = ["이다", "하고 싶다", "공부하고 있다"]

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


    return ["introduction", sentenceStructure, initialWordsKo];;
  }
}

export default introductionList;
