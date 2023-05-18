import React, { useState } from "react";

// create words dataset

const hometownList = lang => {
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

  var subjectsEng = ["I", "You", "We", "They", "He", "She"];

  var verbsEng = ["Am from", "Grew up in", "Live in", "Lived in"];

  var nounsEng = ["America", "China", "Chile", "Bulgaria", "Korea"];

  if (lang === "es-MX") {
    // Spanish set

    var subjectsEs = ["Yo", "Tú", "Nosotros", "Ellos", "Él", "Ella"];

    var verbsEs = ["Soy de", "Crecí en", "Vivo en", "Viví en"];

    var nounsEs = ["Estados Unidos", "China", "Chile", "Bulgaria", "Corea"];

    return [
      "hometown",
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

  if (lang === "ko") {
    // Korean set

    var subjectsKo = ["나", "너", "우리", "그들", "그", "그녀"];

    var verbsKo = ["출신", "자랐어요", "살고 있어요", "살았어요"];

    var nounsKo = ["미국", "중국", "칠레", "불가리아", "한국"];

    // Romanized set

    var subjectsKoRom = ["na", "neo", "uri", "geudeul", "geu", "geunyeo"];

    var verbsKoRom = ["chulsin", "jarasseoyo", "salgo isseoyo", "salasseoyo"];

    var nounsKoRom = ["Miguk", "Jungguk", "Chille", "Bulgaria", "Hanguk"];

    return [
      "hometown",
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

    var subjectsBg = ["Аз", "Ти", "Ние", "Те", "Той", "Тя"];

    var verbsBg = ["Съм от", "Отгледан съм в", "Живея в", "Живях в"];

    var nounsBg = ["Америка", "Китай", "Чили", "България", "Корея"];

    // Romanized

    var subjectsBgRom = ["Az", "Ti", "Nie", "Te", "Toy", "Tya"];

    var verbsBgRom = ["Sum ot", "Otgledan sum v", "Jiveya v", "Jivyah v"];

    var nounsBgRom = ["Amerika", "Kitai", "Chili", "Bulgaria", "Koreya"];

    return [
      "hometown",
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
    var subjectsDe = ["Ich", "Du", "Wir", "Sie", "Er", "Sie"];
    var verbsDe = [
      "Komme aus",
      "Bin aufgewachsen in",
      "Lebe in",
      "Habe gelebt in",
    ];
    var nounsDe = ["Amerika", "China", "Chile", "Bulgarien", "Korea"];

    return [
      "hometown",
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
    var subjectsJa = ["私", "あなた", "私たち", "彼ら", "彼", "彼女"];
    var verbsJa = ["出身です", "育ちました", "住んでいます", "住んでいました"];
    var nounsJa = ["アメリカ", "中国", "チリ", "ブルガリア", "韓国"];

    // Romanized Japanese
    var subjectsJaRom = [
      "Watashi",
      "Anata",
      "Watashitachi",
      "Karera",
      "Kare",
      "Kanojo",
    ];
    var verbsJaRom = [
      "Shusshin desu",
      "Sodachimashita",
      "Sunde imasu",
      "Sunde imashita",
    ];
    var nounsJaRom = ["Amerika", "Chūgoku", "Chiri", "Burugaria", "Kankoku"];

    return [
      "hometown",
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
    var subjectsBn = ["আমি", "তুমি", "আমরা", "তারা", "সে", "সে"];
    var verbsBn = ["আমি আসছি", "আমি বড় হয়েছি", "আমি থাকি", "আমি থাকেছিলাম"];
    var nounsBn = ["আমেরিকা", "চীন", "চিলি", "বুলগেরিয়া", "কোরিয়া"];

    return [
      "hometown",
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

  if (lang === "sq") {
    // Albanian set
    var subjectsSq = ["Unë", "Ti", "Ne", "Ata", "Ai", "Ajo"];
    var verbsSq = ["Jam nga", "U rrita në", "Jetoj në", "Kam jetuar në"];
    var nounsSq = ["Amerikë", "Kinë", "Kili", "Bullgari", "Kore"];

    return [
      "hometown",
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

    var verbsFr = [
      "Suis originaire de",
      "Ai grandi à",
      "Habite à",
      "Habitais à",
    ];

    var nounsFr = ["États-Unis", "Chine", "Chili", "Bulgarie", "Corée"];

    return [
      "hometown",
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

    var verbsIt = ["Sono di", "Sono cresciuto/a in", "Vivo a", "Ho vissuto a"];

    var nounsIt = ["Stati Uniti", "Cina", "Cile", "Bulgaria", "Corea"];

    return [
      "hometown",
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

export default hometownList;
