import { View, StyleSheet, Dimensions, Text} from 'react-native';
import React, { useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient'
import { Button } from '@rneui/themed'
import { supabase } from '../lib/supabase';

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
                  <Text style={styles.mainText}>Choose a language</Text>
                </View>     
                <View style={styles.buttonsContainer}>
                  <View style={styles.buttonContainer}>
                      <Button buttonStyle={{ backgroundColor: '#FFC107', marginRight: 30}} onPress={() => navigation.navigate('Choose', {lang: "Korean", langCode: "ko"})}>Korean</Button>            
                      <Button buttonStyle={{ backgroundColor: '#FFC107' }} onPress={() => navigation.navigate('Choose', {lang: "Spanish", langCode: "es-MX"})}>Spanish</Button>
                  </View>
                  <View style={styles.phrasebookContainer}>
                      <Button buttonStyle={{ backgroundColor: '#FFC107', width: 120}} onPress={() => navigation.navigate('Phrasebook')}>Phrasebook</Button>
                  </View>
                  <View style={styles.logOutContainer}>
                      <Button buttonStyle={{ backgroundColor: '#FFC107' }} onPress={() => supabase.auth.signOut()}>Log Out</Button>
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
      width: PAGE_WIDTH,
    },
    mainText: {
      fontSize: 54,
      color: "white",
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
      padding: 10
    },
    logOutContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 10
    },      
  })

export default Home