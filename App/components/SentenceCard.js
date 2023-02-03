import React from "react";
import { View, TouchableOpacity, Button, Text, StyleSheet} from "react-native";
import { Card } from "@rneui/themed";
import { DraxProvider, DraxView } from 'react-native-drax';
import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "react-native-dotenv"

// Set up GPT3

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);



const SentenceCard = ( {sentence, translation, translations} ) => {

     // For translations
    
    const sentenceTranslation = () => {
        if (translations === true && translation !== null) {
            return (
                <Text style={styles.textLight}>{translation}</Text>
            )
        }
        else {
            return (
                null
            )
        }
    }

    const gptResponse = (sentence) => {
        console.log("sentence  in GPT3 is ", sentence)
        openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Respond to the following sentence, in the language you identify: ${sentence}`,
          temperature: 0.7,
          max_tokens: 100,
        }).then(response => alert(response.data.choices[0].text.trim()))
    } 

    return (
        <View style={{width : '100%'}}>
            <TouchableOpacity onPress={() => gptResponse(sentence)} style={styles.sentenceCard}>
                <Text style={styles.text}>{sentence}</Text>
                {sentenceTranslation()}
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
        backgroundColor: '#FFFFFF',
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
        fontSize: 14,
        height: 18,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#B7B7B7',
        marginTop: 10,
        
    },
})

export default SentenceCard