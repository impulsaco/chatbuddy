import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "@app/lib/supabase";
import { Switch } from "@rneui/themed";
import Header from "../components/Header";
import { DraxProvider, DraxScrollView } from "react-native-drax";
import SentenceCard from "../components/SentenceCard";
import EmptySentence from "../components/EmptySentence";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserContext } from "../lib/UserContext";
import InstructionsModal from "../components/InstructionsModal";

const PAGE_HEIGHT = Dimensions.get("window").height;
const PAGE_WIDTH = Dimensions.get("window").width;

const Phrasebook = ({ navigation, route }) => {
  let setMenuVisible;

  if (route.params?.setMenuVisible) {
    setMenuVisible = route.params.setMenuVisible;
  }

  // State for phrases

  const [translations, setTranslations] = useState(true);

  const emptySentences = 5;  

  // Import session data

  const { session, setSession, langCode, setLangCode, lang, setLang, tutorial, setTutorial, sentences, setSentences } = useContext(UserContext);

  // make sure to update sentences 
  useEffect(() => {
    console.log("UPDATING!!")
  }, [sentences]);
  
  // set state for instructions modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [tutorialText, setTutorialText] = useState("");

  useEffect(() => {
    if (sentences.length < 2 && tutorial === false) {
      setTutorialText("Welcome to your Phrasebook! You can find your first one-word sentence below. \n \n Now let's make a longer sentence to introduce ourselves. Select 'Tap to add!' right below 'Where we're from'")
    }
    if (sentences.length >= 2 && tutorial === false) {
      setTutorialText("You've completed your first two sentences \n \n 🎉 \n \n Tap one of them to launch the AI bot!")
    }
  }, [sentences]);
  

  // activate tutorial modal if tutorial not completed
  useEffect(() => {
    if (tutorial === false) {
      setModalVisible(true);
    }
  }, []);

  // Set up state variables for languages list

  const [langs, setLangs] = useState([]);
  const [langCodes, setLangCodes] = useState([]);

  const [types, setTypes] = useState([
    {
      name: "exclamations",
      label: "One word basics 🚀",
      unfilled: emptySentences,
    },
    {
      name: "introduction",
      label: "Jobs or studies  💼",
      unfilled: emptySentences,
    },
    {
      name: "hometown",
      label: "Where we're from 🌍",
      unfilled: emptySentences,
    },
    { name: "feelings", label: "Feelings 😃", unfilled: emptySentences },
    { name: "family", label: "My family 🏡", unfilled: emptySentences },
    { name: "hobbies", label: "Hobbies 🎨", unfilled: emptySentences },
    { name: "places", label: "Places 📍", unfilled: emptySentences },
  ]);

  // Fetch sentences based on session

  const layoutSentences = async () => {
    
      if (sentences) {
        setTypes([
          {
            name: "exclamations",
            label: "One word basics 🚀",
            unfilled:
              emptySentences -
              sentences.filter(obj => {
                return obj.type === "exclamations" && obj.language === lang;
              }).length,
          },
          {
            name: "hometown",
            label: "Where we're from 🌍",
            unfilled:
              emptySentences -
              sentences.filter(obj => {
                return obj.type === "hometown" && obj.language === lang;
              }).length,
          },
          {
            name: "introduction",
            label: "Jobs or studies  💼",
            unfilled:
              emptySentences -
              sentences.filter(obj => {
                return obj.type === "introduction" && obj.language === lang;
              }).length,
          },          
          {
            name: "feelings",
            label: "Feelings 😃",
            unfilled:
              emptySentences -
              sentences.filter(obj => {
                return obj.type === "feelings" && obj.language === lang;
              }).length,
          },
          {
            name: "family",
            label: "My family 🏡",
            unfilled:
              emptySentences -
              sentences.filter(obj => {
                return obj.type === "family" && obj.language === lang;
              }).length,
          },
          {
            name: "hobbies",
            label: "Hobbies 🎨",
            unfilled:
              emptySentences -
              sentences.filter(obj => {
                return obj.type === "hobbies" && obj.language === lang;
              }).length,
          },
          {
            name: "places",
            label: "Places 📍",
            unfilled:
              emptySentences -
              sentences.filter(obj => {
                return obj.type === "places" && obj.language === lang;
              }).length,
          },
        ]);
        setLangs(Array.from(new Set(sentences.map(({ language }) => language))));
        setLangCodes(
          Array.from(new Set(sentences.map(({ lang_code }) => lang_code)))
        );
      }
    }

  useEffect(() => {
    layoutSentences();
  }, [session, sentences, lang, langCode]);

  // Count types of each sentence

  // Action sheet

  const { showActionSheetWithOptions } = useActionSheet();

  const onPress = () => {
    let options = langs;
    options.push("Cancel");
    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        //  destructiveButtonIndex
      },
      (selectedIndex: number) => {
        switch (selectedIndex) {
          case 0:
            // Save
            setLang(options[selectedIndex]);
            setLangCode(langCodes[selectedIndex]);
            break;

          case 1:
            // Save
            setLang(options[selectedIndex]);
            setLangCode(langCodes[selectedIndex]);
            break;

          // case destructiveButtonIndex:
          // Delete
          //break;

          default:
            for (let i = 2; i < options.length; i++) {
              if (selectedIndex === i) {
                setLang(options[i]);
                setLangCode(langCodes[i]);
                break;
              }
            }
            break;

          case cancelButtonIndex:
            break;
          // Canceled
        }
      }
    );
  };

  // Render sentences

  const renderSentences = type => {
    //console.log( "sentences", sentences)
    return sentences.filter
      ? sentences
          .filter(obj => {
            return obj.language === lang && obj.type === type;
          })
          .map(sentence => (
            <SentenceCard
              key={sentence.id}
              navigation={navigation}
              id={sentence.id}
              sentence={sentence.sentence}
              translation={sentence.translation}
              blocks={sentence.blocks}
              type={type}
              langCode={langCode}
              translations={translations}
              session={session}
              romanization={sentence.romanization}
            />
          ))
      : null;
  };

  // Render unfilled
  const renderUnfilled = (type, lang, langCode, setMenuVisible) => {
    const cards = [];
    //for (let i = 0; i < type.unfilled; i++) {
    if (type.unfilled > 0) {
      cards.push(
        <EmptySentence
          key={`${type.name}-unfilled`} // Add a unique key prop
          navigation={navigation}
          type={type.name}          
          setMenuVisible={setMenuVisible}
        />
      );
    }
    return cards;
  };

  const sentenceCounter = unfilled => {
    if (unfilled === emptySentences) {
      return (
        <Text style={[styles.typeText, { color: "red" }]}>{` (${
          emptySentences - unfilled
        }/${emptySentences})`}</Text>
      );
    }
    if (unfilled <= 0) {
      return (
        <Text style={[styles.typeText, { color: "green" }]}>{` (${
          emptySentences - unfilled
        }/${emptySentences}) 🏅`}</Text>
      );
    } else {
      return (
        <Text style={[styles.typeText, { color: "orange" }]}>{` (${
          emptySentences - unfilled
        }/${emptySentences})`}</Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#319CFF", "#319CFF"]}
          locations={[0, 0.99]}
          style={styles.linearGradient}
        />
        <Header />
        <InstructionsModal
            isVisible={isModalVisible}
            onClose={() => setModalVisible(false)}
            text={tutorialText}
        />
        <View style={styles.topContent}>
          <Text style={styles.mainText}>Your phrasebook</Text>
          <View style={styles.topContainer}>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => onPress()}
            >
              <View>
                <Text style={styles.pickerText}>{lang}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.switchContainer}>
              <Text style={styles.pickerText}>Eng: </Text>
              <Switch
                value={translations}
                color={"#FFC107"}
                onValueChange={value => setTranslations(value)}
              />
            </View>
          </View>
          <DraxProvider>
            <View style={styles.scrollLimit}>
              <DraxScrollView style={styles.sentenceContainer}>
                {types.map((type, index) => {
                  return (
                    <View key={index}>
                      <View style={styles.counterContainer}>
                        <Text style={styles.typeText}>{type.label}</Text>
                        {sentenceCounter(type.unfilled)}
                      </View>
                      {renderSentences(type.name)}
                      {renderUnfilled(type, lang, langCode, setMenuVisible)}
                    </View>
                  );
                })}
                {renderSentences("introduction")}
              </DraxScrollView>
            </View>
          </DraxProvider>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    //alignItems: 'center',
    display: "flex",
  },
  scrollLimit: {
    height: PAGE_HEIGHT - 200,
    width: PAGE_WIDTH,
  },
  sentenceContainer: {
    flexDirection: "column",
    justifyContent: "center",
    //alignItems: 'center',
    display: "flex",
    padding: 10,
    width: PAGE_WIDTH,
    //height: PAGE_HEIGHT,
  },
  topContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  mainText: {
    fontSize: 54,
    color: "white",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  typeText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "flex-start",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
  },
  linearGradient: {
    position: "absolute",
    height: PAGE_HEIGHT,
    left: 0,
    right: 0,
    top: 0,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pickerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  pickerContainer: {
    backgroundColor: "transparent",
    borderColor: "#FFC107",
    borderWidth: 1,
    width: PAGE_WIDTH * 0.4,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
});

export default Phrasebook;
