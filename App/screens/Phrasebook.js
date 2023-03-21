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
import { useActionSheet } from '@expo/react-native-action-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const Phrasebook = ({route}) => {

    // State for phrases

    const [sentences, setSentences] = useState([])

    const [translations, setTranslations] = useState(true)


    // State for language picker

    const [selectedLanguage, setSelectedLanguage] = useState("Spanish");
        
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
            .select('id, sentence, language, lang_code, type, translation')
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

  // Action sheet

  const { showActionSheetWithOptions } = useActionSheet();

  const onPress = () => {    
    let options = langs    
    options.push('Cancel');
    const cancelButtonIndex = options.length - 1;

    showActionSheetWithOptions({
      options,
      cancelButtonIndex
    //  destructiveButtonIndex
    }, (selectedIndex: number) => {
      switch (selectedIndex) {

        case 0:
          // Save
          setSelectedLanguage(options[selectedIndex])
          break;

        case 1:
          // Save
          setSelectedLanguage(options[selectedIndex])
          break;

       // case destructiveButtonIndex:
          // Delete
          //break;

        default:
            for (let i = 2; i < options.length; i++) {
                if (selectedIndex === i) {
                    setSelectedLanguage(options[i]);
                    break;
                }
            }
            break;

        case cancelButtonIndex:
            break;
          // Canceled
      }});
  }  
    
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
                <View style={styles.topContainer}>
                    <View style={styles.pickerContainer}>
                        <TouchableOpacity onPress={() => onPress()}>
                            <Text style={styles.pickerText}>{selectedLanguage}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.switchContainer}>                                        
                        <Text style={styles.pickerText}>Eng: </Text>
                        <Switch
                            value={translations}
                            color={'#FFC107'}
                            onValueChange={(value) => setTranslations(value)}
                        />
                    </View> 
                </View>
                <DraxProvider>
                    <View style={styles.scrollLimit}>
                        <DraxScrollView style={styles.sentenceContainer}>
                            {sentences.filter ? sentences.filter(obj => {return obj.language === selectedLanguage})
                            .map((sentence) => 
                            <SentenceCard 
                                key = {sentence.id} 
                                sentence={sentence.sentence} 
                                translation={sentence.translation} 
                                translations={translations}
                            />) : null}
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
 topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
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
pickerText: {    
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
},
pickerContainer: {
    backgroundColor: 'transparent',
    borderColor: '#FFC107',
    borderWidth: 1,
    width: PAGE_WIDTH*.4,
    height: 50,   
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
},
});

export default Phrasebook;