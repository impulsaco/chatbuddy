import React from "react";
import {
  View,
  TouchableOpacity,
  Button,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Card } from "@rneui/themed";
import { DraxProvider, DraxView } from "react-native-drax";
import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "@env";
import AudioPlayback from "@app/assets/audioPlayback.svg";
import sentenceSpeak from "../lib/sentenceSpeak";
import TrashBin from "@app/assets/TrashBin.svg";
import { supabase } from "@app/lib/supabase";
import { useActionSheet } from "@expo/react-native-action-sheet";
import ChatIcon from "@app/assets/chatIcon.svg";

const PAGE_HEIGHT = Dimensions.get("window").height;
const PAGE_WIDTH = Dimensions.get("window").width;

// Set up GPT3

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Delete sentence functionality

// Action sheet

const SentenceCard = ({
  id,
  navigation,
  sentence,
  translation,
  translations,
  langCode,
  blocks,
  type,
  session,
  romanization,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const onDelete = id => {
    const options = ["Delete", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            // Delete
            deleteSentence(id);
            break;

          case cancelButtonIndex:
            // Canceled
            break;
        }
      }
    );
  };

  async function deleteSentence(id) {
    const { error } = await supabase.from("sentences").delete().eq("id", id);

    if (error) alert(error.message);
  }

  // For translations

  const sentenceTranslation = () => {
    if (translations === true && translation !== null) {
      return <Text style={styles.textLight}>{translation}</Text>;
    } else {
      return null;
    }
  };
  // You are a language tutor in Spanish. Users will use a sentence from a phrasebook, and you must respond in a realistic way that uses basic beginner-level vocabulary for them to practice receiving responses
  const gptResponse = sentence => {
    console.log("sentence  in GPT-4 is ", sentence);
    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: `Respond to the following sentence, in the language you identify, with romanization on a second line if the language does not use the latin alphabet: ${sentence}`,
        temperature: 0.7,
        max_tokens: 100,
      })
      .then(response => alert(response.data.choices[0].text.trim()));
  };

  // Practice button for later:
  /*
    <TouchableOpacity style={styles.practiceButton}>
        <Text style={styles.practiceText}>Practice</Text>
    </TouchableOpacity>
    */

  const sentenceRomanization = () => {
    if (romanization) {
      return (
        <Text style={[styles.textLight, { fontStyle: "italic" }]}>
          {romanization}
        </Text>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity style={styles.sentenceCard} onPress={() =>
            navigation.navigate("LanguageBuddy", {
              launchPhrase: sentence,              
            })
          }>
        <TouchableOpacity onPress={() => sentenceSpeak(sentence, langCode)}>
          <AudioPlayback />
        </TouchableOpacity>
        <View style={styles.sentenceContainer}>
          <Text style={styles.text}>{sentence}</Text>
          {sentenceRomanization()}
          {sentenceTranslation()}
        </View>          
          <TouchableOpacity
            style={styles.trashContainer}
            onPress={() => onDelete(id)}
          >
            <TrashBin style={[{ fill: "red" }]} />
          </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sentenceCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: PAGE_WIDTH * 0.05,
    paddingVertical: PAGE_HEIGHT * 0.02,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    position: "relative",
    width: PAGE_WIDTH * 0.87,
    margin: 10,
  },
  sentenceContainer: {
    flexDirection: "column",
    marginLeft: PAGE_WIDTH * 0.05,
    alignItems: "flex-start",
  },
  practiceButton: {
    backgroundColor: "#FFC107",
    borderRadius: 10,
    position: "absolute",
    right: PAGE_WIDTH * 0.1,
    padding: 10,
  },
  practiceText: {
    fontSize: 14,
    height: 16,
    textAlign: "center",
    color: "black",
  },
  text: {
    fontSize: 14,
    flexWrap: "wrap",
    height: 20,
    width: PAGE_WIDTH * 0.4,
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    color: "#030303",
  },
  textLight: {
    fontSize: 14,
    height: 18,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "#B7B7B7",
    marginTop: 10,
  },
  trashContainer: {
    position: "absolute",
    right: PAGE_WIDTH * 0.03,
  },
});

export default SentenceCard;
