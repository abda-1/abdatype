import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../state/AppContext';
import WordDisplay from './WordDisplay';

import useTimer from '../../utils/useTimer';
import getWordList from '../../utils/wordListHelper';

import "../../stylesheets/tester/Tester.scss";

const Tester = () => {

    // Variables take from global state
    const {wordList, time, setTime, testStarted, setTestStarted, initialTime, testCompleted, setTestCompleted} = useAppContext();
    
    // Internval state variables
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [typedWord, setTypedWord] = useState('');
    const [typedHistory, setTypedHistory] = useState([]);
    const hiddenInputRef = useRef(null);
    const caretRef = useRef(null);
    const boxRef = useRef(null);
    const {resetTimer} = useTimer({initialTime, testStarted, setTime});
    
    // Obtain word list through helper function
    const selectedWordList = getWordList(wordList);
    
    // Calculate total number of 'correct' characters
    const totalCorrect = typedHistory.reduce((total, word, index) => {
        return total + word.split('').filter((char, charIndex) => char === selectedWordList[index][charIndex]).length;
    }, 0)

    // Calculate typing speed in WPM
    const wordsTyped = totalCorrect / 4.5;
    const timeTaken = time > 0 ? (initialTime-time) / 60 : (initialTime / 60);
    const typingSpeed = Math.round(wordsTyped / timeTaken);

    // Logic for making input come into focus
    useEffect(() => {
        hiddenInputRef.current?.focus();
    }, []);

    // Logic for making the test window scroll automatically based upon caret location based on viewport
    useEffect(() => {
        if (caretRef.current && boxRef.current) {
            const caretRect = caretRef.current.getBoundingClientRect();
            const boxRect = boxRef.current.getBoundingClientRect();
        
            // Scroll when caret moves 2/3 through box
            if (caretRect.bottom > boxRect.top + (boxRect.height * 2 / 3) || caretRect.top < boxRect.top) {
                caretRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
            }
        }
    }, [currentWordIndex, typedWord]);


    // Reset test once timer reaches 0
    useEffect(() => {
        if (time === 0) {
            setTestCompleted(true);
            hiddenInputRef.current.blur();
        }
    }, [time, setTestCompleted]);

    // Reset test function
    const resetTest = () => {
        setCurrentWordIndex(0);
        setTypedWord('');
        setTypedHistory([]);
        shuffleWords();
        resetTimer();
        setTestStarted(false);
        setTestCompleted(false);
        setTime(initialTime);
    }

    // Shuffle words
    const shuffleWords = () => {
        selectedWordList.sort(() => (Math.random() - 0.5));
    }

    // After any key is pressed, test will start
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
        <div className="test" onClick={() => hiddenInputRef.current?.focus()}>
            <>
                <div className='timer' style={{visibility: testCompleted ? 'hidden' : 'visible'}}>{time}</div>
                <div className="box" style={{visibility: testCompleted ? 'hidden' : 'visible'}} ref={boxRef}>
                    {selectedWordList.map((word, index) => (
                        <WordDisplay
                            key={word+index}
                            word={word}
                            index={index}
                            currentWordIndex={currentWordIndex}
                            typedWord={typedWord}
                            getCharClass={getCharClass}
                            caretRef={index===currentWordIndex ? caretRef : null}
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
            </>
            {testCompleted &&
                (<div className='result'>
                    <span className='speed'>typing speed: {typingSpeed} WPM</span>
                    <button onClick={resetTest}>RESTART</button>
                </div>)
            }
        </div>
    );

};

export default Tester;