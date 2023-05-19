import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { DraxProvider, DraxScrollView } from "react-native-drax";
import DraggableWord from "../components/DraggableWord";
import AddWord from "../components/AddWord";
import ShuffleWords from "../components/ShuffleWords";
import { UserContext } from "./UserContext";
import Refresh from "@app/assets/Refresh.svg";
import TranslationOn from "@app/assets/translationOn.svg";
import TranslationOff from "@app/assets/translationOff.svg";
import { useFocusEffect } from '@react-navigation/native';

const PAGE_HEIGHT = Dimensions.get("window").height;
const PAGE_WIDTH = Dimensions.get("window").width;

/// JUST MAKE ONE, THEN MAP ONTO TAB NAVIGATOR

const WordRoute = ({route}) => {
  const {
    routes,
    setUserWords,
    userWords,
    words,
    translations,
    sentence,
    setSentence,
    setForward,
    resetSentence,
    toggleTranslations,
    setActiveIndex,
    key
  } = route.params;

  const type = route.params.route

  const { langCode, setLangCode, lang, setLang } =
    React.useContext(UserContext);

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
  
  // set index for tab navigator
  useFocusEffect(
    React.useCallback(() => {
      // Update the active index when this screen comes into focus.
      // You may need to modify this line if `type` isn't the same as the route name.
      const newIndex = routes.findIndex(route => route === type);
      if (newIndex !== -1) {
        setActiveIndex(newIndex);
      }
    }, [])
  );

  /* Shuffle button for the future

  <ShuffleWords
          type={type}
          setUserWords={setUserWords}
          userWords={userWords}
          langCode={langCode}
        />

  */

  return (
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
