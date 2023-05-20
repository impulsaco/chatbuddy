import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext} from "react";
import "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@rneui/themed";
import { supabase } from "@app/lib/supabase";
import freeformList from "@app/data/wordsets/freeformList";
import introductionList from "@app/data/wordsets/introductionList";
import hobbiesList from "@app/data/wordsets/hobbiesList";
import basicList from "@app/data/wordsets/basicList";
import familyList from "@app/data/wordsets/familyList";
import hometownList from "@app/data/wordsets/hometownList";
import feelingsList from "@app/data/wordsets/feelingsList";
import exclamationsList from "@app/data/wordsets/exclamationsList";
import { border } from "native-base/lib/typescript/theme/styled-system";
import placesList from "@app/data/wordsets/placesList";
import { UserContext } from "@app/lib/UserContext";

const PAGE_HEIGHT = Dimensions.get("window").height;
const PAGE_WIDTH = Dimensions.get("window").width;

function PhraseSelector({ navigation, setMenuVisible, route }) {
  // Set up word lists

  // create state with words

  console.log("setMenuVisible in <PhraseSelector> is", setMenuVisible);

  /* const [lang, setLang] = useState(route.params.lang)
    const [langCode, setLangCode] = useState(route.params.langCode)

    useEffect(() => {
        setLang(route.params.lang)
        setLangCode(route.params.langCode)
    }, [route.params]) */

  // Set up state for topic tracking

  const { tutorial, setTutorial, sentences, setSentences } = useContext(UserContext);

  const [topicsProgress, setTopicsProgress] = useState({
    "One word basics 🚀": false,
    "Where you're from 🌍": false,
    "Jobs & studies 💼": false,
    "Feelings 😃": false,
    "Family 🏡": false,
    "Hobbies 🎨": false,
    "Places📍": false,
  });

  const getNextTopic = () => {
    for (const topic in topicsProgress) {
      if (!topicsProgress[topic]) {
        return topic;
      }
    }
    return null;
  };
  

  const nextTopic = getNextTopic();

  useEffect(() => {
    fetchCompletedTopics();
  }, [sentences]); // fetchCompletedTopics is called every time 'sentences' change

  // This object holds the topic - database type mapping
  const topicTypeMap = {
    "One word basics 🚀": "exclamations",
    "Where you're from 🌍": "hometown",
    "Jobs & studies 💼": "jobs_studies",
    "Feelings 😃": "feelings",
    "Family 🏡": "family",
    "Hobbies 🎨": "hobbies",
    "Places📍": "places",
  };

  const fetchCompletedTopics = () => {
    let newTopicsProgress = { ...topicsProgress };
  
    // Go through all sentences
    for (let sentence of sentences) {
      // Get the corresponding topic for the sentence's type
      for (const topic in topicTypeMap) {
        if (topicTypeMap[topic] === sentence.type) {
          newTopicsProgress[topic] = true;
          break;
        }
      }
    }
  
    // Update the topicsProgress state
    setTopicsProgress(newTopicsProgress);
  };

  // Set up styles

  // Define a triangle component

  function Triangle({ direction }) {
    const base = { width: 0, height: 0, borderStyle: 'solid' };
    const styles = {
      left: { ...base, borderTopWidth: 10, borderBottomWidth: 10, borderRightWidth: 20, borderLeftColor: 'transparent', borderTopColor: 'transparent', borderBottomColor: 'transparent', borderRightColor: 'green' },
      right: { ...base, borderTopWidth: 10, borderBottomWidth: 10, borderLeftWidth: 20, borderRightColor: 'transparent', borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: 'green' }
    };

    return <View style={styles[direction]} />;
  }

  const renderButtons = () => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>What do you want to learn?</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.phrasebookContainer}>
            <TouchableOpacity
              style={styles.phrasebookButton}
              onPress={() => {
                navigation.navigate("PhraseBuilderPanel", {
                  wordSet: exclamationsList,
                });
                setMenuVisible(true);
              }}
            >
              <Text style={styles.buttonText}>One word basics 🚀</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.phrasebookContainer}>
            <TouchableOpacity
              style={styles.phrasebookButton}
              onPress={() => {
                navigation.navigate("PhraseBuilderPanel", {
                  wordSet: hometownList,
                });
                setMenuVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Where you're from 🌍</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.phrasebookContainer}>
            <TouchableOpacity
              style={styles.phrasebookButton}
              onPress={() => {
                navigation.navigate("PhraseBuilderPanel", {
                  wordSet: introductionList,
                });
                setMenuVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Jobs & studies 💼</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.phrasebookContainer}>
            <TouchableOpacity
              style={styles.phrasebookButton}
              onPress={() => {
                navigation.navigate("PhraseBuilderPanel", {
                  wordSet: feelingsList,
                });
                setMenuVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Feelings 😃</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.phrasebookContainer}>
            <TouchableOpacity
              style={styles.phrasebookButton}
              onPress={() => {
                navigation.navigate("PhraseBuilderPanel", {
                  wordSet: familyList,
                });
                setMenuVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Family 🏡</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.phrasebookContainer}>
            <TouchableOpacity
              style={styles.phrasebookButton}
              onPress={() => {
                navigation.navigate("PhraseBuilderPanel", {
                  wordSet: hobbiesList,
                });
                setMenuVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Hobbies 🎨</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.phrasebookContainer}>
            <TouchableOpacity
              style={styles.phrasebookButton}
              onPress={() => {
                navigation.navigate("PhraseBuilderPanel", {
                  wordSet: placesList,
                });
                setMenuVisible(true);
              }}
            >
              <Text style={styles.buttonText}>Places📍</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <LinearGradient
        colors={["#319CFF", "#319CFF"]}
        locations={[0, 0.99]}
        style={styles.linearGradient}
      />
      <View style={styles.bottomContainer}>{renderButtons()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    paddingTop: PAGE_HEIGHT / 10,
  },
  linearGradient: {
    position: "absolute",
    height: PAGE_HEIGHT * 1.5,
    left: 0,
    right: 0,
    top: 0,
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: PAGE_HEIGHT / 5,
  },
  bottomContainer: {
    display: "flex",
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT * 0.8,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: PAGE_WIDTH * 0.8,
  },
  mainText: {
    fontSize: 42,
    color: "white",
    textAlign: "center",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "black",
  },
  phrasebookContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  phrasebookButton: {
    display: "flex",
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    width: PAGE_WIDTH * 0.45,
    height: PAGE_HEIGHT * 0.05,
    margin: 10,
  },
  logOutContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
  },
});

export default PhraseSelector;
