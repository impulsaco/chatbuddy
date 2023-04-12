import React, { useState, useEffect } from 'react';

// checks to see three main boxes are full

const SentenceTest = (sentence, setSentenceReady) => {

    console.log("TESTING", sentence)
        
    const sentenceTest = (sentence) => {

        const count = sentence.filter((element) => element.id >= 0).length;

        if (count>=sentence.length)
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