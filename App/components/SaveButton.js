import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput} from "react-native";
import { Button } from "@rneui/themed"
import { supabase, supabaseUrl} from '../lib/supabase';
import googleTranslate from '../lib/googleTranslate';


const SaveButton = ({sentence, savedSentence, sentenceChecked, setSentenceChecked, sentenceEn, langCode, sentenceSaidPercentage}) => {

    // Retrieve user session

    const [session, setSession] = useState()

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

        // setSentenceChecked(false)
    }
   // if (sentenceChecked===true && sentenceSaidPercentage>.1) { // Allow save if sentence is checked and user has said at least 10% of the sentence

    if (sentenceSaidPercentage>.1) { // Allow save if sentence is checked and user has said at least 10% of the sentence
        return (
            <Button buttonStyle={{ backgroundColor: '#FFC107' }} onPress={saveSentence}>Save</Button>
        )
    }

    else {
        return (
            <Button buttonStyle={{ backgroundColor: '#B7B7B7' }}>Save</Button>
        )
    }
}

export default SaveButton