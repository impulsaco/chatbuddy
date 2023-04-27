import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, Modal, Text, StyleSheet, Dimensions} from "react-native";
import Plus from '../../assets/Plus.svg'
import { Button } from "@rneui/themed"
import Close from '../../assets/close.svg'
import googleTranslateWord from '../lib/googleTranslateWord';
import { supabase } from '../lib/supabase';

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const AddWord = ({ type, setUserWords, userWords, langCode, style }) => {

    // Create variables for modal

    const [modalVisible, setModalVisible] = useState(false)
    const [text, setText] = useState('');

    // Retrieve user session

    const [session, setSession] = useState()

    let height = 54

    if (langCode === "ko" || langCode === "bg") {
        height = PAGE_HEIGHT*.09
    }
    else {
        height = PAGE_HEIGHT*.06
    }

    /*useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })
    }, [])

    // Update words in backend

    async function saveWord() {
        console.log("user is ", session.user.id)

        console.log("userWords is ", userWords)

        if (langCode === "ko") {
            const { error } = await supabase
            .from('userData')
            .update({ 
                wordsKo: userWords
                }
            ).eq('user', session.user.id)
            if (error) alert(error.message)
          }
        if (langCode === "es") {
            console.log("creating new spanish word")            
            const { error } = await supabase
            .from('profiles')
            .update({ wordsEs: userWords})
            .eq('id', session.user.id)
            if (error) alert(error.message)
        }        
    } */

    // Adds the word on button press
    const addWord = async (word) => {
            let id = userWords.length + 100000 // makes sure IDs do not clash with preloaded words
            let translation = await googleTranslateWord(word, langCode)
            let wordToAdd = {id: id, word: translation, type:type, translation: word} 
            setUserWords(userWords => [...userWords, wordToAdd]);
            // saveWord();
            setModalVisible(false)
    }

    

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.plusCard, style, { height: height }]} onPress={() => setModalVisible(true)} >
                    <Plus style={[{fill: 'black'}]}/>
                </TouchableOpacity>
            </View>
            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modalContainer}> 
                    <View style={styles.topContainer}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Close/>
                        </TouchableOpacity>                        
                    </View>
                    <Text style={styles.bigText}>Add a new word</Text>
                    <Text style={styles.lightText}>{"(we'll translate it for you!)"}</Text>
                    <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={text => setText(text)}
                    placeholder="Enter text"
                    placeholderTextColor="#B7B7B7"
                    />
                    <Button 
                        title="Submit" 
                        buttonStyle={{ backgroundColor: '#FFC107' }}
                        onPress={() => addWord(text)}
                        >
                            ADD
                    </Button>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width : '100%'
    },  
    plusCard: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderColor: '#58AFFF',
        backgroundColor: '#CFCFCF',
        borderWidth: 1,
        borderRadius: 10,
        position: 'relative',
        width: PAGE_WIDTH*.22,
        //height: height,
        margin: 10,
    }, 
    text: {
        fontSize: 12,
        height: 13,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#030303',
        
    },
    bigText: {
        fontSize: 25,
        height: 30,
        alignItems: 'center',
        textAlign: 'center',
        color: "white"
    },
    lightText: {
        fontSize: 25,
        height: 30,
        alignItems: 'center',
        textAlign: 'center',
        color: "#838383"
    },
    textLight: {
        fontSize: 10,
        height: 13,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#B7B7B7',
        marginTop: 10,
        
    },
    input: {
        height: 30,
        width: PAGE_WIDTH*.4,
        backgroundColor: "white",
        borderColor: "#FFC107",
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginVertical: 20
    },
    modalContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        gap: 10,
        
        position: 'absolute',
        height: PAGE_HEIGHT/3.5,
        width: PAGE_WIDTH*.8,
        top: PAGE_HEIGHT/3,
        left: PAGE_WIDTH/10,

        backgroundColor: "#121212",
        borderColor: "#2E93F2",
        borderWidth: 2,
        borderRadius: 20
    },
    topContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 10,
        width: PAGE_WIDTH*.8,        
    },
})

export default AddWord