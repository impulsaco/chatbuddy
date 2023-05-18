import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@rneui/themed";
import { supabase } from "@app/lib/supabase";
import KoreanFlag from "@app/assets/KoreanFlag.svg";
import SpanishFlag from "@app/assets/SpanishFlag.svg";
import BulgarianFlag from "@app/assets/BulgarianFlag.svg";
import GermanFlag from "@app/assets/GermanFlag.svg";
import ItalianFlag from "@app/assets/ItalianFlag.svg";
import FrenchFlag from "@app/assets/FrenchFlag.svg";
import AlbanianFlag from "@app/assets/AlbanianFlag.svg";
import BengaliFlag from "@app/assets/BengaliFlag.svg";
import JapaneseFlag from "@app/assets/JapaneseFlag.svg";
import { LanguageContext } from "../lib/LanguageContext";
import { SessionContext } from "../lib/SessionContext";
import VoiceGPT from "./VoiceGPT";

const PAGE_HEIGHT = Dimensions.get("window").height;

const PAGE_WIDTH = Dimensions.get("window").width;

function Home({ navigation, setMenuVisible }) {
  // Retrieve session

  // Retrieve session

  const { session, setSession } = useContext(SessionContext);

  const { langCode, setLangCode, lang, setLang } = useContext(LanguageContext);

  /* 
    To add later:

    <TouchableOpacity style={styles.languageBox} onPress={() => {navigation.navigate('Choose', {lang: "Albanian", langCode: "sq"}); setLangCode("sq"); setLang("Albanian")}}>
                      <Text style={styles.buttonText}>Albanian</Text>
                      <AlbanianFlag width={55}/>
                    </TouchableOpacity>   
                    <TouchableOpacity style={styles.languageBox} onPress={() => {navigation.navigate('Choose', {lang: "Bengali", langCode: "bn"}); setLangCode("bn"); setLang("Bengali")}}>
                      <Text style={styles.buttonText}>Bengali</Text>
                      <BengaliFlag width={55}/>
                    </TouchableOpacity>                             
    
    */

  // Get tutorial status
  const [tutorial, setTutorial] = useState(false)

  const fetchTutorial = async () => {
    if (session) {
      console.log("fetching from Supabase tutorial!")
      const { data, error } = await supabase
        .from("profiles")
        .select(
          "tutorial"
        )
        .eq("id", session.user.id) 
      if (error) alert(error.message);

      if (data) {   
        console.log("fetched tutorial is", data[0].tutorial)
        setTutorial(data.tutorial)
      }
    }
  }


  useEffect(() => {
    fetchTutorial();
  }, [session]);


  const renderButtons = () => {
    if (!session?.user) {
      return (
        <View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() =>
              navigation.navigate("LogIn", {
                session: session,
                setSession: setSession,
              })
            }
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (session?.user) {
      return (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>What would you like to learn?</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.languageBox}
                onPress={() => {
                  navigation.navigate("Choose", {
                    lang: "Korean",
                    langCode: "ko",
                  });
                  setLangCode("ko");
                  setLang("Korean");
                }}
              >
                <Text style={styles.buttonText}>Korean</Text>
                <KoreanFlag width={55} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.languageBox}
                onPress={() => {
                  navigation.navigate("Choose", {
                    lang: "Spanish",
                    langCode: "es-MX",
                  });
                  setLangCode("es-MX");
                  setLang("Spanish");
                }}
              >
                <Text style={styles.buttonText}>Spanish</Text>
                <SpanishFlag width={55} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.languageBox}
                onPress={() => {
                  navigation.navigate("Choose", {
                    lang: "German",
                    langCode: "de",
                  });
                  setLangCode("de");
                  setLang("German");
                }}
              >
                <Text style={styles.buttonText}>German</Text>
                <GermanFlag width={55} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.languageBox}
                onPress={() => {
                  navigation.navigate("Choose", {
                    lang: "Italian",
                    langCode: "it",
                  });
                  setLangCode("it");
                  setLang("Italian");
                }}
              >
                <Text style={styles.buttonText}>Italian</Text>
                <ItalianFlag width={55} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.languageBox}
                onPress={() => {
                  navigation.navigate("Choose", {
                    lang: "French",
                    langCode: "fr-FR",
                  });
                  setLangCode("fr-FR");
                  setLang("French");
                }}
              >
                <Text style={styles.buttonText}>French</Text>
                <FrenchFlag width={55} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.languageBox}
                onPress={() => {
                  navigation.navigate("Choose", {
                    lang: "Bulgarian",
                    langCode: "bg",
                  });
                  setLangCode("bg");
                  setLang("Bulgarian");
                }}
              >
                <Text style={styles.buttonText}>Bulgarian</Text>
                <BulgarianFlag width={55} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.languageBox}
                onPress={() => {
                  navigation.navigate("Choose", {
                    lang: "Japanese",
                    langCode: "ja",
                  });
                  setLangCode("ja");
                  setLang("Japanese");
                }}
              >
                <Text style={styles.buttonText}>Japanese</Text>
                <JapaneseFlag width={55} />
              </TouchableOpacity>
            </View>
            <View style={styles.lowerContainer}>
              <View style={styles.phrasebookContainer}>
                <TouchableOpacity
                  style={styles.phrasebookButton}
                  onPress={() =>
                    navigation.navigate("Phrasebook", {
                      lang: lang,
                      setLang: setLang,
                      langCode: langCode,
                      setLangCode: setLangCode,
                      setMenuVisible: setMenuVisible,
                    })
                  }
                >
                  <Text style={styles.longButtonText}>My phrases</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.phrasebookContainer}>
                <TouchableOpacity
                  style={styles.phrasebookButton}
                  onPress={() =>
                    navigation.navigate("LanguageBuddy", {
                      lang: lang,
                      setLang: setLang,
                      langCode: langCode,
                      setLangCode: setLangCode,
                      setMenuVisible: setMenuVisible,
                    })
                  }
                >
                  <Text style={styles.longButtonText}>Language Buddy</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.logOutContainer}>
                <TouchableOpacity
                  style={styles.logoutButton}
                  onPress={() => supabase.auth.signOut()}
                >
                  <Text style={[styles.longButtonText, { color: "white" }]}>
                    Log out
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
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
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
  },
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
    padding: 10,
  },
  lowerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    textAlignVertical: "center",
  },
  longButtonText: {
    fontSize: 16,
    color: "black",
  },
  languageBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    width: PAGE_WIDTH * 0.22,
    height: PAGE_HEIGHT * 0.1,
    margin: 10,
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
  loginButton: {
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
  logoutButton: {
    display: "flex",
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    width: PAGE_WIDTH * 0.45,
    height: PAGE_HEIGHT * 0.05,
    margin: 10,
  },

  bottomContainer: {
    display: "flex",
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: PAGE_WIDTH * 0.8,
  },
  mainText: {
    fontSize: 36,
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
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    paddingBottom: PAGE_HEIGHT * 0.1,
  },
  phrasebookContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  logOutContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export default Home;
