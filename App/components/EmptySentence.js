import React from "react";
import { View, TouchableOpacity, Button, Text, StyleSheet, Dimensions} from "react-native";
import Plus from "../../assets/Plus.svg";
import introductionList from '../wordsets/introductionList';
import hobbiesList from '../wordsets/hobbiesList';
import basicList from '../wordsets/basicList';
import familyList from '../wordsets/familyList';

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

const EmptySentence = ( {navigation, type, lang, langCode, setMenuVisible} ) => {        
    const destination = (type) => {
        if (type === 'introduction') {
            return introductionList
        } else if (type === 'hobbies') {
            return hobbiesList
        } else if (type === 'basic') {
            return basicList
        } else if (type === 'family') {
            return familyList
        }
    }
     // For translations
    // 
    return (
        <View style={{width : '100%'}}>
            <TouchableOpacity style={styles.sentenceCard} onPress={() => {navigation.navigate('Build', {wordSet: destination(type), lang: lang, langCode: langCode}); setMenuVisible(true)}}>
                <Plus style={[{fill: 'white'}]}/>
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
        backgroundColor: 'rgba(197, 197, 197, 0.75);',
        borderRadius: 10,
        position: 'relative',
        width: PAGE_WIDTH*.87,
        height: PAGE_HEIGHT * 0.075,
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