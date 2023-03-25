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
import EmptySentence from '../components/EmptySentence';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const Phrasebook = ({navigation, route}) => {

    //console.log("route.params in <Phrasebook> is", route.params)

    let setMenuVisible;
    
    if (route.params?.setMenuVisible) {
        setMenuVisible = route.params.setMenuVisible;
    }
    
    

    // State for phrases

    const [sentences, setSentences] = useState([])

    const [translations, setTranslations] = useState(true)

    const emptySentences = 5


    // State for language picker (not to be confused with selectedLang, which specifies initial general state)

    const [selectedLanguage, setSelectedLanguage] = useState();
    const [selectedLangCode, setSelectedLangCode] = useState();

    useEffect(() => {
        setSelectedLanguage(route.params.lang)
        setSelectedLangCode(route.params.langCode)
    }, [route.params])
        
    const [langs, setLangs] = useState([])
    const [langCodes, setLangCodes] = useState([])

    const [types, setTypes] = useState([
        {name: "introduction", label: "Self-introduction", unfilled: emptySentences}, 
        {name: "hobbies", label: "Hobbies", unfilled: emptySentences}, 
        {name: "family", label: "Family", unfilled: emptySentences},
        {name: "basic", label: "Anything!", unfilled: emptySentences}
    ])
  // Retrieve session

  const [session, setSession] = useState()

  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  
  // Fetch sentences based on session

  const fetchSentences = async () => {
    if (session) {
        const { data, error } = await supabase
        .from('sentences')
        .select('id, sentence, language, lang_code, type, translation, blocks')
        .eq('user', session.user.id)
        .not("translation","is", null);
    
        if (error) alert(error.message)
    
        if (data) {
            setSentences(data)      
            setTypes([
                {name: "introduction", label: "Introduce myself 👋", unfilled: emptySentences - data.filter(obj => {return obj.type === "introduction" && obj.language === selectedLanguage}).length}, 
                {name: "family", label: "My family 🏡", unfilled: emptySentences - data.filter(obj => {return obj.type === "family" && obj.language === selectedLanguage}).length},
                {name: "hobbies", label: "Hobbies 🎨", unfilled: emptySentences - data.filter(obj => {return obj.type === "hobbies" && obj.language === selectedLanguage}).length}, 
                {name: "basic", label: "Anything 🤯", unfilled: emptySentences - data.filter(obj => {return obj.type === "basic" && obj.language === selectedLanguage}).length}
            ])
            setLangs(Array.from(new Set(data.map(({ language }) => language))))
            setLangCodes(Array.from(new Set(data.map(({ lang_code }) => lang_code))))
        }
    }
  }
  //console.log("types are", types)
  //console.log("selectedLanguage is", selectedLanguage)

  useEffect(() => {  
    fetchSentences()
  }, [session, sentences, selectedLanguage, selectedLangCode])

  // Count types of each sentence

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
          setSelectedLangCode(langCodes[selectedIndex])
          break;

        case 1:
          // Save
          setSelectedLanguage(options[selectedIndex])
          setSelectedLangCode(langCodes[selectedIndex])
          break;

       // case destructiveButtonIndex:
          // Delete
          //break;

        default:
            for (let i = 2; i < options.length; i++) {
                if (selectedIndex === i) {
                    setSelectedLanguage(options[i]);
                    setSelectedLangCode(langCodes[i-2])
                    break;
                }
            }
            break;

        case cancelButtonIndex:
            break;
          // Canceled
      }});
  }  

  // Render sentences

  const renderSentences = (type) => {
    //console.log("sentences HERE are ", sentences)
    //console.log("type here is", type)
        return (
            sentences.filter ? sentences.filter(obj => {return obj.language === selectedLanguage && obj.type === type})
            .map((sentence) => 
            <SentenceCard 
                key = {sentence.id}
                id = {sentence.id}
                sentence={sentence.sentence} 
                translation={sentence.translation} 
                blocks={sentence.blocks}
                type={type}
                langCode={selectedLangCode}
                translations={translations}
                session={session}
            />) : null
        )
    }
    

    // Render unfilled
    const renderUnfilled = (type, selectedLang, selectedLangCode, setMenuVisible) => {
        //console.log("selectedlang is", selectedLang)
        //console.log("selectedlangcode is", selectedLangCode)
        const cards = []
        //for (let i = 0; i < type.unfilled; i++) {
        if (type.unfilled > 0) {
            cards.push(
                <EmptySentence navigation={navigation} type={type.name} lang={selectedLang} langCode={selectedLangCode} setMenuVisible={setMenuVisible}/>                
            )
        }
        return cards
    }

    const sentenceCounter = (unfilled) => {
        if (unfilled === emptySentences) {
            return (
                <Text style={[styles.typeText, { color: "red"} ]}>{` (${(emptySentences-unfilled)}/${emptySentences})`}</Text>
            )
        }
        if (unfilled <= 0) {
            return (
                <Text style={[styles.typeText, { color: "green"} ]}>{` (${(emptySentences-unfilled)}/${emptySentences}) 🏅`}</Text>
            )
        }
        else {
            return (
                <Text style={[styles.typeText, { color: "orange"} ]}>{` (${(emptySentences-unfilled)}/${emptySentences})`}</Text>
            )
        }
        
    }

  //console.log("sentences", sentences)
    
 return (  
    <View style={styles.container}>      
        <View style={styles.container}>
            <LinearGradient 
            colors={['#3499FE', '#3499FE']}
            locations={[0, .99]}
            style={styles.linearGradient}
            />
            <Header />
            <View style={styles.topContent}>
                <Text style={styles.mainText}>
                Your phrasebook
                </Text>
                <View style={styles.topContainer}>
                    <TouchableOpacity style={styles.pickerContainer} onPress={() => onPress()}>
                        <View>
                            <Text style={styles.pickerText}>{selectedLanguage}</Text>
                        </View>
                    </TouchableOpacity>
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
                            {types.map((type, index) => {
                                return (
                                    <View key={index}>
                                        <View style={styles.counterContainer}>
                                            <Text style={styles.typeText}>{type.label}</Text>
                                            {sentenceCounter(type.unfilled)}
                                        </View>
                                        {renderSentences(type.name)}
                                        {renderUnfilled(type, selectedLanguage, selectedLangCode, setMenuVisible)}
                                    </View>
                                )
                            })}
                            {renderSentences("introduction")}
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
 typeText: {
    fontSize: 18,
    color: "white",
    fontWeight: 'bold',
 },
 counterContainer: {
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
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
}

});

export default Phrasebook;