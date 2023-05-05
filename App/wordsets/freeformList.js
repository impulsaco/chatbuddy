import React, { useState } from 'react';

// create words dataset

const freeformList = (lang) => {

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
        "type": "adjective",
        "word": "ADJECTIVE",
    },
    {
        "id": -4,
        "type": "noun",
        "word": "NOUN",
    }  
  ]

  function consolidateWordSets(nouns, subjects, verbs, adjectives, nounsTranslations, subjectsTranslations, verbsTranslations, adjectivesTranslations, nounsRomanized, subjectsRomanized, verbsRomanized, adjectivesRomanized) {
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

    for (let i = 0; i < adjectives.length; i++) {
      words.push({ id: idCounter++, word: adjectives[i], type: "adjective", translation: adjectivesTranslations[i], romanized: adjectivesRomanized && adjectivesRomanized[i] });
    }

    return words;
  }

  // English set

  var nounsEng = ["person", "water", "air", "ring", "animal", "art", "flag", "boat", "kiss", "bed", "field", "sky", "ribbon", "food", "rope", "finger", "money", "school", "flower", "fruit", "grain", "man", "hour", "church", "book", "light", "hand", "map", "table", "world", "woman", "music", "nose", "snow", "paper", "umbrella", "parka", "cake", "hair", "pizza", "door", "clock", "rock", "salt", "chair", "hat", "floor", "cup", "earth", "tiger", "tower", "window", "wind"]

  var subjectsEng =   ["I","you","he","they","we","she","who","them","me","him","one","her","us","something","nothing","anything","himself","everything","someone","themselves","everyone","itself","anyone","myself"]

  var verbsEng = ['be', 'stay', 'have', 'love', 'make', 'say', 'go', 'see', 'be able to', 'want', 'carry', 'know', 'bring', 'owe', 'come', 'have', 'speak', 'look for', 'call', 'pass', 'raise', 'catch', 'leave', 'find', 'enter', 'save', 'like', 'matter', 'play', 'maintain', 'look', 'ride', 'need', 'happen', 'offer', 'ask', 'allow', 'put', 'try', 'follow', 'feel', 'serve', 'happen', 'finish', 'try', 'result']  

  var adjectivesEng = ["Chilean", "bad", "better", "better", "big", "black", "safe", "clear", "different", "early", "easy", "economic", "free", "full", "good", "big", "hard", "high", "human", "important", "international", "big", "late", "small", "local", "long", "low", "important", "military", "mine", "national", "new", "old", "only", "other", "political", "possible", "public", "real", "recent", "right", "small", "social", "special", "strong", "safe", "true", "white", "full", "young"]


  if (lang === 'es-MX') {

    // Spanish set

    var nounsEs = ['persona', 'agua', 'aire', 'anillo', 'animal', 'arte', 'bandera', 'barco', 'beso', 'cama', 'campo', 'cielo', 'cinta', 'comida', 'cuerda', 'dedo', 'dinero', 'escuela', 'flor', 'fruta', 'grano', 'hombre', 'hora', 'iglesia', 'libro', 'luz', 'mano', 'mapa', 'mesa', 'mundo', 'mujer', 'musica', 'nariz', 'nieve', 'papel', 'paraguas', 'parka', 'pastel', 'pelo', 'pizza', 'puerta', 'reloj', 'roca', 'sal', 'silla', 'sombrero', 'suelo', 'taza', 'tierra', 'tigre', 'torre', 'ventana', 'viento']

    var verbsEs = ['ser', 'estar', 'tener', 'amar', 'hacer', 'decir', 'ir', 'ver', 'poder', 'querer', 'llevar', 'saber', 'traer','deber', 'venir', 'haber', 'hablar', 'buscar', 'llamar', 'pasar', 'levantar', 'coger', 'dejar', 'encontrar', 'entrar', 'guardar', 'gustar', 'importar', 'jugar', 'mantener', 'mirar', 'montar', 'necesitar', 'ocurrir', 'ofrecer', 'pedir', 'permitir', 'poner', 'probar', 'seguir', 'sentir', 'servir', 'suceder', 'terminar', 'intentar', 'resultar']

    var subjectsEs = ["yo","tú","él","ellos","nosotros","ella","quién","ellos","mí","él","uno","ella","nosotros","algo","nada","cualquier cosa","él mismo","todo","alguien","ellos mismos","todos","si misma","cualquier persona","yo mismo"]

    var adjectivesEs = ["chileno", "malo","mejor","mejor","grande","negro","seguro","claro","diferente","temprano","fácil","económico","libre","completo","bueno","grande","duro","alto","humano","importante","internacional","grande","tarde","pequeño","local","largo","bajo","importante","militar","mío","nacional","nuevo","viejo","solo","otro","político","posible","público","real","reciente","derecho","pequeño","social","especial","fuerte","seguro","verdadero","blanco","completo","joven"]

    return ["freeform", sentenceStructure, consolidateWordSets(nounsEs, subjectsEs, verbsEs, adjectivesEs, nounsEng, subjectsEng, verbsEng, adjectivesEng)];

  }

  if (lang === 'ko') {

    // Korean set

    var nounsKo = ['사람', '물', '공기', '반지', '동물', '예술', '깃발', '배', '키스', '침대', '들판', '하늘', '리본', '음식', '줄', '손가락', '돈', '학교', '꽃', '과일', '곡물', '남자', '시간', '교회', '책', '빛', '손', '지도', '테이블', '세계', '여자', '음악', '코', '눈', '종이', '우산', '패딩조끼', '케이크', '머리', '피자', '문', '시계', '바위', '소금', '의자', '모자', '바닥', '컵', '지구', '호랑이', '탑', '창문', '바람']

    var verbsKo = ['있다', '되다', '가지다', '사랑하다', '하다', '말하다', '가다', '보다', '할 수 있다', '원하다', '가져가다', '알다', '가져오다','해야 하다', '오다', '있다', '말하다', '찾다', '부르다', '지나가다', '들어올리다', '잡다', '내려놓다', '발견하다', '들어가다', '보관하다', '좋아하다', '중요하다', '놀다', '유지하다', '바라보다', '올라타다', '필요하다', '발생하다', '제공하다', '요청하다', '허용하다', '싣다', '시험하다', '따라가다', '느끼다', '서비스하다', '발생하다', '끝내다', '시도하다', '결과나다']

    var subjectsKo = ["나","당신","그","그들","우리","그녀","누구","그들","나 자신","그","하나","그녀","우리","뭔가","아무것도","무엇이든지","그 자신","모든 것","누군가","그들 자신","모두","그 자신","누구든지","나 자신"]

    var adjectivesKo = ["칠레", "나쁨", "더 좋음", "더 좋음", "큼", "검정", "안전함", "분명함", "다름", "초기", "쉬움", "경제적", "자유롭게", "완벽함", "좋음", "큼", "단단함", "높이", "인간적", "중요함", "국제적", "큼", "늦게", "작음", "지역적", "길게", "낮음", "중요함", "군사적", "나의", "국가적", "새로움", "오래됨", "혼자", "다른", "정치적", "가능함", "공공의", "실제", "최근의", "권리", "작은", "사회적", "특별함", "강함", "안전함", "진실함", "흰색", "완벽함", "젊음"]

    // Romanized Korean: 

    var nounsKoRom = ['saram', 'mul', 'gonggi', 'banji', 'dongmul', 'yesul', 'gitbal', 'bae', 'kiseu', 'chimdae', 'deulpang', 'haneul', 'ribon', 'eumshik', 'jul', 'songarak', 'don', 'hakgyo', 'kkot', 'gwail', 'gokmul', 'namja', 'sigan', 'gyohoe', 'chaek', 'bit', 'son', 'jido', 'teibeul', 'segye', 'yeoja', 'eumak', 'ko', 'nun', 'jongi', 'usan', 'paedingjokki', 'keikeu', 'meori', 'pija', 'mun', 'sigye', 'baro', 'sogeum', 'uija', 'moja', 'badak', 'keop', 'jigu', 'horangi', 'tab', 'changmun', 'baram'];

    var verbsKoRom = ['itta', 'doeda', 'gajida', 'saranghada', 'hada', 'malhada', 'gada', 'boda', 'hal su itda', 'wonhada', 'gajyeogada', 'alda', 'gajyeo-oda', 'haeya hada', 'oda', 'itta', 'malhada', 'chatda', 'bureuda', 'jinagada', 'deureoolida', 'japda', 'naeryeonoda', 'balgyeonhada', 'deureogada', 'bogwanhada', 'joh-ahada', 'jungyohada', 'nolda', 'yuji-hada', 'baraboda', 'ollatada', 'piryohada', 'balsaenghada', 'jegonghada', 'yocheonghada', 'heohonghada', 'sitta', 'siheomhada', 'ttaragada', 'neukkidahada', 'seobiseuhada', 'balsaenghada', 'kkeutnaeda', 'sidohada', 'gyeolganada'];

    var subjectsKoRom = ["na","dangsin","geu","geudeul","uri","geunyeo","nugu","geudeul","na jasin","geu","hana","geunyeo","uri","mwonga","amugeotdo","mueosideunji","geu jasin","modeun geos","nugunga","geudeul jasin","modu","geu jasin","nugudeunji","na jasin"];

    var adjectivesKoRom = ["chillye", "nappeum", "deo joh-eum", "deo joh-eum", "keum", "geomjeong", "anjeonham", "bunmyeongham", "daleum", "chogi", "swium", "gyeongjejeog", "jayulobege", "wanbyeogham", "joh-eum", "keum", "dandanham", "nop-i", "inganjeog", "jung-yoham", "gugjejeog", "keum", "neujge", "jag-eum", "jyeogjeog", "gilge", "naj-eum", "jung-yoham", "gunsajeog", "naui", "guggajeog", "saeroum", "olaedon", "honja", "daleun", "jeongchijeog", "ganeungham", "gong-gong-ui", "silje", "choegeun-ui", "gwolli", "jag-eun", "sahoejeog", "teugbyeolham", "gangham", "anjeonham", "jinsilham", "heunsaeg", "wanbyeogham", "jeolmeum"];

    return ["freeform", sentenceStructure, consolidateWordSets(nounsKo, subjectsKo, verbsKo, adjectivesKo, nounsEng, subjectsEng, verbsEng, adjectivesKo, nounsKoRom, subjectsKoRom, verbsKoRom, adjectivesKoRom)];;
  }

  if (lang === 'bg') {

    // Bulgarian set

    var nounsBg = ["човек", "вода", "въздух", "пръстен", "животно", "изкуство", "знаме", "лодка", "целувка", "легло", "поле", "небе", "лента", "храна", "въже", "пръст", "пари", "училище", "цвете", "плод", "жито", "мъж", "час", "църква", "книга", "светлина", "ръка", "карта", "маса", "светът", "жена", "музика", "нос", "сняг", "хартия", "чадър", "парка", "торта", "коса", "пица", "врата", "часовник", "камък", "сол", "стол", "шапка", "под", "чаша", "земя", "тигър", "крепост", "прозорец", "ветер"]

    var subjectsBg = ["Аз", "ти", "той", "те", "ние", "тя", "кой", "тях", "мени", "него", "някой", "нея", "нас", "нещо", "нищо", "някакво", "себе си", "всичко", "някой", "сами", "всички", "само себе си", "никой", "себе си"]

    var verbsBg = ['бъда', 'остана', 'имам', 'обичам', 'правя', 'кажа', 'отида', 'виждам', 'мога', 'искам', 'неса', 'зная', 'донеса', 'дължа', 'дойда', 'имам', 'говоря', 'търся', 'нарека', 'минавам', 'вдигам', 'уловявам', 'напускам', 'намеря', 'влизам', 'спасявам', 'харесвам', 'знача', 'играя', 'поддържам', 'гледам', 'карам', 'трябва', 'случва се', 'предлагам', 'питам', 'позволявам', 'поставям', 'опитвам се', 'следвам', 'чувствам', 'обслужвам', 'случва се', 'завършвам', 'опитвам се', 'резултирам']

    var adjectivesBg = ["Чилийски", "лош", "по-добър", "по-добър", "голям", "черен", "безопасен", "ясен", "различен", "ранен", "лесен", "икономичен", "свободен", "пълен", "добър", "голям", "твърд", "висок", "човешки", "важен", "международен", "голям", "късен", "малък", "местен", "дълъг", "нисък", "важен", "военен", "мой", "национален", "нов", "стар", "единствен", "друг", "политически", "възможен", "обществен", "реален", "скорошен", "прав", "малък", "социален", "специален", "силен", "безопасен", "истински", "бял", "пълен", "млад"]

    // Romanized Bulgarian

    var nounsBgRom = ["chovеk", "voda", "vazduh", "prasten", "zhivotno", "izkustvo", "zname", "lodka", "tseluvka", "leglo", "pole", "nebe", "lenta", "hrana", "vazhе", "prast", "pari", "uchilishte", "tsvete", "plod", "zhito", "mazh", "chas", "tsarkva", "kniga", "svetlina", "raka", "karta", "masa", "svetat", "zhena", "muzika", "nos", "snyag", "hаrtiya", "chadur", "parka", "torta", "kosa", "pitsa", "vrata", "chasovnik", "kamak", "sol", "stol", "shapka", "pod", "chasha", "zemya", "tigar", "krepоst", "prozorets", "veter"];

    var subjectsBgRom = ["Az", "ti", "toй", "te", "nie", "tя", "kой", "tyah", "meni", "nego", "nyakoi", "neya", "nas", "neshto", "nishcho", "nyakakvo", "sebe si", "vsichko", "nyakoi", "sami", "vsichki", "samo sebe si", "nikoi", "sebe si"];

    var verbsBgRom = ['bъda', 'ostana', 'imam', 'obicham', 'pravia', 'kazha', 'otida', 'vizhdam', 'moga', 'iskam', 'nesa', 'znaya', 'donesa', 'dylzha', 'doida', 'imam', 'govoria', 'trasya', 'nareka', 'minavam', 'vdigam', 'ulovyavam', 'napuskam', 'namerya', 'vlizam', 'spasyavam', 'haresvam', 'znacha', 'igraia', 'poddarzhama', 'gledam', 'karam', 'tryabva', 'sluchva se', 'predlagam', 'pitam', 'pozvoliavam', 'postaviаm', 'opitvam se', 'sledvam', 'chuvstvam', 'obsluzhvam', 'sluchva se', 'zavarshvam', 'opitvam se', 'rezultiram'];

    var adjectivesBgRom = ["Chiliyski", "losh", "po-dobar", "po-dobar", "golyam", "chernen", "bezopasen", "yassen", "razlichen", "ranen", "lesen", "ikonomichen", "svoboden", "palen", "dobar", "golyam", "tvard", "visok", "choveshki", "vazhen", "mezhdunaroden", "golyam", "kasen", "malyk", "mesten", "dylgy", "nisyk", "vazhen", "voenen", "moi", "natsionalen", "nov", "star", "edinstven", "drug", "politicheski", "vozmozhnen", "obshtestven", "realen", "skoroshen", "prav", "malyk", "sotsialen", "spetsialen", "silen", "bezopasen", "istinski", "byal", "palen", "mlad"];

    return ["freeform", sentenceStructure, consolidateWordSets(nounsBg, subjectsBg, verbsBg, adjectivesBg, nounsEng, subjectsEng, verbsEng, adjectivesBg, nounsBgRom, subjectsBgRom, verbsBgRom, adjectivesBgRom)];;

  }
}

export default freeformList;
