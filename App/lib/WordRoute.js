import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { DraxProvider, DraxScrollView } from 'react-native-drax';
import DraggableWord from '../components/DraggableWord';
import AddWord from '../components/AddWord';
import ShuffleWords from '../components/ShuffleWords';

const PAGE_HEIGHT = Dimensions.get('window').height;
const PAGE_WIDTH = Dimensions.get('window').width;

/// JUST MAKE ONE, THEN MAP ONTO TAB NAVIGATOR

const WordRoute = (type, setUserWords, userWords, langCode, words, translations, sentence, setSentence, setForward) => {
  return () => (
    <View style={styles.wordContainer}>
      <DraxScrollView contentContainerStyle={styles.dragContainer}>          
        <ShuffleWords type={type} setUserWords={setUserWords} userWords={userWords} langCode={langCode}/>
        <AddWord type={type} setUserWords={setUserWords} userWords={userWords} langCode={langCode}/>
        {userWords.filter ? userWords.filter(obj => {return obj.type === type})
          .map((word) => <DraggableWord key={word.id} word={word} translations={translations} sentence={sentence} setSentence={setSentence} setForward={setForward}/>) : null}
        {words.filter(obj => {return obj.type === type})
          .map((word) => <DraggableWord key={word.id} word={word} translations={translations} sentence={sentence} setSentence={setSentence} setForward={setForward}/>)}
      </DraxScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wordContainer: {

      backgroundColor: 'rgba(242, 242, 242, 0.5)',
      justifyContent: 'center',
      flexDirection: 'row',

      height: PAGE_HEIGHT*.5,
      width: PAGE_WIDTH,
      borderRadius: 10,
  },

  dragContainer: {

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingHorizontal: PAGE_WIDTH*.15,
    paddingTop: PAGE_HEIGHT*.02,

    width: PAGE_WIDTH,
  }


});

export default WordRoute;
