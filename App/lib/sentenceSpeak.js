import * as Speech from 'expo-speech';

const sentenceSpeak = (say, langCode) => {
    Speech.speak(say, {language: langCode});
};

export default sentenceSpeak