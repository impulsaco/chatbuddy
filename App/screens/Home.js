import { View, StyleSheet, Dimensions, Text, TouchableOpacity} from 'react-native';
import React, { useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient'
import { Button } from '@rneui/themed'
import { supabase } from '../lib/supabase';
import KoreanFlag from '../../assets/KoreanFlag.svg';
import SpanishFlag from '../../assets/SpanishFlag.svg';
import BulgarianFlag from '../../assets/BulgarianFlag.svg';

const PAGE_HEIGHT = Dimensions.get('window').height;

const PAGE_WIDTH = Dimensions.get('window').width;

function Home({navigation}) {

    // Retrieve session
      
    const [session, setSession] = useState()
      
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
  
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    /*const LanguageBox = ({lang, langCode, flag}) => {
        return (
            <TouchableOpacity style={styles.languageBox} onPress={() => navigation.navigate('Choose', {lang: lang, langCode: langCode})}>
                <Text style={styles.buttonText}>{lang}</Text>
                {flag}
            </TouchableOpacity>
        )
    }*/

    const renderButtons = () => { 
      
        if (!session?.user) {
          return (
            <View>
                <Button buttonStyle={{ backgroundColor: '#FFC107' }} onPress={() => navigation.navigate('LogIn', {session: session, setSession: setSession})}>Login</Button>
            </View>
            )
        }

        if (session?.user) {
          return (
            <View>
                <View style={styles.textContainer}>
                  <Text style={styles.mainText}>What would you like to learn?</Text>
                </View>     
                <View style={styles.buttonsContainer}>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.languageBox} onPress={() => navigation.navigate('Choose', {lang: "Korean", langCode: "ko"})}>
                      <Text style={styles.buttonText}>Korean</Text>
                      <KoreanFlag width={55}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.languageBox} onPress={() => navigation.navigate('Choose', {lang: "Spanish", langCode: "es-MX"})}>
                      <Text style={styles.buttonText}>Spanish</Text>
                      <SpanishFlag width={55}/>
                    </TouchableOpacity>                      
                  </View>
                  <View style={styles.lowerContainer}> 
                    <View style={styles.phrasebookContainer}>                    
                        <TouchableOpacity style={styles.phrasebookButton} onPress={() => navigation.navigate('Phrasebook')}>
                          <Text style={styles.buttonText}>My phrases</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.logOutContainer}>
                        <TouchableOpacity style={styles.logoutButton} onPress={() => supabase.auth.signOut()}>
                          <Text style={[styles.buttonText, {color: "white"}]}>Log out</Text>
                        </TouchableOpacity>                      
                    </View>
                  </View>
                </View>
            </View>
          )
        }
      } 
  
    return (
      <View style={styles.mainContainer}>
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
      height: PAGE_HEIGHT,
      left: 0,
      right: 0,
      top: 0,    
    },
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', 
      padding: 10
    },
    lowerContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    buttonText: {
      fontSize: 16,
      color: "black"
    },            
    languageBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      width: PAGE_WIDTH*.2,
      height: PAGE_HEIGHT*.1,
      margin: 10
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
    logoutButton: {
      display: 'flex',
      flex: 2,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 10,
      width: PAGE_WIDTH*.45,
      height: PAGE_HEIGHT*.05,
      margin: 10
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
      fontSize: 36,
      color: "white",
      textAlign: 'center',
     },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 10
    },
    phrasebookContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    logOutContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },      
  })

export default Home