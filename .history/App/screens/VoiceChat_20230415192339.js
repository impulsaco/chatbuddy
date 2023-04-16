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
import { Keyboard } from 'react-native';



const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const VoiceChat = ({ 
    newMessage,
    }) => {

    const [messages, setMessages] = useState([]);
    
    
    useEffect(() => {

        console.log("newMessage UPDATED: ", newMessage)
        
        if (newMessage) {
            const newMessageData = {
                _id: Math.random().toString(36).substring(7),
                text: newMessage,
                createdAt: new Date(),
                user: {
                    _id: 1, // Replace with a unique identifier for the user
                    name: 'John Doe', // Replace with the user's name
                    avatar: 'https://placeimg.com/140/140/any', // Replace with the user's avatar URL
                },
              };
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessageData),
          );
        }
      }, [newMessage]);

    const onSend = (newMessages = []) => {
        const user = {
            _id: 1,
            name: 'John Doe',
            avatar: 'https://placeimg.com/140/140/any',
          };
          
          const newMessage = {
            _id: Math.random().toString(36).substring(7),
            text: newMessages[0].text,
            createdAt: new Date(),
            user: user,
          };
          
            Keyboard.dismiss();
          
        
          setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));
    };   
    
    return (
        <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
            _id: 1,
        }}
        keyboardShouldPersistTaps="never" // This prevents the keyboard from persisting after send
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
        bottomOffset={200}
        renderChatFooter={() => (
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
            />
        )}
        />
    );      
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