import React, { useState, useEffect } from 'react';

// checks to see three main boxes are full

const SentenceTest = (sentence, setSentenceReady) => {

    console.log("TESTING", sentence)
        
    const sentenceTest = (sentence) => {

        if ((sentence.some((element) => ((element.type==="noun") && (element.id >= 0)))) &&
        (sentence.some((element) => (element.type==="verb") && (element.id >= 0))) &&
        (sentence.some((element) => (element.type==="subject") && (element.id >= 0))))
        {
            console.log("sentence is complete!!")
            setSentenceReady(true)
        }
        else {
            console.log("you are missing words")
            setSentenceReady(false)
        }
    }

    sentenceTest(sentence)
} 

export default SentenceTest