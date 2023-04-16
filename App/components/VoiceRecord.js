import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, Modal, Text, StyleSheet, Dimensions} from "react-native";
import Close from '../../assets/close.svg'
import { supabase } from '../lib/supabase';
import VoiceChatWhisper from '../whisper/VoiceChatWhisper';
import SaveButton from './SaveButton';
import AudioPlayback from "../../assets/audioPlayback.svg"
import MicrophonePlayback from "../../assets/microphonePlayback.svg"
import Playback from "../../assets/playback.svg"
import sentenceSpeak from '../lib/sentenceSpeak';
import playRecording from '../lib/playRecording';
import Sound from '../../assets/Sound.svg'

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const VoiceRecord = ({ newMessage, setNewMessage }) => {
    
    const [topText, setTopText] = useState('Push to voice chat!');

    const [recordingUri, setRecordingUri] = useState(null);
    
    const [playSound, setPlaySound] = useState(null);

    const [closeVisible, setCloseVisible] = useState(true); // to prevent premature recording end

    // Load session

    const [session, setSession] = useState()

    useEffect(() => {

        supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
        })
    }, [])

    const closeButton = () => {
        if (closeVisible) {
            return (
                <TouchableOpacity onPress={() => close()}>
                    <Close/>
                </TouchableOpacity> 
            )
        }
        else {
            return (
                <View/>
            )
        }
    }

    return (
        <View style={styles.container}>
                <View style={styles.modalContainer}>                     
                    <View style={styles.bigTextContainer}>
                        <Text style={styles.bigText}>{topText}</Text>
                    </View>                                              
                    <TouchableOpacity style={styles.mikeContainer}>                    
                        <VoiceChatWhisper 
                        newMessage={newMessage} 
                        setNewMessage={setNewMessage}                 
                        setTopText={setTopText}                        
                        setRecordingUri={setRecordingUri}
                        setPlaySound={setPlaySound}
                        closeVisible={closeVisible}                       
                        setCloseVisible={setCloseVisible}
                        session={session}
                    />
                    </TouchableOpacity>                                                                              
                </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },  
    smallText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#FFFFFF',        
    },    
    smallTextContainer: {
        display: "flex",
        flex: 0.8,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: PAGE_WIDTH*.45,
    },
    bigText: {
        fontSize: 25,
        height: 30,
        textAlign: 'center',
        color: "#FFFFFF"
        
    },
    bigTextContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        width: PAGE_WIDTH*.8,

    },
    mikeContainer: {
        display: "flex",
        flex: 2,
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        padding: 10,
        width: PAGE_WIDTH*.8,

    },

    
    modalContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        gap: 10,
    
        backgroundColor: "#121212",
        borderColor: "#2E93F2",
        borderWidth: 2,
        borderRadius: 20
    },
    topContainer: {
        display: "flex",
        flex: 0.3,
        flexDirection: "column",        
        padding: 10,
        width: PAGE_WIDTH*.7,
    },
    playbackContainer: {
        flexDirection: "column",
        padding: 0,
        justifyContent: "space-evenly",
        alignItems: "center",
        width: PAGE_WIDTH*.4,
        height: PAGE_HEIGHT/9,
    },
    playbackButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 15,
        width: PAGE_WIDTH*.4,

    },
    playbackText: {
        fontSize: 16,
        color: "#2E92F0"
    },
    buttonsContainer: {
        flexDirection: "column",
        padding: 10,
        justifyContent: "space-evenly",
        alignItems: "center",
        width: PAGE_WIDTH*.5,
        height: PAGE_HEIGHT/7,

    },
    grayButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: PAGE_WIDTH*.5,

        backgroundColor: "#8B8B8B",
        borderRadius: 10,
    },
    blueButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: PAGE_WIDTH*.5,

        backgroundColor: "#2E92F0",
        borderRadius: 10,
    },
})

    

export default VoiceRecord