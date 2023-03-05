import React from "react";
import { View, TouchableOpacity, Button, Text, StyleSheet, Dimensions} from "react-native";

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const WordCard = ( {word, translations} ) => {

    // Toggles word translations
    const WordTranslations = () => {
        if (translations === true && word.id >= 0) {
            return (
                <Text style={styles.textLight}>{word.translation}</Text>
            )
        }
        else if (translations === false && word.id >= 0) {
            return (
                <Text style={styles.textLight}>{" "}</Text>
            )
        }
        else if (word.id < 0) {
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
        width: PAGE_WIDTH*.18,
        height: PAGE_HEIGHT*.06,
        margin: 10,
        
    }, 
    text: {
        fontSize: 13,
        height: 13,
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#030303',
        
    },
    textLight: {
        fontSize: 13,
        height: 15,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#B7B7B7',
        marginTop: PAGE_HEIGHT*.008,
        
    },
})

export default WordCard