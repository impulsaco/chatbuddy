import React from "react";
import { View, TouchableOpacity, Button, Text, StyleSheet} from "react-native";
import Plus from "../../assets/Plus.svg";

const EmptySentence = ( {navigation} ) => {

     // For translations
    // onPress={() => {navigation.navigate('Build', {wordSet: introductionList, lang: lang, langCode: langCode}); setMenuVisible(true)}}
    return (
        <View style={{width : '100%'}}>
            <TouchableOpacity style={styles.sentenceCard}>
                <Plus/>
                <Text style={styles.textLight}>Tap to add!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    sentenceCard: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: '#FFC107',
        backgroundColor: 'rgba(197, 197, 197, 0.75);',
        borderWidth: 1,
        borderRadius: 10,
        position: 'relative',
        width: 359,
        height: 64,
        margin: 10,
    }, 
    text: {
        fontSize: 16,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#030303',
        
    },
    textLight: {
        fontSize: 16,
        height: 18,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        marginTop: 10,
        
    },
})

export default EmptySentence