import React, { useState, useEffect } from 'react';
import {
 StyleSheet,
 View,
 Text,
 Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { supabase } from '../lib/supabase';
import { Switch} from '@rneui/themed'
import Header from '../components/Header';
import { DraxProvider, DraxScrollView } from 'react-native-drax';
import SentenceCard from '../components/SentenceCard';


const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const Phrasebook = () => {

    const [sentences, setSentences] = useState([])

    const [translations, setTranslations] = useState(true)

    const [langs, setLangs] = useState([])


  // Retrieve session

  const [session, setSession] = useState()

  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [session])
  
  // Fetch sentences based on session

  useEffect(() => {

    const fetchSentences = async () => {
        if (session) {
            const { data, error } = await supabase
            .from('sentences')
            .select('id, sentence, language, type, translation')
            .eq('user', session.user.id)
            .not("translation","is", null);
        
            if (error) alert(error.message)
        
            if (data) {
                setSentences(data)
                setLangs(Array.from(new Set(data.map(({ language }) => language))))
            }
        }
    }

    fetchSentences()
  }, [session])
    
    
    
    //console.log(langs);

 return (  
    <View style={styles.container}>      
        <View style={styles.container}>
            <LinearGradient 
            colors={['#319CFF', '#319CFF']}
            locations={[0, .99]}
            style={styles.linearGradient}
            />
            <Header />
            <View style={styles.topContent}>
                <Text style={styles.mainText}>
                Your phrasebook
                </Text>
                <View style={styles.switchContainer}>
                    <Text style={styles.text}>Eng: </Text>
                    <Switch
                        value={translations}
                        color={'#FFC107'}
                        onValueChange={(value) => setTranslations(value)}
                    />
                </View> 
                <DraxProvider>
                    <View style={styles.scrollLimit}>
                        <DraxScrollView style={styles.sentenceContainer}>
                            {sentences.map((sentence) => <SentenceCard 
                            key = {sentence.id} 
                            sentence={sentence.sentence} 
                            translation={sentence.translation} 
                            translations={translations}
                            />)}
                        </DraxScrollView>
                    </View>
                </DraxProvider>
            </View>
        </View>
   </View>
 )
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems: 'center',
    display: 'flex',
},
scrollLimit: {
    height: PAGE_HEIGHT - 200,
    width: PAGE_WIDTH,
},
sentenceContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    //alignItems: 'center',
    display: 'flex',
    padding: 10,
    width: PAGE_WIDTH,
    //height: PAGE_HEIGHT,
},
 topContent: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
 },
 mainText: {
  fontSize: 54,
  color: "white",
 },
 text: {
    fontSize: 16,
    color: "white",
   },
 linearGradient: {
    position: 'absolute',
    height: PAGE_HEIGHT,
    left: 0,
    right: 0,
    top: 0,    
},
switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
},
});

export default Phrasebook;