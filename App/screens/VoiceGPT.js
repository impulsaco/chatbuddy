import React, { useState, useEffect, useContext } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import VoiceChat from "./VoiceChat";
import VoiceRecord from "../components/VoiceRecord";
import ChatWordPicker from "../components/ChatWordPicker";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Header from "../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import { UserContext } from "../lib/UserContext";
import InstructionsModal from "@app/components/InstructionsModal";

const PAGE_WIDTH = Dimensions.get("window").width;
const PAGE_HEIGHT = Dimensions.get("window").height;

// Todos for scaffolding

/// Chat messages and styling DONE
/// Type new message DONE
/// Record new message DONE
/// Add message translation DONE
/// Tab navigation DONE
/// Grab phrases DONE
/// Deconstruct phrases into words DONE
/// Use embeddings to find six most relevant words
/// Add word button
/// Shuffle words button
/// Shift to practice modal
/// Reproduce and compress practice modal
/// Push out new sentence to message

export default ({ navigation, route }) => {

  console.log("route.params is ", route.params?.launchPhrase);

  // Import session data

  const { session, setSession, langCode, setLangCode, lang, setLang, tutorial, setTutorial } = useContext(UserContext);
  
  // set state for instructions modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [tutorialText, setTutorialText] = useState("Welcome to the Chat Buddy! Talk with your friend. \n \n You can speak out loud by pressing the microphone, or type in the texbox \n \n Ask the buddy anything! \n \n Let's get started!");

  // activate tutorial modal if tutorial not completed
  useEffect(() => {
    if (tutorial === false) {
      setModalVisible(true);
    }
  }, []);
  

  const Tab = createMaterialTopTabNavigator();
  

  const [newMessage, setNewMessage] = useState(route.params?.launchPhrase || '');

  const [messages, setMessages] = useState([]);

  const [chosenWords, setChosenWords] = useState([]);

  // activate new modal if second message said

  useEffect(() => {
    console.log("messages length is ", messages.length);
    if (tutorial === false && messages.length > 3 ) {
      setModalVisible(true);
      setTutorialText("Great! The Buddy likes you. \n \n You can try new topics on the homepage if you want. \n \n And you can always come back to the Buddy to chit chat.");
    }
  }, [messages]);

  // Navigation handler

  const [forward, setForward] = useState("");

  useEffect(() => {
    if (forward !== "") {
      setTimeout(() => {
        navigation.navigate(forward);
        setForward("");
      }, 100); // Add a delay of 100 milliseconds
      setForward("");
    }
  }, [forward]);

  const voiceRecord = () => {
    return (
      <Tab.Screen
        name="VoiceRecord"
        options={{
          tabBarLabel: "VoiceRecord",
          tabBarVisible: true, // hide tab bar for this screen
          // swipeEnabled: false,
        }}
      >
        {props => (
          <VoiceRecord
            {...props}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
          />
        )}
      </Tab.Screen>
    );
  };

  const chatWordPicker = () => {
    return (
      <Tab.Screen
        name="ChatWordPicker"
        options={{
          tabBarLabel: "ChatWordPicker",
          tabBarVisible: true, // hide tab bar for this screen
          // swipeEnabled: false,
        }}
      >
        {props => (
          <ChatWordPicker
            {...props}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            messages={messages}
            setChosenWords={setChosenWords}
          />
        )}
      </Tab.Screen>
    );
  };

  return (
    <GestureHandlerRootView style={styles.gestureRootViewStyle}>
      <View style={styles.gestureRootViewStyle}>
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
        <VoiceChat
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          messages={messages}
          setMessages={setMessages}
        />
        <Tab.Navigator
          tabBar={() => null} // Hide the tab menu
          sceneContainerStyle={{ backgroundColor: "transparent" }}
        >
          {voiceRecord()}
          {chatWordPicker()}
        </Tab.Navigator>
      </View>
    </GestureHandlerRootView>
  );
};

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
