import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, Modal, Text, StyleSheet, Dimensions} from "react-native";
import Shuffle from '../../assets/Shuffle.svg'
import { Button } from "@rneui/themed"
import Close from '../../assets/close.svg'
import googleTranslateWord from '../lib/googleTranslateWord';
import { supabase } from '../lib/supabase';

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const AddWord = () => {
    

    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.shuffleCard} >
                    <Shuffle/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width : '100%'
    },  
    shuffleCard: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderColor: '#58AFFF',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        position: 'relative',
        width: PAGE_WIDTH*.3,
        height: 54,
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
        color: "#000000"
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
})

export default AddWord