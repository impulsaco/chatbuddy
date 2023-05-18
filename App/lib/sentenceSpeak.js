import * as Speech from "expo-speech";

const sentenceSpeak = (say, langCode) => {
  console.log("speaking: " + say + " in " + langCode);
  Speech.speak(say, { language: langCode, rate: 0.9 });
  Speech.speak(say, { language: langCode, rate: 0.5 });
};

export default sentenceSpeak;
