import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
//import { Button } from '@rneui/base';
import Words from './screens/Words'
import { NativeBaseProvider } from 'native-base';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Header from './components/Header';
import LogIn from './screens/LogIn';
import { supabase } from './lib/supabase'
import Phrasebook from './screens/Phrasebook';
import Home from './screens/Home';
import { getHeaderTitle } from '@react-navigation/elements';
import * as Sentry from 'sentry-expo';
import PhraseSelector from './screens/PhraseSelector';
import AppIntroSlider from 'react-native-app-intro-slider';
import NewLogo from './../assets/newLogo.svg'
import SliderImage1 from './../assets/SliderImage1.svg'
import SliderImage2 from './../assets/SliderImage2.svg'
import SliderImage3 from './../assets/SliderImage3.svg'
import SliderImage4 from './../assets/SliderImage4.svg'

Sentry.init({
  dsn: 'https://5a92132c278b42a79bb122eb9c511e43@o4504618398908416.ingest.sentry.io/4504618595713024',
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

/*import * as dotenv from 'dotenv' 
import express from 'express'

dotenv.config() */

const PAGE_HEIGHT = Dimensions.get('window').height;

const PAGE_WIDTH = Dimensions.get('window').width;

// data structure: one dict? array of objects? three arrays?



//export default () => <Words/>

// create native base button DONE
// native base button navigates to new screen using stack navigation DONE
// Create state with 150 most common words DONE
// Get an image for each word OR translation for hover LATER
// Pass words to new card DONE
// Generate cards for each image-word pair DONE
// Make cards nicer DONE, scrollable DONE
// Make cards randomized
// Sort cards by type, three sections swipe DONE 
// Create drag and drop boxes DONE
/// https://medium.com/nerd-for-tech/drag-drop-and-swap-between-two-lists-using-react-native-d864dab43aa9
// Create general words state DONE
// Drag and drop boxes DONE
// Connect boxes to dragged words DONE
// Set limits by word type for dragging DONE
// Sentence save button DONE
// Sentence save button saves sentence to state DONE
// Improve Words code organization
// Sentence navigation???
// Shuffle on word double tap???
// Check bugs DONE 
// Save sentence automatically, make it snappy // TODAY
// Check sentence and enable READY when complete DONE
// Enhance sentence with double translate on Google Translate API DONE
// Fix decode bug DONE
// Containerize DONE
// Initial Figma DONE
// Bug: drag off on scrolling DONE
// Switch to Spanish DONE
// New navigation DONE
// Add logo DONE
// Bug: Ready button should refresh sentence
// Integrate GPT3 to Ready button DONE
// Save sentences DONE
// Add translations to words DONE
// Google signin DONE
// Supabase setup DONE
// Save sentence to Supabase DONE
// Set up phrasebook screen DONE
// Retrieve sentences DONE
// Get whisper working DONE
// Card colors by type 
// Add Korean DONE
// Add phrase translations toggle DONE
// Say! button add DONE
// Say! button AI DONE
// Integrate GPT3 DONE
// UI enhancements DONE
// Code cleanup: add context/universal state variables
// Boxes close and open, proper buttons DONE
// New word cards DONE
// Swipe by category DONE
// Colors and styling DONE

/// STARTUP SQUAD CRITICAL DONE
// Whisper sentence check DONE
// Improve login and flow DONE
// Language selection DONE
// Slides DONE
// GPT3 chat response DONE
// Video DONE

// New features
/// Login flow - simple DONE
/// Fix hamburger menu DONE
/// Fix home layout DONE
/// Login flow - context 
/// BUG: Login reset DONE
/// BUG: Fix transcription language DONE
/// Fix button order, Save at the end upon successful Say!, Ready in gray at first DONE
/// BUG: ability to Ready new sentence DONE
/// BUG: New language resets sentence
/// Eliminate audio recording alert DONE
/// AI speed recognition options: DONE DONE DONE
/// Border for phrases, max-width
/// Hot startup container 
/// Unfilled boxes styling 
/// Wordset generation
/// Add words DONE
/// How-to-say text-to-speech DONE
/// Android select by tap DONE
/// Android Bug: erase sentence on say! DONE
/// Android Bug: double menu DONE 
/// Android Bug: identify no drag DONE
/// Android: Move away from tab navigation
/// User list of words with delete 

/// Different sentence structures
//// Generate tabs dynamically DONE
//// Separate words component, organize by type, language, and category DONE
//// Phrase selection screen DONE
//// Phrasebook by type DONE

// Design update
/// Background color DONE
/// Automatic ready DONE
/// Automatic ready refresh bug -- make unready DONE
//// sentenceComplete & sentenceReady = true -> "say" button activates. 
//// refresh -> sentenceComplete = false -> "say" button becomes gray again.
//// new word comes in -> sentenceComplete = true but sentenceReady = false -> "say" button becomes "ready" button 

// Modal DONE DONE DONE
/// Make modal DONE
/// Separate sentence line and instructions DONE
/// Shift buttons to modal DONE
/// Order: sentence to top DONE
/// Recording and saving modal DONE
/// Add microphone DONE
/// Play back recording DONE
/// Partial success result DONE

// Tabs
/// Delete icons DONE
/// Tap wordbox to change tabs DONE
/// Wordbox navigation DONE
/// Words background DONE
/// Dynamic tab background DONE
/// Switch instructions and buttons DONE
/// Color boxes DONE
/// Tab alternative

// Bugs
/// Previous sentence bug DONE
/// Automatic ready bug DONE
/// Handle null audio?
/// Handle no pronunciation DONE
/// Handle close before end recording DONE
/// Handle two correct pronunciations in a row DONE
/// Handle change of words DONE DONE DONE
/// Render slider images DONE

// Other
/// Fewer words DONE (shifted to three per row)
/// Translations icon
/// Shuffle button DONE (not activated yet)
/// Activate shuffle button
/// New add word button DONE
/// Refresh icon
/// Check width bug 

/// Delete phrases
/// Leveling and phrasebook completion
/// GPT Chatbot
/// GPT3 sentence coloring
/// Recording playback
/// Debugging/clean up

// Deployment
/// ngrok permanent --> pay
/// flask permanent --> heroku
/// permanent site for google login
/// github reorg

//Other
/// Nudges for spaced repetition
/// Edge cases cleanup
/// Subjects and nouns interchangeable


//CLEANUP

// Remove Draggable
// Solve child warning

// LIBRARIES
/// react-native-drax
/// html-entities

const Drawer = createDrawerNavigator();

const slides = [
  {
    key: 1,
    title: 'Choose the words you want to learn',
    text: 'No more memorizing useless vocab',
    image: <SliderImage1/>,
    backgroundColor: '#3499FE',
  },
  {
    key: 2,
    title: 'Drag and drop to build a sentence',
    text: 'AI will help you build it',
    image: <SliderImage2/>,
    backgroundColor: '#3499FE',
  },
  {
    key: 3,
    title: 'Instant feedback on your pronunciation',
    text: 'Know you will be understood',
    image: <SliderImage3/>,
    backgroundColor: '#3499FE',
  },
  {
    key: 4,
    title: 'Build your own personal phrasebook',
    text: 'Save sentences to use in daily life and travel',
    image: <SliderImage4/>,
    backgroundColor: '#3499FE',
  }
];

// add linear gradient to navigation container 
export default function App() {

  /*this.state = {
    showRealApp: false
  }*/

  const [showRealApp, setShowRealApp] = useState(false)

  console.log('showRealApp: ', showRealApp)

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <NewLogo style={styles.logo}/>
        <Text style={styles.title}>{item.title}</Text>
        {item.image}
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }

  const onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    console.log('onDone running!')
    setShowRealApp(true);
  }  

  const renderDoneButton = () => {
    //"rgba(255, 255, 255, .9)"
    return (
      <TouchableOpacity onPress={() => onDone()}>
        <View style={styles.buttonCircle}>
          <Icon
            name="md-checkmark"
            color='black'
            size={24}
          />
        </View>
      </TouchableOpacity>
    );
  };

  try {
    // your code SENTRY

  const [session, setSession] = useState()


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      session ? setShowRealApp(true) : null
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      session ? setShowRealApp(true) : null
    })
  }, [])

  // transparent header: options={{headerTransparent: true}}  

  if (showRealApp || session) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <NativeBaseProvider style={styles.container}>
            <Drawer.Navigator
              screenOptions={{
                header: ({ navigation, route }) => {
                  const title = getHeaderTitle(route.name);
                  return <Header title={title} navigation={navigation}/>;
                },
                drawerPosition: 'left',
                headerRight: () => <Header/>,
                overlayColor: 'transparent',
                headerTransparent: true,
              }}
            > 
              <Drawer.Screen name="Home" component={Home}/>
              <Drawer.Screen name="LogIn" component={LogIn} />
              <Drawer.Screen name="Choose" component={PhraseSelector} />
              <Drawer.Screen name="Build" component={Words} />
              <Drawer.Screen name="Phrasebook" component={Phrasebook} />
            </Drawer.Navigator>
          </NativeBaseProvider>
        </NavigationContainer>
      </GestureHandlerRootView>  
    );
  } 
  else {
    return <AppIntroSlider renderItem={renderItem} data={slides} onDone={onDone} renderDoneButton={renderDoneButton}/>;
  }  

  } catch (error) {
    Sentry.Native.captureException(error);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeContainer: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center' 
  },
  linearGradient: {
    position: 'absolute',
    height: PAGE_HEIGHT,
    left: 0,
    right: 0,
    top: 0,    
  },
  buttonStyle: {
    position: 'absolute',
    top: 20,
    right: PAGE_WIDTH/2,
    zIndex: 1,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // styling for intro slides 
  title: {
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
    width: PAGE_WIDTH/1.5,
    marginBottom: PAGE_HEIGHT/10,
    marginTop: PAGE_HEIGHT/30,
  },
  logo: {
    position: 'absolute',
    top: PAGE_HEIGHT/10,    
  },
  text: {
    color: 'white',
    textAlign: 'center',
    display: 'flex',
    marginTop: PAGE_HEIGHT/20,
    alignItems: 'center',
    width: PAGE_WIDTH/1.5,
    fontWeight: '400',
    fontSize: 26,
  },
  slide: {
    backgroundColor: '#3499FE',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',    
    height: PAGE_HEIGHT,
    width: PAGE_WIDTH,

  }

})