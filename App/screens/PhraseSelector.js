import { View, StyleSheet, Dimensions, Text, TouchableOpacity} from 'react-native';
import React, { useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient'
import { Button } from '@rneui/themed'
import { supabase } from '../lib/supabase';
import freeformList from '../wordsets/freeformList';
import introductionList from '../wordsets/introductionList';
import hobbiesList from '../wordsets/hobbiesList';
import basicList from '../wordsets/basicList';
import familyList from '../wordsets/familyList';
import hometownList from '../wordsets/hometownList';
import feelingsList from '../wordsets/feelingsList';
import exclamationsList from '../wordsets/exclamationsList';
import { border } from 'native-base/lib/typescript/theme/styled-system';
import placesList from '../wordsets/placesList';

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;


function PhraseSelector({navigation, setMenuVisible, route}) {

    // Set up word lists 

    // create state with words

    console.log("setMenuVisible in <PhraseSelector> is", setMenuVisible)

    /* const [lang, setLang] = useState(route.params.lang)
    const [langCode, setLangCode] = useState(route.params.langCode)

    useEffect(() => {
        setLang(route.params.lang)
        setLangCode(route.params.langCode)
    }, [route.params]) */


    // Set up state for sentence   

    const renderButtons = () => { 
        return (
            <View style={styles.mainContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.mainText}>What do you want to say?</Text>
                </View>     
                <View style={styles.buttonsContainer}>
                    <View style={styles.phrasebookContainer}>
                        <TouchableOpacity style={styles.phrasebookButton} onPress={() => {navigation.navigate('Build', {wordSet: exclamationsList}); setMenuVisible(true)}}>
                          <Text style={styles.buttonText}>One word basics 🚀</Text>
                        </TouchableOpacity>
                    </View>                    
                    <View style={styles.phrasebookContainer}>
                        <TouchableOpacity style={styles.phrasebookButton} onPress={() => {navigation.navigate('Build', {wordSet: hometownList}); setMenuVisible(true)}}>
                          <Text style={styles.buttonText}>Where you're from 🌍</Text>
                        </TouchableOpacity>
                    </View>                    
                    <View style={styles.phrasebookContainer}>
                        <TouchableOpacity style={styles.phrasebookButton} onPress={() => {navigation.navigate('Build', {wordSet: introductionList}); setMenuVisible(true)}}>
                          <Text style={styles.buttonText}>Jobs & studies 💼</Text>
                        </TouchableOpacity>
                    </View>                    
                    <View style={styles.phrasebookContainer}>
                        <TouchableOpacity style={styles.phrasebookButton} onPress={() => {navigation.navigate('Build', {wordSet: feelingsList}); setMenuVisible(true)}}>
                          <Text style={styles.buttonText}>Feelings 😃</Text>
                        </TouchableOpacity>
                    </View>            
                    <View style={styles.phrasebookContainer}>
                        <TouchableOpacity style={styles.phrasebookButton} onPress={() => {navigation.navigate('Build', {wordSet: familyList}); setMenuVisible(true)}}>
                          <Text style={styles.buttonText}>Family 🏡</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.phrasebookContainer}>
                        <TouchableOpacity style={styles.phrasebookButton} onPress={() => {navigation.navigate('Build', {wordSet: hobbiesList}); setMenuVisible(true)}}>
                          <Text style={styles.buttonText}>Hobbies 🎨</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.phrasebookContainer}>
                        <TouchableOpacity style={styles.phrasebookButton} onPress={() => {navigation.navigate('Build', {wordSet: placesList}); setMenuVisible(true)}}>
                          <Text style={styles.buttonText}>Places📍</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.phrasebookContainer}>
                        <TouchableOpacity style={styles.phrasebookButton} onPress={() => {navigation.navigate('Build', {wordSet: freeformList}); setMenuVisible(true)}}>
                          <Text style={styles.buttonText}>Anything 🤯</Text>
                        </TouchableOpacity>
                    </View>                    
                </View>
            </View>
        )
    } 
  
    return (
      <View >
        <LinearGradient 
        colors={['#319CFF', '#319CFF']}
        locations={[0, .99]}
        style={styles.linearGradient}
        />
        <View style={styles.bottomContainer}>                    
          {renderButtons()}
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    topContainer: {
      flex: 1,
      paddingTop: PAGE_HEIGHT/10,      
    },
    linearGradient: {
      position: 'absolute',
      height: PAGE_HEIGHT*1.5,
      left: 0,
      right: 0,
      top: 0,    
    },
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', 
      padding: 20,
      marginTop: PAGE_HEIGHT/5,
    },
    bottomContainer: {
      display: 'flex',
      padding: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT*.8
  },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: PAGE_WIDTH*.8,
    },
    mainText: {
      fontSize: 42,
      color: "white",
      textAlign: 'center',
     },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 10
    },
    buttonText: {
      fontSize: 16,
      color: "black"
    },
    phrasebookContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    phrasebookButton: {
      display: 'flex',
      flex: 2,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      width: PAGE_WIDTH*.45,
      height: PAGE_HEIGHT*.05,
      margin: 10
    },
    logOutContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 10
    },      
  })

export default PhraseSelector