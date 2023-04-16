import React, { useState, useEffect, useContext } from 'react';
import { Switch } from "@rneui/themed";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from "react-native";
import SentenceWord from '../components/SentenceWord';
import SayItButton from '../components/SayItButton';
import AnalyzeWord from '../components/AnalyzeWord';
import Refresh from '../../assets/Refresh.svg';
import sentenceSpeak from '../lib/sentenceSpeak';
import Sound from '../../assets/Sound.svg';
import SentenceTest from '../lib/SentenceTest';
import SentenceFixer from '../lib/SentenceFixer';
import VoiceRecord from '../components/VoiceRecord';
import TranslationOn from '../../assets/translationOn.svg';
import TranslationOff from '../../assets/translationOff.svg';
import { SessionContext } from '../lib/SessionContext';
import { supabase } from '../lib/supabase';
import {GiftedChat} from 'react-native-gifted-chat';



const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const VoiceChat = ({ 
    newMessage,
    }) => {

    return (
        <View>
            <Text>{newMessage}</Text>
        </View>
    )    
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    bottomContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        distributeContent: 'evenly',
        paddingBottom: PAGE_HEIGHT*0.03,
        width: PAGE_WIDTH*0.8,

    },
    buttonContainer: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 0,
    },
    switchContainer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 0,
    },
    topSentence: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    soundButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    refreshContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 10,
    },
    sentenceContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        paddingTop: 40,
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: PAGE_WIDTH*0.8,
        paddingBottom: PAGE_HEIGHT*0.03,

    },
    text: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',            
    },
    sentenceText: {
        fontSize: 36,
        color: 'white',
        textAlign: 'center',            
    },
    translationText: {
        fontSize: 20,
        marginTop: 5,
        color: '#B7B7B7',
        marginBottom: 15,
    },
    
    romanizationText: {
        fontSize: 20,
        marginTop: 0,
        color: 'white',
        fontStyle: 'italic',
        marginBottom: 5,
    },
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '33%'
    },
    draggable: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
    },
    dragging: {
        opacity: 0.1,
    },
    sentenceAnalyzed: {
        flexDirection: 'row',
    },
  })

export default VoiceChat;