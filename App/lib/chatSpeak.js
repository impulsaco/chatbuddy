import * as Speech from 'expo-speech';

const chatSpeak = (say, langCode) => {
    console.log("speaking: " + say + " in " + langCode)
    Speech.speak(say, {language: langCode, rate: 1, quality : "VoiceQuality.Enhanced", voice: "com.apple.ttsbundle.siri_female_en-US_compact"});
};

export default chatSpeak