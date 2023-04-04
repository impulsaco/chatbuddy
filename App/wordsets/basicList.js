import React, { useState } from 'react';

// create words dataset

const basicList = (lang) => {

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

  var nounsEng = ["person", "water", "air", "ring", "animal", "art", "flag", "boat", "kiss", "bed", "field", "sky", "ribbon", "food", "rope", "finger", "money", "school", "flower", "fruit", "grain", "man", "hour", "church", "book", "light", "hand", "map", "table", "world", "woman", "music", "nose", "snow", "paper", "umbrella", "parka", "cake", "hair", "pizza", "door", "clock", "rock", "salt", "chair", "hat", "floor", "cup", "earth", "tiger", "tower", "window", "wind"]

  var subjectsEng =   ["I","you","he","they","we","she","who","them","me","him","one","her","us","something","nothing","anything","himself","everything","someone","themselves","everyone","itself","anyone","myself"]

  var verbsEng = ['be', 'stay', 'have', 'love', 'make', 'say', 'go', 'see', 'be able to', 'want', 'carry', 'know', 'bring', 'owe', 'come', 'have', 'speak', 'look for', 'call', 'pass', 'raise', 'catch', 'leave', 'find', 'enter', 'save', 'like', 'matter', 'play', 'maintain', 'look', 'ride', 'need', 'happen', 'offer', 'ask', 'allow', 'put', 'try', 'follow', 'feel', 'serve', 'happen', 'finish', 'try', 'result']  


  if (lang === 'es-MX') {

    // Spanish set

    var nounsEs = ['persona', 'agua', 'aire', 'anillo', 'animal', 'arte', 'bandera', 'barco', 'beso', 'cama', 'campo', 'cielo', 'cinta', 'comida', 'cuerda', 'dedo', 'dinero', 'escuela', 'flor', 'fruta', 'grano', 'hombre', 'hora', 'iglesia', 'libro', 'luz', 'mano', 'mapa', 'mesa', 'mundo', 'mujer', 'musica', 'nariz', 'nieve', 'papel', 'paraguas', 'parka', 'pastel', 'pelo', 'pizza', 'puerta', 'reloj', 'roca', 'sal', 'silla', 'sombrero', 'suelo', 'taza', 'tierra', 'tigre', 'torre', 'ventana', 'viento']

    var verbsEs = ['ser', 'estar', 'tener', 'amar', 'hacer', 'decir', 'ir', 'ver', 'poder', 'querer', 'llevar', 'saber', 'traer','deber', 'venir', 'haber', 'hablar', 'buscar', 'llamar', 'pasar', 'levantar', 'coger', 'dejar', 'encontrar', 'entrar', 'guardar', 'gustar', 'importar', 'jugar', 'mantener', 'mirar', 'montar', 'necesitar', 'ocurrir', 'ofrecer', 'pedir', 'permitir', 'poner', 'probar', 'seguir', 'sentir', 'servir', 'suceder', 'terminar', 'intentar', 'resultar']

    var subjectsEs = ["yo","tú","él","ellos","nosotros","ella","quién","ellos","mí","él","uno","ella","nosotros","algo","nada","cualquier cosa","él mismo","todo","alguien","ellos mismos","todos","si misma","cualquier persona","yo mismo"]

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

    for (var i=0; i<adjectivesEs.length; i++) {
      initialWordsEs.push({id: idCounter, word: adjectivesEs[i], type:"adjective", translation: adjectivesEng[i]}); 
      idCounter++;   
    }

    return ["basic", sentenceStructure, initialWordsEs];

  }

  if (lang === 'ko') {

    // Korean set

    var nounsKo = ['사람', '물', '공기', '반지', '동물', '예술', '깃발', '배', '키스', '침대', '들판', '하늘', '리본', '음식', '줄', '손가락', '돈', '학교', '꽃', '과일', '곡물', '남자', '시간', '교회', '책', '빛', '손', '지도', '테이블', '세계', '여자', '음악', '코', '눈', '종이', '우산', '패딩조끼', '케이크', '머리', '피자', '문', '시계', '바위', '소금', '의자', '모자', '바닥', '컵', '지구', '호랑이', '탑', '창문', '바람']

    var verbsKo = ['있다', '되다', '가지다', '사랑하다', '하다', '말하다', '가다', '보다', '할 수 있다', '원하다', '가져가다', '알다', '가져오다','해야 하다', '오다', '있다', '말하다', '찾다', '부르다', '지나가다', '들어올리다', '잡다', '내려놓다', '발견하다', '들어가다', '보관하다', '좋아하다', '중요하다', '놀다', '유지하다', '바라보다', '올라타다', '필요하다', '발생하다', '제공하다', '요청하다', '허용하다', '싣다', '시험하다', '따라가다', '느끼다', '서비스하다', '발생하다', '끝내다', '시도하다', '결과나다']

    var subjectsKo = ["나","당신","그","그들","우리","그녀","누구","그들","나 자신","그","하나","그녀","우리","뭔가","아무것도","무엇이든지","그 자신","모든 것","누군가","그들 자신","모두","그 자신","누구든지","나 자신"]
    
    // Romanized Korean

    var nounsKoRom = ['saram', 'mul', 'gonggi', 'banji', 'dongmul', 'yesul', 'gibbal', 'bae', 'kiseu', 'chimdae', 'deulpang', 'haneul', 'ribon', 'eumsik', 'jul', 'songarak', 'don', 'hakgyo', 'kkot', 'gwail', 'gogmul', 'namja', 'sigan', 'gyohoe', 'chaek', 'bit', 'son', 'jido', 'teibeul', 'segye', 'yeoja', 'eumak', 'ko', 'nun', 'jongi', 'usan', 'paedingjokki', 'keikeu', 'meori', 'pija', 'mun', 'sigye', 'barwi', 'sogeum', 'uija', 'moja', 'badak', 'keop', 'jigu', 'horang-i', 'tab', 'changmun', 'baram'];

    var verbsKoRom = ['itda', 'doeda', 'gajida', 'saranghada', 'hada', 'malhada', 'gada', 'boda', 'hal su itda', 'wonhada', 'gajyeogada', 'alda', 'gajyeo-oda', 'haeya hada', 'oda', 'itda', 'malhada', 'chajda', 'buleuda', 'jinagada', 'deureoolida', 'japda', 'naeryeonohda', 'balgyeonhada', 'deureoga-oda', 'bogwanhada', 'joh-ahada', 'jung-yohada', 'nolda', 'yuji-hada', 'baraboda', 'ollatada', 'piryohada', 'balsaenghada', 'jegonghada', 'yocheonghada', 'heoyonghada', 'sida', 'siheomhada', 'ttaragada', 'neukkida', 'seobiseuhada', 'balsaenghada', 'kkeutnaeda', 'sidohada', 'gyeolgwahanada'];

    var subjectsKoRom = ["na","dangsin","geu","geudeul","uri","geunyeo","nugu","geudeul","na jasin","geu","hana","geunyeo","uri","mwonga","amugeotdo","mueosideunji","geu jasin","modeun geot","nugunga","geudeul jasin","modu","geu jasin","nugudeunji","na jasin"]

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


    return ["basic", sentenceStructure, initialWordsKo];;
  }

  if (lang === 'bg') {

    // Bulgarian set

    // Bulgarian set

    var nounsBg = ['човек', 'вода', 'въздух', 'пръстен', 'животно', 'изкуство', 'знаме', 'кораб', 'целувка', 'легло', 'поле', 'небе', 'лента', 'храна', 'връв', 'пръст', 'пари', 'училище', 'цвете', 'плод', 'зърно', 'мъж', 'час', 'църква', 'книга', 'светлина', 'ръка', 'карта', 'маса', 'светът', 'жена', 'музика', 'нос', 'сняг', 'хартия', 'чадър', 'палто', 'торта', 'коса', 'пица', 'врата', 'часовник', 'камък', 'сол', 'стол', 'шапка', 'земя', 'чаша', 'земя', 'тигър', 'крепост', 'прозорец', 'ветер']

    var verbsBg = ['бъда', 'бивам', 'имам', 'обичам', 'правя', 'казвам', 'отивам', 'виждам', 'мога', 'искам', 'нося', 'зная', 'донеса', 'трябва', 'прибирам', 'има', 'говоря', 'търся', 'викам', 'минавам', 'подигам', 'хващам', 'оставям', 'намирам', 'влизам', 'запазвам', 'харесвам', 'имам значение', 'играя', 'поддържам', 'поглеждам', 'качвам', 'се нуждая', 'случвам', 'предлагам', 'искам', 'позволявам', 'поставям', 'пробвам', 'последвам', 'чувствам', 'обслужвам', 'случвам се', 'завършвам', 'опитвам се', 'резултат', 'бързам']

    var subjectsBg = ["аз","ти","той","те","ние","тя","кой","те","мени","той","някой","тя","ние","някакво","нищо","всяко нещо","самият той","всичко","някой","тези сами","всички","самата тя","всяка една","аз самият си","всеки"]

    // Romanized Bulgarian

    var nounsBgRom = ['chovek', 'voda', 'vazduh', 'prasten', 'zhivotno', 'izkustvo', 'zname', 'korab', 'tseluvka', 'leglo', 'pole', 'nebe', 'lenta', 'hrana', 'vrav', 'prast', 'pari', 'uchilishte', 'tsvete', 'plod', 'zarno', 'mazh', 'chas', 'tsarkva', 'kniga', 'svetlina', 'raka', 'karta', 'masa', 'svetat', 'zhena', 'muzika', 'nos', 'snyag', 'hartiya', 'chadur', 'palto', 'torta', 'kosa', 'pitsa', 'vrata', 'chasovnik', 'kamak', 'sol', 'stol', 'shapka', 'zemq', 'chasha', 'zemq', 'tigar', 'krepost', 'prozorets', 'veter']

    var verbsBgRom = ['buda', 'bivam', 'imam', 'obicham', 'pravya', 'kazvam', 'otivam', 'vizhdam', 'moga', 'iskam', 'nosya', 'znam', 'donesa', 'tryabva', 'pribiram', 'ima', 'govorya', 'trysya', 'vikam', 'minavam', 'podigam', 'hvastam', 'ostavyam', 'namiram', 'vlizam', 'zapazvam', 'haresvam', 'imam znachenie', 'igraya', 'poddurzhavam', 'poglezhdam', 'kachvam', 'se nuzhdaya', 'sluchvam', 'predlagam', 'iskam', 'pozvolqvam', 'postavyam', 'probvam', 'posledvam', 'chuvstvam', 'obsluzhvam', 'sluchvam se', 'zavarshvam', 'opitvam se', 'rezultat', 'buryam']

    var subjectsBgRom = ["az","ti","toj","te","nie","tq","koy","te","meni","toj","nyakoy","tq","nie","nyakakvo","nishcho","vsyako neshto","samiiat toj","vsichko","nyakoy","tezi sami","vsichki","samata tq","vsyaka edna","az samiiat si","vseki"]


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

    return ["basic", sentenceStructure, initialWordsBg];;

  }
}

export default basicList;
