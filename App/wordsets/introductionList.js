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

  var nounsEng = ["Student", "Writer", "Developer", "Designer", "Researcher", "Lawyer", "Teacher", "Engineer", "Artist", "Scientist", "Doctor", "Journalist"]

  var subjectsEng =   ['I', 'You', 'We', 'They', 'He', 'She']

  var verbsEng = ["To be", "Want to be", "Studying"]


  if (lang === 'es-MX') {

    // Spanish set

    var nounsEs = ["Estudiante", "Escritor", "Desarrollador", "Diseñador", "Investigador", "Abogado", "Profesor", "Ingeniero", "Artista", "Científico", "Doctor", "Periodista"]

    var verbsEs = ["Ser", "Quiero ser", "Estudiando"]

    var subjectsEs = ['Yo', 'Tú', 'Nosotros', 'Ellos', 'Él', 'Ella']

    return ["introduction", sentenceStructure, consolidateWordSets(nounsEs, subjectsEs, verbsEs, nounsEng, subjectsEng, verbsEng)];

  }

  if (lang === 'ko') {

    // Korean set

    var nounsKo = ["학생", "작가", "개발자", "디자이너", "연구원", "변호사", "교사", "기술자", "예술가", "과학자", "의사", "저널리스트"]

    var verbsKo = ["이다", "하고 싶다", "공부하고 있다"]

    var subjectsKo = ['나', '너', '우리', '그들', '그', '그녀']

    // Romanized set

    var nounsKoRom = ["haksaeng", "jagga", "gaebalja", "dijaieoneo", "yeonguwon", "byeonhosa", "gyosa", "gisulja", "yesulga", "gwahagja", "uisa", "jeoneolliseuteu"]

    var verbsKoRom =["ida", "hago sipda", "gongbu-hago issda"]

    var subjectsKoRom = ['na', 'neo', 'uri', 'geudeul', 'geu', 'geunyeo']

    return ["introduction", sentenceStructure, consolidateWordSets(adjectivesKo, subjectsKo, verbsKo, adjectivesEng, subjectsEng, verbsEng, adjectivesKoRom, subjectsKoRom, verbsKoRom)];;
  }

  if (lang === 'bg') {

    // Bulgarian set

    var nounsBg = ["Студент", "Писател", "Разработчик", "Дизайнер", "Изследовател", "Адвокат", "Учител", "Инженер", "Художник", "Учен", "Доктор", "Журналист"]

    var subjectsBg = ['Аз', 'Ти', 'Ние', 'Те', 'Той', 'Тя']

    var verbsBg = ["Бъда", "Искам да бъда", "Уча"]

    // Romanized

    var nounsBgRom = ["Student", "Pisatel", "Razrabotchik", "Dizainer", "Izsledovatel", "Advokat", "Uchitel", "Inzhener", "Hudozhnik", "Uchen", "Doktor", "Zhurnalist"]

    var subjectsBgRom = ["Az", "Ti", "Nie", "Te", "Toy", "Tya"]

    var verbsBgRom = ["Bada", "Iskam da bada", "Ucha"]


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

    return ["introduction", sentenceStructure, initialWordsBg];;

  }
}

export default introductionList;
