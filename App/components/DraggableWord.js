import { StyleSheet, Platform } from "react-native";
import WordCard from "./WordCard";
import Draggable from "react-native-draggable";
import { DraxProvider, DraxView, DraxList } from "react-native-drax";
import { TouchableOpacity } from "react-native-gesture-handler";

import { logger } from "@app/utils/logger";

const styles = StyleSheet.create({
  dragging: {
    opacity: 0.1,
  },
  sentenceWord: {
    borderColor: "#030303",
  },
});

const DraggableWord = ({
  word,
  translations,
  sentence,
  setSentence,
  setForward,
}) => {
  // sentence updater for on tap change for Android
  updateSentence = (wordTapped) => {
    logger.debug("tapped!", wordTapped);
    let newSentence = [...sentence];
    let index = sentence.findIndex((item) => item.type === wordTapped.type);
    newSentence[index] = wordTapped;
    setSentence(newSentence);

    const wordList = sentence.map((item) => item.type);
    // NAVIGATE TO NEXT WORD SET
    logger.debug("wordList Android is ", wordList);

    if (wordList.includes(wordTapped.type)) {
      let wordListIndex = wordList.indexOf(wordTapped.type);
      console.log("wordList.length Android", wordList.length);
      console.log("index Android", wordListIndex);
      if (wordListIndex + 1 < wordList.length) {
        setForward(wordList[index + 1]);
      }
    }
  };
  // delete comment to re-activate drag
  /* if (Platform.OS === 'ios') {
        return (
            <DraxView
                draggingStyle={styles.dragging}
                onDragStart={() => {
                    console.log('word being dragged is ', word.word);
                }}
                payload= { word }
                onReceiveDragEnter={({ dragged: { payload } }) => {
                    console.log(`hello ${payload}`);
                }}
                onReceiveDragExit={({ dragged: { payload } }) => {
                    console.log(`goodbye ${payload}`);
                }}
                onReceiveDragDrop={({ dragged: { payload } }) => {
                    console.log(`received ${payload}`);
                }}
            >
                <WordCard 
                    word = { word } style={styles.sentenceWord}                    
                    translations = { translations }
                />
            </DraxView>
        )
    }

    else if (Platform.OS === 'android') { */
  return (
    <TouchableOpacity onPress={() => updateSentence(word)}>
      <WordCard
        style={[{ borderColor: "#FFC107" }]}
        word={word}
        translations={translations}
        menu={false}
      />
    </TouchableOpacity>
  );
  // }
};

export default DraggableWord;
