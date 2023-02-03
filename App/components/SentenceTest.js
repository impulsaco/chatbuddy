import React, { useState, useEffect } from 'react';

// checks to see three main boxes are full

const SentenceTest = ({sentence}) => {
        
    const [sentenceReady, setSentenceReady] = useState(false);
    const [savedSentence, setSavedSentence] = useState("");

    const sentenceTest = (sentence) => {

        if ((sentence.some((element) => ((element.type==="noun") && (element.id >= 0)))) &&
        (sentence.some((element) => (element.type==="verb") && (element.id >= 0))) &&
        (sentence.some((element) => (element.type==="subject") && (element.id >= 0))))
        {
            console.log("sentence is complete")
            setSentenceReady(true);
        }
        else {
            console.log("you are missing words")
        }
    }

    const concatSentence = (sentence) => {
        var midSentence = "";
        for (let i = 0; i < sentence.length; i++) {
            if (sentence[i].id >= 0) {
                midSentence = midSentence.concat(sentence[i].word, " ");
            }
        }
        setSavedSentence(midSentence);
        console.log("savedSentence is ", savedSentence);
    }

    sentenceTest(sentence)
    if (sentenceReady===true) {
        concatSentence(sentence)
    }

    return (true)
} 

export default SentenceTest