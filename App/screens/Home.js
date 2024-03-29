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
import { supabase } from "@app/lib/supabase";
import KoreanFlag from "@app/assets/KoreanFlag.svg";
import { UserContext } from "../lib/UserContext";
import VoiceGPT from "./VoiceGPT";

const PAGE_HEIGHT = Dimensions.get("window").height;
const PAGE_WIDTH = Dimensions.get("window").width;

function Home({ navigation, setMenuVisible }) {
  // Retrieve session

  // Retrieve session

  const { langCode, setLangCode, lang, setLang, session, setSession, tutorial, setTutorial } = useContext(UserContext);

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

    if (session?.user && !tutorial) {
      return (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>Welcome to ChatBuddy</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.languageBox}                
                onPress={() =>
                  navigation.navigate("ChatBuddy", {
                    launchPhrase: "Hello World",                    
                  })
                }
              >
                <Text style={styles.buttonText}>Hello World</Text>
              </TouchableOpacity>              
            </View>
            <View style={styles.lowerContainer}>
              
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
