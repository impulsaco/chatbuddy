import React from "react";
import { View, TouchableOpacity, Button, Text, StyleSheet} from "react-native";
import { Card } from "@rneui/themed";
import { DraxProvider, DraxView } from 'react-native-drax';

const WordCard = ( {word, translations} ) => {

    const WordTranslations = () => {
        if (translations === true) {
            return (
                <Text style={styles.textLight}>{word.translation}</Text>
            )
        }
        else {
            return (
                null
            )
        }
    }

    return (
        <View style={{width : '100%'}}>
            <TouchableOpacity style={styles.wordCard}>
                <Text style={styles.text}>{word.word}</Text>
                {WordTranslations()}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wordCard: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderColor: '#FFC107',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 10,
        position: 'relative',
        width: 72,
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

export default WordCard