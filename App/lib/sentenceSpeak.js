import * as Speech from 'expo-speech';

const sentenceSpeak = (say, langCode) => {
    Speech.speak(say, {language: langCode, rate: 1.00});
    Speech.speak(say, {language: langCode, rate: 0.75});
};

export default sentenceSpeak