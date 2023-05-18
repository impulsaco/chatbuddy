import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "@rneui/themed";
import { supabase, supabaseUrl } from "../lib/supabase";
import googleTranslate from "../lib/googleTranslate";
import SaveBanner from "../../assets/saveBanner.svg";
import { TouchableOpacity } from "react-native-gesture-handler";

const PAGE_HEIGHT = Dimensions.get("window").height;
const PAGE_WIDTH = Dimensions.get("window").width;

const SaveButton = ({
  sentence,
  savedSentence,
  sentenceEn,
  lang,
  langCode,
  sentenceType,
  sentenceSaved,
  setSentenceSaved,
  sentenceRomanized,
}) => {
  // Retrieve user session

  const [session, setSession] = useState();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  console.log("in SaveButton, sentencetype is: ", sentenceType);

  async function saveSentence() {
    const { error } = await supabase.from("sentences").insert({
      created_at: new Date().toISOString(),
      user: session.user.id,
      sentence: savedSentence,
      language: lang,
      lang_code: langCode,
      type: sentenceType,
      blocks: sentence,
      translation: sentenceEn,
      romanization: sentenceRomanized,
    });

    if (error) alert(error.message);

    setSentenceSaved(true);
  }

  const saveBanner = () => {
    if (sentenceSaved === false) {
      return (
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => saveSentence()}
        >
          <SaveBanner />
          <Text style={[styles.smallText, { paddingLeft: 10 }]}>Save it!</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.saveButton}>
          <SaveBanner style={[{ fill: "white" }]} />
          <Text style={[styles.smallText, { paddingLeft: 10 }]}>Saved!</Text>
        </TouchableOpacity>
      );
    }
  };

  return <View>{saveBanner()}</View>;
  /*    } 
        else {
            return (
                <TouchableOpacity style={styles.saveButton} onPress={() => saveSentence()}>
                    <SaveBanner style={[{fill: 'white'}]}/>
                    <Text style={[styles.smallText, { paddingLeft: 10} ]}>Saved!</Text>
                </TouchableOpacity>
            )
        }
    }*/

  //saveButton()
  /*useEffect (() => {
        saveButton()
    }, [sentenceSaved])*/
};

const styles = StyleSheet.create({
  saveButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: PAGE_WIDTH * 0.7,

    backgroundColor: "#2E92F0",
    borderRadius: 10,
  },
  smallText: {
    fontSize: 18,
    textAlign: "center",
    color: "#FFFFFF",
  },
});

export default SaveButton;
