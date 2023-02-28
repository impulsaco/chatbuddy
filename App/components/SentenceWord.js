import { StyleSheet } from "react-native";
import WordCard from "./WordCard";
import Draggable from 'react-native-draggable';
import { DraxProvider, DraxView, DraxList } from 'react-native-drax';


const styles = StyleSheet.create({
    dragging: {
        opacity: 0.1,
    },
    sentenceWord: {
        borderColor: '#030303',
    },
  })

const SentenceWord = ({word, index, words, sentence, setSentence, forward, setForward}) => {
    return (
        <DraxView
            draggingStyle={styles.dragging}
            onDragStart={() => {
                console.log('word being dragged is ', word);
            }}
            payload = { word }
            onReceiveDragEnter={({ dragged: { payload } }) => {
                console.log(`hello ${payload.word}`);
                console.log("now entering box number ", index)
            }}
            onReceiveDragExit={({ dragged: { payload } }) => {
                console.log(`goodbye ${payload.word}`);
            }}
            // on drop, update states and re-render:
            onReceiveDragDrop={({ dragged: { payload } }) => {
                console.log("word box type is ", word.type)
                console.log("sentence is", sentence)

                const wordList = sentence.map(item => item.type);
                // NAVIGATE TO NEXT WORD SET

                if (wordList.includes(word.type)) {
                    let index = wordList.indexOf((word.type))
                    console.log("wordList.length", wordList.length)
                    console.log("index", index)
                    if ((index + 1) < (wordList.length)) {                                            
                        setForward(wordList[index + 1])
                    }                    
                }


                console.log("received in SW ", payload);
                if (payload.type === word.type) {
                    let selected_item = words.filter(obj => {return obj.id === payload.id})[0];
                    console.log("word ID to look for is", payload.id)
                    console.log("selected item is ", selected_item)
                    let newSentence = [...sentence]
                    console.log("sentence box to update is ", newSentence[index])
                    newSentence[index] = payload
                    console.log("NEWsentence is NOW ", sentence) 
                    setSentence(newSentence)
                }
                else {
                    alert("Not the right box! " + word.type + " needed.")
                }
            }}
        >
            <WordCard
                word = { word } style={styles.sentenceWord}
            />
        </DraxView>
    )
}

export default SentenceWord