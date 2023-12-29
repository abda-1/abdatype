import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../state/AppContext';
import wordsList from '../../dictionary/words.json';

import useTimer from '../../hooks/useTimer';
import WordDisplay from './WordDisplay';

import "../../stylesheets/tester/Tester.scss";

const Tester = () => {

    // Variables take from state
    const {time, setTime, testStarted, setTestStarted} = useAppContext();
    
    // Internval tester variables
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [typedWord, setTypedWord] = useState('');
    const [typedHistory, setTypedHistory] = useState([]);
    const hiddenInputRef = useRef(null);
    const {resetTimer} = useTimer({time, testStarted, setTime});

    // Logic for making input come into focus
    useEffect(() => {
        hiddenInputRef.current?.focus();
    }, []);

    // Reset test once timer reaches 0
    useEffect(() => {
        if (time === 0) {
            //resetTest();
        }
    }, [time]);

    // Reset test function
    const resetTest = () => {
        setCurrentWordIndex(0);
        setTypedWord('');
        setTypedHistory([]);
        shuffleWords();
    }

    // Shuffle words
    const shuffleWords = () => {
        wordsList.sort(() => (Math.random() - 0.5));
    }

    // After any key is pressed, test will start ->>> subject to change...
    const handleKeyPress = (e) => {
        if (!testStarted) setTestStarted(true);
    }

    // Handle keyboard input during test
    const handleChange = (e) => {
        const newTypedWord = e.target.value;
        setTypedWord(newTypedWord);

        if (shouldSkipWord(newTypedWord)){
            updateWordIndex();
        }
    }

    // Check if word is skipped / completed
    const shouldSkipWord = (word) => {
        return word.endsWith(' ') || word.endsWith('\n');
    }

    // Update the index of the new word and reset inputs
    const updateWordIndex = () => {
        setTypedHistory(prevHistory => [...prevHistory, typedWord]);
        setCurrentWordIndex(prevIndex => prevIndex + 1);
        setTypedWord('');
    }

    // Obtain 'type' / class of character being input
    const getCharClass = (char, charIndex, wordIndex) => {
        
        // Already completed words
        if (wordIndex < currentWordIndex) {
            const typedWordForThisIndex = typedHistory[wordIndex];
            return typedWordForThisIndex[charIndex] === char ? 'correct' : 'incorrect';
        }

        // Current word being typed
        if (wordIndex === currentWordIndex) {
            if (charIndex < typedWord.length) {
                return typedWord[charIndex] === char ? 'correct' : 'incorrect';
            }
            return 'untyped';
        }

        // Words that have not yet been reached
        return 'untyped';

    }

    return (
        <div className="test" onClick={(useEff) => hiddenInputRef.current?.focus()}>
            <div className='timer'>{time}</div>
            <div className="box">
                {wordsList.map((word, index) => (
                    <WordDisplay
                        key={word+index}
                        word={word}
                        index={index}
                        currentWordIndex={currentWordIndex}
                        typedWord={typedWord}
                        getCharClass={getCharClass}
                    />
                ))}
            </div>
            
            <input 
                ref={hiddenInputRef} 
                type="text" 
                value={typedWord} 
                onChange={handleChange}
                className='hidden-input'
                onKeyDown={handleKeyPress}
            />

        </div>
    );

};

export default Tester;