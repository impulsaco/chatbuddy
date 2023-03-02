import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, Modal, Text, StyleSheet, Dimensions} from "react-native";
import Plus from '../../assets/Plus.svg'
import Close from '../../assets/close.svg'
import googleTranslateWord from '../lib/googleTranslateWord';
import { supabase } from '../lib/supabase';
import BigMike from "../../assets/bigMike.svg"

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const SayModal = ({ sayVisible, setSayVisible }) => {

    console.log("sayVisible is", sayVisible)

    useEffect(() => {
    }, [sayVisible])

    // Create variables for modal

    const [topText, setTopText] = useState('Push the record button to practice your sentence!');
    const [bottomText, setBottomText] = useState('Say it!');


    return (
        <View>
            <Modal visible={sayVisible} transparent={true}>
                <View style={styles.modalContainer}> 
                    <View style={styles.topContainer}>
                        <TouchableOpacity onPress={() => setSayVisible(false)}>
                            <Close/>
                        </TouchableOpacity>                        
                    </View>
                    <View style={styles.smallTextContainer}>
                        <Text style={styles.smallText}>{topText}</Text>
                    </View>
                    
                    <TouchableOpacity style={styles.mikeContainer}>
                        <BigMike/>
                    </TouchableOpacity>

                    <View style={styles.bigTextContainer}>
                        <Text style={styles.bigText}>{bottomText}</Text>
                    </View>                                        
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width : '100%'
    },  
    smallText: {
        fontSize: 14,
        width: PAGE_WIDTH*.4,
        textAlign: 'center',
        color: '#FFFFFF',        
    },

    smallTextContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: PAGE_WIDTH*.7,
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
        padding: 10,
        width: PAGE_WIDTH*.8,
    },
    mikeContainer: {
        display: "flex",
        flex: 0.5,
        flexDirection: "column",
        justifyContent: "center",
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
        
        position: 'absolute',
        height: PAGE_HEIGHT/3,
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
        flex: 0.3,
        flexDirection: "column",        
        padding: 10,
        width: PAGE_WIDTH*.7,
    },
})

    

export default SayModal