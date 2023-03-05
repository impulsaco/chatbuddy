import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions} from "react-native";
import { Button } from "@rneui/themed"
import { supabase, supabaseUrl} from '../lib/supabase';
import googleTranslate from '../lib/googleTranslate';
import SaveBanner from "../../assets/saveBanner.svg"
import { TouchableOpacity } from 'react-native-gesture-handler';

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;


const SaveButton = ({sentence, savedSentence, sentenceChecked, setSentenceChecked, sentenceEn, langCode, sentenceSaidPercentage}) => {

    // Retrieve user session

    const [session, setSession] = useState()

    const [sentenceSaved, setSentenceSaved] = useState(false)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })
    }, [])

    async function saveSentence() {

        const { error } = await supabase
        .from('sentences')
        .insert({ 
            created_at: new Date().toISOString(), 
            user: session.user.id, 
            sentence: savedSentence, 
            language: langCode, 
            type: "basic", 
            blocks: sentence,
            translation: sentenceEn
            }
        )

        if (error) alert(error.message)

        setSentenceSaved(true)
    }

    const saveBanner = () => {
        if (sentenceSaved === false) {
            return (
                <TouchableOpacity style={styles.saveButton} onPress={() => saveSentence()}>
                    <SaveBanner/>
                    <Text style={[styles.smallText, { paddingLeft: 10} ]}>Save it!</Text>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity style={styles.saveButton}>
                    <SaveBanner style={[{fill: 'white'}]}/>
                    <Text style={[styles.smallText, { paddingLeft: 10} ]}>Saved!</Text>
                </TouchableOpacity>                
            )
        }
    }
    
        

    return (
        <View>
            {saveBanner()}
        </View>        
    )
    /*    } 
        else {
            return (
                <TouchableOpacity style={styles.saveButton} onPress={() => saveSentence()}>
                    <SaveBanner style={[{fill: 'white'}]}/>
                    <Text style={[styles.smallText, { paddingLeft: 10} ]}>Saved!</Text>
                </TouchableOpacity>
            )
        }
    }*/

    //saveButton()
    /*useEffect (() => {
        saveButton()
    }, [sentenceSaved])*/

}

const styles = StyleSheet.create({
    saveButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: PAGE_WIDTH*.5,

        backgroundColor: "#2E92F0",
        borderRadius: 10,
    },
    smallText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#FFFFFF',        
    },
})


export default SaveButton