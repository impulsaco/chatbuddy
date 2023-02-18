import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DraxProvider, DraxScrollView } from 'react-native-drax';
import DraggableWord from '../components/DraggableWord';
import AddWord from '../components/AddWord';

/// JUST MAKE ONE, THEN MAP ONTO TAB NAVIGATOR

const WordRoute = (type, setUserWords, userWords, langCode, words, translations, sentence, setSentence, setForward) => {
  return () => (
    <View>
      <DraxScrollView contentContainerStyle={styles.wordContainer}>
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
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      paddingLeft: 10,
  },
});

export default WordRoute;
