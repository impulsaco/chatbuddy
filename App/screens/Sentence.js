import React, { useState, useEffect, useContext } from "react";
import { Switch } from "@rneui/themed";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import SentenceWord from "../components/SentenceWord";
import SayItButton from "../components/SayItButton";
import AnalyzeWord from "../components/AnalyzeWord";
import Refresh from "../../assets/Refresh.svg";
import sentenceSpeak from "../lib/sentenceSpeak";
import Sound from "../../assets/Sound.svg";
import SentenceTest from "../lib/SentenceTest";
import SentenceFixer from "../lib/SentenceFixer";
import SayModal from "@app/features/saymodal/components/SayModal";
import TranslationOn from "../../assets/translationOn.svg";
import TranslationOff from "../../assets/translationOff.svg";
import { SessionContext } from "../lib/SessionContext";
import { supabase } from "../lib/supabase";

import { logger } from "@app/utils/logger";

const PAGE_HEIGHT = Dimensions.get("window").height;
const PAGE_WIDTH = Dimensions.get("window").width;

const Sentence = ({
  navigation,
  sentenceInit,
  words,
  setWords,
  forward,
  setForward,
  translations,
  setTranslations,
  lang,
  langCode,
  sentence,
  setSentence,
  sentenceType,
  sentenceEn,
  setSentenceEn,
  sayVisible,
  setSayVisible,
  sentenceWhisper,
  setSentenceWhisper,
  sentenceSaidPercentage,
  setSentenceSaidPercentage,
  text,
  setText,
  sentenceText,
  setSentenceText,
  sentenceRomanized,
  setSentenceRomanized,
  sentenceReady,
  setSentenceReady,
  sentenceAnalyzed,
  setSentenceAnalyzed,
  setSentenceFixed,
  setSavedSentence,
}) => {
  // Set instructions and sentence placeholder

  let starterText = "Pick words to build your sentence";

  // Retrieve session

  const { session, setSession } = useContext(SessionContext);

  const gestureRootViewStyle = { flex: 1 };

  // Clear top sentence if re-entering sentence screen (e.g. when choosing new language)

  useEffect(() => {
    if (sentenceReady === false) {
      setSentenceText(" ");
      setSentenceAnalyzed([]);
      setSentenceEn(" ");
      setSentenceRomanized(null);
      setSentenceFixed(false);
      setForward(sentenceInit[0].type);
    }
  }, [sentenceReady]);

  // Reset sentence structure if changed

  //useEffect(() => {

  // Sentence Test (to see if all necessary boxes are filled)

  useEffect(() => {
    SentenceTest(sentence, setSentenceReady);
  }, [sentence]);

  useEffect(() => {
    logger.debug("sentenceReady is NOW ", sentenceReady);
  }, [sentenceReady]);

  // Sentence GPT fix (build with chosen words)

  // Prevent sentenceFix from running on initial load
  const sentenceFix = sentence => {
    logger.debug("sentenceReady FIXER is ", sentenceReady);
    if (sentenceReady === true && sentence !== sentenceInit) {
      SentenceFixer(
        sentence,
        setSentenceFixed,
        sentenceText,
        setSentenceText,
        setSavedSentence,
        setSentenceEn,
        lang,
        langCode,
        setSentenceAnalyzed,
        sentenceType,
        sentenceRomanized,
        setSentenceRomanized,
        session,
        sayVisible,
        setSayVisible,
        setText,
        setForward
      );
    }
  };

  useEffect(() => {
    if (sentence[0].id >= 0) {
      sentenceFix(sentence);
    }
  }, [sentenceReady, sentence]); //solution to loading, add sentence to tracking?

  // Translate sentence

  const sentenceTranslation = () => {
    if (translations === true && sentenceEn !== " ") {
      return (
        <View style={styles.translationContainer}>
          <TouchableOpacity
            style={styles.switchContainer}
            onPress={() => toggleTranslations()}
          >
            {translationButton()}
          </TouchableOpacity>
          <Text style={styles.translationText}>{sentenceEn}</Text>
        </View>
      );
    }
    if (translations === false && sentenceEn !== " ") {
      return (
        <View style={styles.translationContainer}>
          <TouchableOpacity
            style={styles.switchContainer}
            onPress={() => toggleTranslations()}
          >
            {translationButton()}
          </TouchableOpacity>
          <Text style={styles.translationText}> </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  // Sentence romanization

  const sentenceRomanization = () => {
    logger.debug("sentenceRomanized is ", sentenceRomanized);
    if (sentenceRomanized) {
      return <Text style={styles.romanizationText}>{sentenceRomanized}</Text>;
    } else {
      return <Text style={styles.romanizationText}> </Text>;
    }
  };

  // reset sentence

  const resetSentence = () => {
    setSentence(sentenceInit);
    setSentenceReady(false);
    setSentenceWhisper("no whisper yet");
    setText(starterText);
    setSentenceText(" ");
    setSentenceEn(" ");
    setSentenceRomanized(null);
    setSentenceFixed(false);
    setForward(sentenceInit[0].type);
  };

  useEffect(() => {
    logger.debug("sentenceWhisper in Sentence is ", sentenceWhisper);
    logger.debug("sentenceAnalyzed in Sentence is ", sentenceAnalyzed);
    let interimCount = 0;

    // Convert sentenceWhisper to lowercase and remove punctuation
    const cleanedSentenceWhisper = sentenceWhisper
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .replace(/\.$/, "");

    for (let i = 0; i < sentenceAnalyzed.length; i++) {
      let interimState = [...sentenceAnalyzed];
      logger.debug("sentenceAnalyzed[i].word is ", sentenceAnalyzed[i].word);

      // Convert sentenceAnalyzed[i].word to lowercase and remove punctuation
      const cleanedWord = sentenceAnalyzed[i].word
        .toLowerCase()
        .replace(/[.,!?]/g, "")
        .replace(/\.$/, "");

      if (cleanedSentenceWhisper.includes(cleanedWord)) {
        logger.debug("includes!");
        interimState[i].said = true;
        setSentenceAnalyzed(interimState);
        interimCount++;
      }
    }
    setSentenceSaidPercentage(interimCount / sentenceAnalyzed.length);
  }, [sentenceWhisper]);

  // set Text based on whispered

  const analyzeSentence = () => {
    return (
      <View style={styles.sentenceAnalyzed}>
        <View style={styles.wordsContainer}>
          {sentenceAnalyzed.map((word, id) => (
            <AnalyzeWord key={id} word={word} />
          ))}
        </View>
      </View>
    );
  };

  // EDIT THIS IF YOU WANT WORD TO STAY GREEN WHEN CLOSE MODAL
  useEffect(() => {
    analyzeSentence();
  }, [sentenceAnalyzed, sayVisible]);

  const setWhispered = () => {
    if (sentenceWhisper == "no whisper yet") {
      return <Text style={styles.sentenceText}>{sentenceText}</Text>;
    } else {
      return analyzeSentence();
    }
  };

  const sentenceLine = () => {
    return (
      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
          height: 20,
          width: 271,
        }}
      />
    );
  };

  const speakSentence = () => {
    if (sentenceText !== " ") {
      return (
        <View style={styles.soundButton}>
          <TouchableOpacity
            onPress={() => sentenceSpeak(sentenceText, langCode)}
          >
            <Sound />
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  };

  const toggleTranslations = () => {
    if (translations === true) {
      setTranslations(false);
    } else {
      setTranslations(true);
    }
  };

  const translationButton = () => {
    if (translations === true) {
      return <TranslationOn />;
    } else if (translations === false) {
      return <TranslationOff />;
    }
  };

  const topSentence = () => {
    if (sentenceReady === true) {
      return (
        <View style={styles.sentenceContainer}>
          <View style={styles.topSentence}>
            {speakSentence()}
            {setWhispered()}
          </View>
          <View style={styles.romanizationContainer}>
            {sentenceRomanization()}
          </View>
          {sentenceTranslation()}
        </View>
      );
    } else {
      return (
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
      );
    }
  };

  /*
        <View style={styles.bottomContainer}>                                                
            <View style={styles.refreshContainer}>
                <TouchableOpacity onPress={() => resetSentence()}>
                    <Refresh/>
                </TouchableOpacity>    
            </View>                             
        </View>                            
    */

  return <View style={styles.container}>{topSentence()}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: PAGE_HEIGHT * 0.3,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    distributeContent: "evenly",
    paddingTop: PAGE_HEIGHT * 0.01,
    paddingBottom: PAGE_HEIGHT * 0.02,
    width: PAGE_WIDTH * 0.6,
  },
  buttonContainer: {
    //flex: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 0,
  },
  switchContainer: {
    //flex: 0.1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: PAGE_WIDTH * 0.04,
  },
  topSentence: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 0,
    paddingTop: PAGE_HEIGHT * 0.05,
    width: PAGE_WIDTH * 0.9,
  },

  soundButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  refreshContainer: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingRight: 10,
  },
  sentenceContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 0,
    paddingLeft: PAGE_WIDTH * 0.05,
    paddingTop: 0,
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: PAGE_WIDTH * 0.8,
    paddingBottom: PAGE_HEIGHT * 0.03,
  },
  text: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  sentenceText: {
    fontSize: 36,
    color: "white",
    textAlign: "left",
    width: PAGE_WIDTH * 0.8,
  },
  translationContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 0,
    paddingTop: 0,
    width: PAGE_WIDTH * 0.9,
  },
  translationText: {
    fontSize: 20,
    marginTop: 5,
    color: "#B7B7B7",
    marginBottom: 10,
    width: PAGE_WIDTH * 0.77,
  },
  romanizationContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 0,
    paddingTop: 0,
    width: PAGE_WIDTH * 0.9,
  },
  romanizationText: {
    fontSize: 20,
    marginTop: 0,
    color: "white",
    fontStyle: "italic",
    marginBottom: 5,
    paddingLeft: PAGE_WIDTH * 0.12,
  },
  item: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "33%",
  },
  draggable: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
  },
  dragging: {
    opacity: 0.1,
  },
  sentenceAnalyzed: {
    flexDirection: "row",
    width: PAGE_WIDTH * 0.8,
  },
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Sentence;
