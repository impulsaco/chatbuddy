import * as Speech from 'expo-speech';

const chatSpeak = (say, langCode) => {
    console.log("speaking: " + say + " in " + langCode)
    Speech.speak(say, {language: langCode, rate: 1});
};

export default chatSpeak