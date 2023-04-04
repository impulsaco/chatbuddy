import React from "react";
import { View, TouchableOpacity, Button, Text, StyleSheet, Dimensions} from "react-native";

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const WordCard = ( {word, translations, menu} ) => {

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

    const Romanization = () => {
        if (word.id >= 0 && word.romanized) {                        
            return (
                <Text style={styles.textRom}>{word.romanized}</Text>
            )
        }
        else {
            return (
                null
            )
        }
    }

    let varHeight

    if (!menu) {
        varHeight = null
    }

    else {
        varHeight = PAGE_HEIGHT*.06
    }

    // Sets word type color

    const borderColor = (type) => {
        if (type === "noun") {
            return "#FFC107"
        }
        else if (type === "verb") {
            return "#4CAF50" 
        }
        else if (type === "adjective") {
            return "#FF5722"
        }
        else if (type === "subject") {
            return "#2196F3"
        }
    }

    const backgroundColor = (type) => {
        if (type === "noun") {
            return "#FFF3E0"
        }
        else if (type === "verb") {
            return "#E8F5E9" 
        }
        else if (type === "adjective") {
            return "#FFE0B2"
        }
        else if (type === "subject") {
            return "#E3F2FD"
        }
    }

    return (
        <View style={{width : '100%'}}>
            <TouchableOpacity style={[styles.wordCard, {borderColor: borderColor(word.type), height: varHeight, backgroundColor: backgroundColor(word.type)} ]}> 
                <Text style={styles.text}>{word.word}</Text>
                {Romanization()}
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
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 10,
        position: 'relative',
        width: PAGE_WIDTH*.22,
        //height: PAGE_HEIGHT*.06,
        margin: 10,
        
    }, 
    text: {
        fontSize: 13,
        height: 17,
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#030303',

        margin: 5
        
    },
    textLight: {
        fontSize: 13,
        height: 15,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#B7B7B7',
        margin: 5,
        
    },
    textRom: {
        fontSize: 13,
        height: 15,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#B7B7B7',
        margin: 5,
        fontStyle: 'italic',
        
    },
})

export default WordCard