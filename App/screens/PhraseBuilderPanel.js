import React, { useState, useEffect, useContext } from "react";
import { Text, Dimensions, View, StyleSheet } from "react-native";
import { SceneMap } from "react-native-tab-view";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DraxProvider, DraxScrollView } from "react-native-drax";
import Sentence from "../screens/Sentence";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useFocusEffect } from "@react-navigation/native";
import DraggableWord from "../components/DraggableWord";
import WordMenu from "../components/WordMenu";
import Header from "../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import AddWord from "../components/AddWord";
import { supabase } from "@app/lib/supabase";
import WordRoute from "../lib/WordRoute";
import { UserContext } from "../lib/UserContext";
import SayModal from "@app/features/saymodal/components/SayModal";
import exclamationsList from "@app/data/wordsets/exclamationsList";
import InstructionsModal from "@app/components/InstructionsModal";
import { NavigationContainer } from '@react-navigation/native';


const PAGE_WIDTH = Dimensions.get("window").width;
const PAGE_HEIGHT = Dimensions.get("window").height;

export function PhraseBuilderPanel({ navigation, route }) {

  // Import session data

  const { langCode, setLangCode, lang, setLang, tutorial, setTutorial } = useContext(UserContext);
  
  // set state for instructions modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [tutorialText, setTutorialText] = useState("Welcome to Say! This is the Playground, where we practice and learn new phrases. \n \n The first thing we'll do is say 'hello'! \n \n Tap the word from the menu below.");

  // activate tutorial modal if tutorial not completed
  useEffect(() => {
    if (tutorial === false) {
      setModalVisible(true);
    }
  }, []);

  // state for tracking active index on WordRoute
  const [activeIndex, setActiveIndex] = useState(0);  


  // set up translations toggle

  const [translations, setTranslations] = useState(true);

  let starterText = "Pick words to build your sentence";

  // set up the tab navigator, for alternative navigation

  // Set styles

  // Import params

  const wordSet = (route.params && route.params.wordSet) || exclamationsList;

  // set up word lists based on choice

  let createWordList = wordSet(langCode);

  // Update based on language context
  useEffect(
    createWordList => {
      createWordList = wordSet(langCode);
      setWords(createWordList[2]);
      setSentenceInit(createWordList[1]);
      setSentenceType(createWordList[0]);
    },
    [route.params, langCode]
  );

  const [words, setWords] = useState(createWordList[2]);

  const [sentenceInit, setSentenceInit] = useState(createWordList[1]);

  const [sentenceType, setSentenceType] = useState(createWordList[0]);

  // Activate tutorial part 2 after first word
  useEffect(() => {
    console.log("index is ", activeIndex)
    if (tutorial === false && sentenceInit.length > 1 && activeIndex === 0) {
      setTutorialText(`For longer sentences, Say! teaches you the order of words in a language. \n \n You'll start with a ${sentenceInit[activeIndex].type} -- who is this sentence about?`);
      setModalVisible(true);
    }

    if (tutorial === false && sentenceInit.length > 1 && activeIndex === 1) {
      setTutorialText(`Great! Now pick a ${sentenceInit[activeIndex].type}`);
      setModalVisible(true);
    }

    if (tutorial === false && sentenceInit.length > 1 && activeIndex === (sentenceInit.length - 1)) {
      setTutorialText(`Once you pick the last word, Say will make a sentence with those words. \n \n We're taking care of conjugations, articles, and all that good stuff.`);
      setModalVisible(true);
    }
  }, [activeIndex]);

  const routeList = sentenceInit.map(item => item.type);

  // Load user words and set up state for it

  const [userWords, setUserWords] = useState([]);

  const [sentence, setSentence] = useState(sentenceInit); // Sets the initial sentence state, will be modified on drag or tap
  // SHOULD BE USEEFFECT FOR UPDATING

  useEffect(() => {
    setSentence(sentenceInit);
  }, [sentenceInit]);

  // Set translation placeholder
  const [sentenceEn, setSentenceEn] = useState(" ");

  // Say/recording modal setup

  const [sayVisible, setSayVisible] = useState("invisible");

  // Create Whisper sentence

  const [sentenceWhisper, setSentenceWhisper] = useState("no whisper yet");

  // Check if sentence has been said and is understood enough to save
  const [sentenceSaidPercentage, setSentenceSaidPercentage] = useState(0);

  // Other state set up

  const [text, setText] = useState(starterText);

  const [sentenceText, setSentenceText] = useState(" ");

  const [sentenceRomanized, setSentenceRomanized] = useState(null);

  // Sentence analyzed

  const [sentenceAnalyzed, setSentenceAnalyzed] = useState([]);

  // Automatic completion checker

  const [sentenceReady, setSentenceReady] = useState(false);
  const [sentenceFixed, setSentenceFixed] = useState(false);
  const [savedSentence, setSavedSentence] = useState("");

  // Set up functions for reset and toggle translations
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
    setSayVisible("invisible");
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("REFRESHING");
      resetSentence();

      return () => {
        // You can perform cleanup here, if needed.
      };
    }, [])
  );

  const toggleTranslations = () => {
    if (translations === true) {
      setTranslations(false);
    } else {
      setTranslations(true);
    }
  };

  // Updates word boxes to load on choose phrase structure
  useEffect(() => {
    setSentence(createWordList[1]);
    setSentenceType(createWordList[0]);
    setSentenceInit(createWordList[1]);
    setWords(createWordList[2]);
  }, [route.params]);

  // Retrieve session

  const { session } = useContext(UserContext);

  // Fetch user-created words based on session

  let wordsLang;

  useEffect(() => {
    if (lang === "ko") {
      wordsLang = "wordsKo";
    }

    if (lang === "es-MX") {
      wordsLang = "wordsEs";
    }
  }, [langCode, lang]);

  useEffect(() => {
    const fetchWords = async () => {
      if (session) {
        const { data, error } = await supabase
          .from("userData")
          .select(wordsLang)
          .eq("user", session.user.id);

        if (error) alert(error.message);

        if (data) {
          setUserWords(data);
        }
      }
    };

    fetchWords();
  }, [session]);

  // update words

  // Update words in backend

  async function saveWord() {
    if (langCode === "ko") {
      const { error } = await supabase
        .from("userData")
        .update({
          wordsKo: userWords,
        })
        .eq("user", session.user.id);
      if (error) alert(error.message);
    }
    if (langCode === "es") {
      console.log("creating new spanish word");
      const { error } = await supabase
        .from("profiles")
        .update({ wordsEs: userWords })
        .eq("id", session.user.id);
      if (error) alert(error.message);
    }
  }

  saveWord();

  // setup tab navigation

  const Tab = createMaterialTopTabNavigator();

  // tab router setup

  const [forward, setForward] = useState("");

  // Note: DraxProvider doesn't work on Android with Tab.Navigator

  // SayModal visibility

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted && sayVisible === "record") {
      setForward("SayModal");
    }
  }, [isMounted, sayVisible, sentence]);

  const handleSayModalMounted = () => {
    setIsMounted(true);
  };

  const drawerNavigation = navigation;

  // Set up navigation to phrasebook after sentence complete

  const [navigatePhrasebook, setNavigatePhrasebook] = useState(false);

  useEffect(() => {
    if (navigatePhrasebook) {
      navigation.navigate("Phrasebook");
      setNavigatePhrasebook(false);
    }
  }, [navigatePhrasebook]);

  // Recording tutorial text

  useEffect(() => {
    if (sayVisible === "record" && sentenceInit.length === 1) {
      setTutorialText("Fantastic! Now you'll practice saying the word. Tap the microphone to start recording.");
      setModalVisible(true);
    }

    if (sayVisible === "record" && sentenceInit.length > 1) {
      setTutorialText("Well done! Just like last time, let's practice saying our phrase");
      setModalVisible(true);
    }

    if (sayVisible === "success" || sayVisible === "partly" || sayVisible === "none" && sentenceInit.length === 1) {
      setTutorialText("Now we'll tell you whether we understood you. You can try again if not! \n \n Once you get it right, tap 'Save it!', then 'Go to phrasebook!'");
      setModalVisible(true);
    }

    if (sayVisible === "success" && sentenceInit.length > 1) {
      setTutorialText("Excellent! Keep trying until you get it right. \n \n Tap 'Save it!', then 'Go to phrasebook!'");
      setModalVisible(true);
    }
  }, [sayVisible]);

  const sayModal = drawerNavigation => {    

    if (sayVisible !== "invisible") {    
      return (
        <Tab.Screen
          name="SayModal"
          options={{
            tabBarLabel: "Say",
            tabBarVisible: false, // hide tab bar for this screen
            // swipeEnabled: false,
          }}
        >          
          {props => (
            <SayModal
              {...props}
              drawerNavigation={drawerNavigation}
              setNavigatePhrasebook={setNavigatePhrasebook}
              sentence={sentence}
              sentenceEn={sentenceEn}
              sayVisible={sayVisible}
              setSayVisible={setSayVisible}
              sentenceWhisper={sentenceWhisper}
              setSentenceWhisper={setSentenceWhisper}
              lang={lang}
              langCode={langCode}
              sentenceSaidPercentage={sentenceSaidPercentage}
              setSentenceSaidPercentage={setSentenceSaidPercentage}
              sentenceText={sentenceText}
              sentenceType={sentenceType}
              setText={setText}
              setForward={setForward}
              sentenceInit={sentenceInit}
              onMounted={handleSayModalMounted}
              sentenceRomanized={sentenceRomanized}
            />
          )}
        </Tab.Screen>
      );
    } else {
      return null;
    }
  };

  return (
    <GestureHandlerRootView style={styles.gestureRootViewStyle}>
      <DraxProvider>
        <View style={styles.gestureRootViewStyle}>
          <LinearGradient
            colors={["#319CFF", "#319CFF"]}
            locations={[0, 0.99]}
            style={styles.linearGradient}
          />
          <Header />
          <Sentence
            sentenceInit={sentenceInit}
            words={words}
            setWords={setWords}
            forward={forward}
            setForward={setForward}
            translations={translations}
            setTranslations={setTranslations}
            lang={lang}
            langCode={langCode}
            sentence={sentence}
            setSentence={setSentence}
            sentenceType={sentenceType}
            navigation={navigation}
            sentenceEn={sentenceEn}
            setSentenceEn={setSentenceEn}
            sayVisible={sayVisible}
            setSayVisible={setSayVisible}
            sentenceWhisper={sentenceWhisper}
            setSentenceWhisper={setSentenceWhisper}
            sentenceSaidPercentage={sentenceSaidPercentage}
            setSentenceSaidPercentage={setSentenceSaidPercentage}
            text={text}
            setText={setText}
            sentenceText={sentenceText}
            setSentenceText={setSentenceText}
            sentenceRomanized={sentenceRomanized}
            setSentenceRomanized={setSentenceRomanized}
            sentenceReady={sentenceReady}
            setSentenceReady={setSentenceReady}
            sentenceAnalyzed={sentenceAnalyzed}
            setSentenceAnalyzed={setSentenceAnalyzed}
            setSentenceFixed={setSentenceFixed}
            setSavedSentence={setSavedSentence}
          />
          <InstructionsModal
            isVisible={isModalVisible}
            onClose={() => setModalVisible(false)}
            text={tutorialText}
          />          
            <Tab.Navigator
              tabBar={props => (
                <WordMenu
                  {...props}
                  forward={forward}
                  setForward={setForward}
                  words={words}
                  sentence={sentence}
                  setSentence={setSentence}
                />
              )}
              initialRouteName={"subject"}
              sceneContainerStyle={{ backgroundColor: "transparent" }}
            >
              {routeList.map((route, index) => (
                <Tab.Screen
                  key={`tab-screen-${index}`}
                  name={route}
                  component={WordRoute}
                  initialParams={{
                    routes: routeList,
                    route,
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
                    key: `tab-screen-${index}`
                  }}
              />
              ))}
              {sayModal(drawerNavigation)}
            </Tab.Navigator>
        </View>
      </DraxProvider>
    </GestureHandlerRootView>
  );
}

