import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { DraxProvider, DraxScrollView } from "react-native-drax";
import DraggableWord from "../components/DraggableWord";
import AddWord from "../components/AddWord";
import ShuffleWords from "../components/ShuffleWords";
import { LanguageContext } from "../lib/LanguageContext";
import Refresh from "../../assets/Refresh.svg";
import TranslationOn from "../../assets/translationOn.svg";
import TranslationOff from "../../assets/translationOff.svg";

const PAGE_HEIGHT = Dimensions.get("window").height;
const PAGE_WIDTH = Dimensions.get("window").width;

/// JUST MAKE ONE, THEN MAP ONTO TAB NAVIGATOR

const WordRoute = (
  type,
  setUserWords,
  userWords,
  words,
  translations,
  sentence,
  setSentence,
  setForward,
  resetSentence,
  toggleTranslations,
  key
) => {
  const { langCode, setLangCode, lang, setLang } =
    React.useContext(LanguageContext);

  /*React.useEffect (() => {
    setLangCode(langCode)
    setLang(lang)
  }, [langCode, lang])*/

  const translationButton = () => {
    if (translations === true) {
      return <TranslationOn />;
    } else if (translations === false) {
      return <TranslationOff />;
    }
  };

  return () => (
    <View style={styles.wordContainer}>
      <View style={styles.dragLimit}>
        <DraxScrollView contentContainerStyle={styles.dragContainer}>
          <AddWord
            type={type}
            setUserWords={setUserWords}
            userWords={userWords}
            langCode={langCode}
            lang={lang}
          />
          {userWords.filter
            ? userWords
                .filter(obj => {
                  return obj.type === type;
                })
                .map((word, index) => (
                  <DraggableWord
                    key={word.id}
                    word={word}
                    translations={translations}
                    sentence={sentence}
                    setSentence={setSentence}
                    setForward={setForward}
                  />
                ))
            : null}
          {words
            .filter(obj => {
              return obj.type === type;
            })
            .map((word, index) => (
              <DraggableWord
                key={word.id}
                word={word}
                translations={translations}
                sentence={sentence}
                setSentence={setSentence}
                setForward={setForward}
              />
            ))}
        </DraxScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.switchContainer}
          onPress={() => toggleTranslations()}
        >
          {translationButton()}
        </TouchableOpacity>
        <ShuffleWords
          type={type}
          setUserWords={setUserWords}
          userWords={userWords}
          langCode={langCode}
        />
        <TouchableOpacity onPress={() => resetSentence()}>
          <Refresh />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wordContainer: {
    backgroundColor: "#143e66",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "column",

    height: PAGE_HEIGHT / 2.2,
    width: PAGE_WIDTH * 0.9,
    marginLeft: PAGE_WIDTH * 0.05,
    borderRadius: 10,
  },

  dragContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",

    paddingHorizontal: PAGE_WIDTH * 0.05, // limits render to 3 cards
    width: PAGE_WIDTH,
  },

  dragLimit: {
    height: PAGE_HEIGHT * 0.35,
    width: PAGE_WIDTH,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: PAGE_HEIGHT * 0.07,
    width: PAGE_WIDTH,
    padding: 10,
    marginBottom: PAGE_HEIGHT * 0.01,
  },
});

export default WordRoute;
