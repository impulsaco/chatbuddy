import React, { useState } from "react";

// create words dataset

const hobbiesList = lang => {
  var idCounter = 0;

  // Sentence structure: subject + verb + adjective + noun

  const sentenceStructure = [
    {
      id: -1,
      type: "subject",
      word: "SUBJECT",
    },
    {
      id: -2,
      type: "verb",
      word: "VERB",
    },
    {
      id: -3,
      type: "noun",
      word: "NOUN",
    },
  ];

  // Consolidate word sets

  function consolidateWordSets(
    nouns,
    subjects,
    verbs,
    nounsTranslations,
    subjectsTranslations,
    verbsTranslations,
    nounsRomanized,
    subjectsRomanized,
    verbsRomanized
  ) {
    const words = [];

    for (let i = 0; i < nouns.length; i++) {
      words.push({
        id: idCounter++,
        word: nouns[i],
        type: "noun",
        translation: nounsTranslations[i],
        romanized: nounsRomanized && nounsRomanized[i],
      });
    }

    for (let i = 0; i < verbs.length; i++) {
      words.push({
        id: idCounter++,
        word: verbs[i],
        type: "verb",
        translation: verbsTranslations[i],
        romanized: verbsRomanized && verbsRomanized[i],
      });
    }

    for (let i = 0; i < subjects.length; i++) {
      words.push({
        id: idCounter++,
        word: subjects[i],
        type: "subject",
        translation: subjectsTranslations[i],
        romanized: subjectsRomanized && subjectsRomanized[i],
      });
    }

    return words;
  }

  // English set

  var nounsEng = [
    "Guitar",
    "Tennis",
    "Painting",
    "Writing",
    "Baking",
    "Cooking",
    "Fishing",
    "Camping",
    "Skiing",
    "Yoga",
    "Jogging",
    "Books",
    "Chess",
    "Hiking",
    "Cycling",
    "Badminton",
    "Volleyball",
    "Dancing",
    "Singing",
  ];

  var subjectsEng = ["I", "You", "We", "They", "He", "She"];

  var verbsEng = ["Play", "Like", "Do", "Read", "Go for"];

  // Spanish set

  if (lang === "es-MX") {
    var nounsEs = [
      "Guitarra",
      "Tenis",
      "Pintura",
      "Escritura",
      "Horneado",
      "Cocinar",
      "Pescar",
      "Acampar",
      "Esquí",
      "Yoga",
      "Correr",
      "Libros",
      "Ajedrez",
      "Senderismo",
      "Ciclismo",
      "Badminton",
      "Voleibol",
      "Bailar",
      "Cantar",
    ];

    var verbsEs = ["Jugar", "Gustar", "Hacer", "Leer", "Ir por"];

    var subjectsEs = ["Yo", "Tú", "Nosotros", "Ellos", "Él", "Ella"];

    return [
      "hobbies",
      sentenceStructure,
      consolidateWordSets(
        nounsEs,
        subjectsEs,
        verbsEs,
        nounsEng,
        subjectsEng,
        verbsEng
      ),
    ];
  }

  // Korean set

  if (lang === "ko") {
    var nounsKo = [
      "기타",
      "테니스",
      "회화",
      "글쓰기",
      "바이킹",
      "요리",
      "낚시",
      "캠핑",
      "스키",
      "요가",
      "조깅",
      "책",
      "체스",
      "하이킹",
      "사이클링",
      "배드민턴",
      "배구",
      "춤추기",
      "노래하기",
    ];

    var verbsKo = ["놀이", "좋아하다", "하다", "읽다", "가다"];

    var subjectsKo = ["나", "너", "우리", "그들", "그", "그녀"];

    // Romanized Korean

    var nounsKoRom = [
      "gita",
      "teniseu",
      "hoehwa",
      "geulsseugi",
      "baiking",
      "yori",
      "naksi",
      "kaemping",
      "seuki",
      "yoga",
      "joging",
      "chaek",
      "cheseu",
      "hai king",
      "saikelring",
      "baedeumin teon",
      "baegu",
      "chumchugi",
      "noraehagi",
    ];

    var verbsKoRom = ["nori", "johahada", "hada", "ikda", "gada"];

    var subjectsKoRom = ["na", "neo", "uri", "geudeul", "geu", "geunyeo"];

    return [
      "hobbies",
      sentenceStructure,
      consolidateWordSets(
        nounsKo,
        subjectsKo,
        verbsKo,
        nounsEng,
        subjectsEng,
        verbsEng,
        nounsKoRom,
        subjectsKoRom,
        verbsKoRom
      ),
    ];
  }

  if (lang === "bg") {
    // Bulgarian set

    var nounsBg = [
      "Китара",
      "Тенис",
      "Живопис",
      "Писане",
      "Печене",
      "Готвене",
      "Риболов",
      "Къмпинг",
      "Ски",
      "Йога",
      "Бягане",
      "Книги",
      "Шах",
      "Планински преход",
      "Колоездене",
      "Бадминтон",
      "Волейбол",
      "Танци",
      "Пеене",
    ];

    var subjectsBg = ["Аз", "Ти", "Ние", "Те", "Той", "Тя"];

    var verbsBg = ["Свиря", "Харесвам", "Упражнявам", "Чета", "Ходя на"];

    // Romanized Bulgarian

    var nounsBgRom = [
      "Kitara",
      "Tenis",
      "Zhivopis",
      "Pisane",
      "Pechene",
      "Gotvene",
      "Ribolov",
      "Kamping",
      "Ski",
      "Yoga",
      "Byagane",
      "Knigi",
      "Shah",
      "Planinski prehod",
      "Koloezdene",
      "Badminton",
      "Voleybol",
      "Tantsi",
      "Peene",
    ];

    var subjectsBgRom = ["Az", "Ti", "Nie", "Te", "Toi", "Tya"];

    var verbsBgRom = [
      "Sviriya",
      "Haresvam",
      "Uprazhnyavam",
      "Cheta",
      "Hodya na",
    ];

    return [
      "hobbies",
      sentenceStructure,
      consolidateWordSets(
        nounsBg,
        subjectsBg,
        verbsBg,
        nounsEng,
        subjectsEng,
        verbsEng,
        nounsBgRom,
        subjectsBgRom,
        verbsBgRom
      ),
    ];
  }

  if (lang === "de") {
    // German set
    var nounsDe = [
      "Gitarre",
      "Tennis",
      "Malerei",
      "Schreiben",
      "Backen",
      "Kochen",
      "Angeln",
      "Camping",
      "Skifahren",
      "Yoga",
      "Joggen",
      "Bücher",
      "Schach",
      "Wandern",
      "Radfahren",
      "Badminton",
      "Volleyball",
      "Tanzen",
      "Singen",
    ];
    var subjectsDe = ["Ich", "Du", "Wir", "Sie", "Er", "Sie"];
    var verbsDe = ["Spielen", "Mögen", "Tun", "Lesen", "Gehen für"];

    return [
      "hobbies",
      sentenceStructure,
      consolidateWordSets(
        nounsDe,
        subjectsDe,
        verbsDe,
        nounsEng,
        subjectsEng,
        verbsEng
      ),
    ];
  }

  if (lang === "ja") {
    // Japanese set
    var nounsJa = [
      "ギター",
      "テニス",
      "絵画",
      "書き物",
      "ベーキング",
      "料理",
      "釣り",
      "キャンプ",
      "スキー",
      "ヨガ",
      "ジョギング",
      "本",
      "チェス",
      "ハイキング",
      "サイクリング",
      "バドミントン",
      "バレーボール",
      "ダンス",
      "歌",
    ];
    var subjectsJa = ["私", "あなた", "私たち", "彼ら", "彼", "彼女"];
    var verbsJa = ["プレイ", "好き", "する", "読む", "行く"];

    // Romanized Japanese
    var nounsJaRom = [
      "Gitā",
      "Tenisu",
      "Kaiga",
      "Kakimono",
      "Bēkingu",
      "Ryōri",
      "Tsurī",
      "Kyanpu",
      "Sukī",
      "Yoga",
      "Jogingu",
      "Hon",
      "Chesu",
      "Haikingu",
      "Saikuringu",
      "Badominton",
      "Barēbōru",
      "Dansu",
      "Uta",
    ];
    var subjectsJaRom = [
      "Watashi",
      "Anata",
      "Watashitachi",
      "Karera",
      "Kare",
      "Kanojo",
    ];
    var verbsJaRom = ["Purei", "Suki", "Suru", "Yomu", "Iku"];

    return [
      "hobbies",
      sentenceStructure,
      consolidateWordSets(
        nounsJa,
        subjectsJa,
        verbsJa,
        nounsEng,
        subjectsEng,
        verbsEng,
        nounsJaRom,
        subjectsJaRom,
        verbsJaRom
      ),
    ];
  }

  if (lang === "bn") {
    // Bengali set
    var nounsBn = [
      "গিটার",
      "টেনিস",
      "চিত্রকর্ম",
      "লেখা",
      "পাকনা",
      "রান্না",
      "মাছ ধরা",
      "ক্যাম্পিং",
      "স্কিইং",
      "যোগা",
      "দৌড়ানো",
      "বই",
      "দাবা",
      "হাইকিং",
      "সাইকেলিং",
      "ব্যাডমিন্টন",
      "ভলিবল",
      "নাচ",
      "গান",
    ];
    var subjectsBn = ["আমি", "তুমি", "আমরা", "তারা", "সে", "সে"];
    var verbsBn = ["খেলা", "পছন্দ", "করা", "পড়া", "যাওয়া"];

    return [
      "hobbies",
      sentenceStructure,
      consolidateWordSets(
        nounsBn,
        subjectsBn,
        verbsBn,
        nounsEng,
        subjectsEng,
        verbsEng
      ),
    ];
  }

  // Albanian set
  if (lang === "sq") {
    var nounsSq = [
      "Kitarë",
      "Tenis",
      "Pikturë",
      "Shkrim",
      "Përgatitje brumash",
      "Gatim",
      "Peshkim",
      "Kampim",
      "Ski",
      "Jogë",
      "Vrapim",
      "Libra",
      "Shah",
      "Ecje",
      "Bicikletë",
      "Badminton",
      "Volejboll",
      "Vallëzim",
      "Këndim",
    ];
    var subjectsSq = ["Unë", "Ti", "Ne", "Ata", "Ai", "Ajo"];
    var verbsSq = ["Luaj", "Pëlqej", "Bëj", "Lexoj", "Shkoj për"];

    return [
      "hobbies",
      sentenceStructure,
      consolidateWordSets(
        nounsSq,
        subjectsSq,
        verbsSq,
        nounsEng,
        subjectsEng,
        verbsEng
      ),
    ];
  }

  // French set
  if (lang === "fr-FR") {
    var subjectsFr = ["Je", "Tu", "Nous", "Ils", "Il", "Elle"];

    var verbsFr = ["Joue", "Aime", "Fais", "Lis", "Vais faire"];

    var nounsFr = [
      "Guitare",
      "Tennis",
      "Peinture",
      "Écriture",
      "Cuisine",
      "Cuisson",
      "Pêche",
      "Camping",
      "Ski",
      "Yoga",
      "Jogging",
      "Livres",
      "Échecs",
      "Randonnée",
      "Cyclisme",
      "Badminton",
      "Volleyball",
      "Danse",
      "Chant",
    ];

    return [
      "hobbies",
      sentenceStructure,
      consolidateWordSets(
        nounsFr,
        subjectsFr,
        verbsFr,
        nounsEng,
        subjectsEng,
        verbsEng
      ),
    ];
  }

  // Italian set
  if (lang === "it") {
    var subjectsIt = ["Io", "Tu", "Noi", "Loro", "Lui", "Lei"];

    var verbsIt = ["Gioco", "Mi piace", "Faccio", "Leggo", "Vado a fare"];

    var nounsIt = [
      "Chitarra",
      "Tennis",
      "Pittura",
      "Scrittura",
      "Cottura",
      "Cucina",
      "Pesca",
      "Campeggio",
      "Sci",
      "Yoga",
      "Jogging",
      "Libri",
      "Scacchi",
      "Escursionismo",
      "Ciclismo",
      "Badminton",
      "Pallavolo",
      "Danza",
      "Canto",
    ];

    return [
      "hobbies",
      sentenceStructure,
      consolidateWordSets(
        nounsIt,
        subjectsIt,
        verbsIt,
        nounsEng,
        subjectsEng,
        verbsEng
      ),
    ];
  }
};

export default hobbiesList;