/*
<SayModal 
                        navigation={navigation}
                        sentence={sentence}
                        sentenceEn={sentenceEn}
                        sayVisible={sayVisible} 
                        setSayVisible={setSayVisible}
                        sentenceWhisper={sentenceWhisper}
                        setSentenceWhisper={setSentenceWhisper}
                        lang={lang}
                        langCode={langCode}
                        sentenceSaidPercentage={sentenceSaidPercentage}
                        setSentenceSaidPercentage={setSentenceSaidPercentage}
                        sentenceText={sentenceText}
                        sentenceType={sentenceType}
                        setText={setText}
                    />

                    <Tab.Screen
                        name="SayModal"
                        component={SayModal(navigation,
                            sentence,
                            sentenceEn,
                            sayVisible,
                            setSayVisible,
                            sentenceWhisper,
                            setSentenceWhisper,
                            lang,
                            langCode,
                            sentenceSaidPercentage,
                            setSentenceSaidPercentage,
                            sentenceText,
                            sentenceType,
                            setText
                        )}
                        options={{
                            swipeEnabled: false,
                        }}
                        />     
                        </Tab.Navigator>  
*/

const styles = StyleSheet.create({
  gestureRootViewStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    display: "flex",
  },
  wordContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0)",
    paddingLeft: 10,
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

  linearGradient: {
    position: "absolute",
    height: PAGE_HEIGHT * 1.5,
    left: 0,
    right: 0,
    top: 0,
  },
});
