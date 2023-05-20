import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
//import { Button } from '@rneui/base';
import { NativeBaseProvider } from "native-base";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Header from "./components/Header";
import LogIn from "./screens/LogIn";
import { supabase } from "./lib/supabase";
import Phrasebook from "./screens/Phrasebook";
import Home from "./screens/Home";
import * as Sentry from "sentry-expo";
import AppIntroSlider from "react-native-app-intro-slider";
import NewLogo from "@app/assets/newLogo.svg";
import SliderImage1 from "@app/assets/SliderImage1.svg";
import SliderImage3 from "@app/assets/SliderImage3.svg";
import SliderImage4 from "@app/assets/SliderImage4.svg";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { UserContext } from "./lib/UserContext";
import VoiceGPT from "./screens/VoiceGPT";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/*Sentry.init({
  dsn: "https://5a92132c278b42a79bb122eb9c511e43@o4504618398908416.ingest.sentry.io/4504618595713024",
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});*/


const PAGE_HEIGHT = Dimensions.get("window").height;
const PAGE_WIDTH = Dimensions.get("window").width;

const slides = [
  {
    key: 1,
    title: "Chat with your buddy",
    text: "About anything!",
    image: <SliderImage1 />,
    backgroundColor: "#3499FE",
  },  
  {
    key: 2,
    title: "Audio first, talk and listen",
    text: "Speak out, don't type out (unless you want to!)",
    image: <SliderImage3 />,
    backgroundColor: "#3499FE",
  },
  {
    key: 3,
    title: "Choose a chat topic",
    text: "Powered by GPT, driven by empathy",
    image: <SliderImage4 />,
    backgroundColor: "#3499FE",
  },
];

// add linear gradient to navigation container
export default function App() {
  // MAIN APP ENTRY POINT

  /*this.state = {
    showRealApp: false
  }*/

  const [showRealApp, setShowRealApp] = useState(false);

  // Set up language state

  const [langCode, setLangCode] = useState("en-UK"); // careful what you send to phrasebook
  const [lang, setLang] = useState("English"); // default language is English

  // Set session state

  const [session, setSession] = useState();

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        session ? setShowRealApp(true) : null;
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        session ? setShowRealApp(true) : null;
      });
    }, []);

  // Set tutorial state (false if NOT completed)
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
  }, []);

  // Fetch sentences

  const [sentences, setSentences] = useState([])

  const fetchSentences = async () => {
      console.log("SUPABASE CALL")
      const { data, error } = await supabase
        .from("sentences")
        .select(
          "id, sentence, language, lang_code, type, translation, blocks, romanization"
        )
        .eq("user", session.user.id)
        .not("translation", "is", null);

      if (error) alert(error.message);

      if (data) {
        setSentences(data);        
      }
  };

  useEffect(() => {
    fetchSentences();
  }, [session]);

  // ADD MENU VISIBILITY VARIABLE HERE

  const [menuVisible, setMenuVisible] = useState(false);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <NewLogo style={styles.logo} />
        <Text style={styles.title}>{item.title}</Text>
        {item.image}
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    setShowRealApp(true);
  };

  const renderDoneButton = () => {
    //"rgba(255, 255, 255, .9)"
    return (
      <TouchableOpacity onPress={() => onDone()}>
        <View style={styles.buttonCircle}>
          <Icon name="md-checkmark" color="black" size={24} />
        </View>
      </TouchableOpacity>
    );
  };

  const Tab = createBottomTabNavigator();

  try {
    // your code SENTRY


    // transparent header: options={{headerTransparent: true}}

    // Higher order component to pass setmenuvisible prop to home
    const withSetMenuVisible = Component => props =>
      <Component {...props} setMenuVisible={setMenuVisible} />;

    if (showRealApp || session) {
      return (
        <ActionSheetProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer
              fallback={<Text>Loading...</Text>}
            >
              <NativeBaseProvider style={styles.container}>                
                  <UserContext.Provider
                    value={{ langCode, setLangCode, lang, setLang, session, setSession, tutorial, setTutorial, sentences, setSentences }}
                  >
                    <Tab.Navigator
                      screenOptions={{
                        header: ({ navigation }) => {
                          // const title = getHeaderTitle(route.name);
                          return (
                            <Header
                              navigation={navigation}
                              menuVisible={menuVisible}
                              setMenuVisible={setMenuVisible}
                            />
                          );
                        },
                        drawerPosition: "left",
                        headerRight: () => (
                          <Header
                            navigation={navigation}
                            menuVisible={menuVisible}
                            setMenuVisible={setMenuVisible}
                          />
                        ),
                        overlayColor: "transparent",
                        headerTransparent: true,
                      }}
                    >
                      <Tab.Screen
                        name="Home"
                        component={withSetMenuVisible(Home)}
                      />                      
                      <Tab.Screen name="ChatBuddy" component={VoiceGPT} />
                      <Tab.Screen
                        name="Phrasebook"
                        component={withSetMenuVisible(Phrasebook)}
                      />                    
                      <Tab.Screen name="LogIn" component={LogIn} />
                    </Tab.Navigator>
                  </UserContext.Provider>                
              </NativeBaseProvider>
            </NavigationContainer>
          </GestureHandlerRootView>
        </ActionSheetProvider>
      );
    } else {
      return (
        <AppIntroSlider
          renderItem={renderItem}
          data={slides}
          onDone={onDone}
          renderDoneButton={renderDoneButton}
        />
      );
    }
  } catch (error) {
    Sentry.Native.captureException(error);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    position: "absolute",
    height: PAGE_HEIGHT,
    left: 0,
    right: 0,
    top: 0,
  },
  buttonStyle: {
    position: "absolute",
    top: 20,
    right: PAGE_WIDTH / 2,
    zIndex: 1,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  // styling for intro slides
  title: {
    fontSize: 36,
    color: "white",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    fontWeight: "500",
    width: PAGE_WIDTH / 1.5,
    marginBottom: PAGE_HEIGHT / 10,
    marginTop: PAGE_HEIGHT / 30,
  },
  logo: {
    position: "absolute",
    top: PAGE_HEIGHT / 10,
  },
  text: {
    color: "white",
    textAlign: "center",
    display: "flex",
    marginTop: PAGE_HEIGHT / 20,
    alignItems: "center",
    width: PAGE_WIDTH / 1.5,
    fontWeight: "400",
    fontSize: 26,
  },
  slide: {
    backgroundColor: "#3499FE",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: PAGE_HEIGHT,
    width: PAGE_WIDTH,
  },
});
