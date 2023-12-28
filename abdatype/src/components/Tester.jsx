import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../state/AppContext';
import wordsList from '../dictionary/words.json';

import '../stylesheets/Tester.scss';

const Tester = () => {

    /** state variables */
    const {time, setTime, testStarted, setTestStarted} = useAppContext();

    /** initialise states */
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [typedWord, setTypedWord] = useState('');
    const [typedHistory, setTypedHistory] = useState([]);
    const activeWordRef = useRef(null);
    const caretRef = useRef(null);

    /* function to start the timer */
    const startTimer = () => {

        // start the countdown of the timer
        const interval = setInterval ( () => {
            setTime((prevTime) => {
                
                // stop the timer condition
                if (prevTime <= 1) {
                    clearInterval(interval);
                    return 0;
                }

                // otherwise just decrement counter
                return prevTime-1;

            });
        }, 1000);
    };

    /** starting the timer based on keypress */
    const handleKeyPress = (e) => {
        if(!testStarted) {
            setTestStarted(true);
            startTimer();
        }
    }

    /** resetting the test */
    useEffect(() => {
        if (time === 0) {
            setCurrentWordIndex(0)
            setTypedWord('');
            setTypedHistory([]);
        }
    }, [time]);


    /** handling skipping of words */
    const handleChange = (e) => {
        const newTypedWord = e.target.value;
        setTypedWord(newTypedWord);

        if (newTypedWord.endsWith(' ') || newTypedWord.endsWith('\n')) {
            setTypedHistory([...typedHistory, newTypedWord.trim()]);
            setCurrentWordIndex(currentWordIndex + 1); // (currentWordIndex) => currentWordIndex+1?
            setTypedWord('');
        }

    };

    const hiddenInputRef = useRef(null);

    /** handle making input hidden logic */
    useEffect(() => {
        if(hiddenInputRef.current) {
            hiddenInputRef.current.focus();
        }
    }, []);

    /** ensure all keystrokes are directed towards input */
    const handleContainerClick = () => {
        if (hiddenInputRef.current) {
            hiddenInputRef.current.focus();
        }
    };

    const isActive = currentWordIndex < wordsList.length;

    /** identify class of word being typed */
    const getCharClass = (char, charId, typedWord, wordIndex) => {
        
        if (wordIndex < currentWordIndex) {
            return 'completed';
        }
        
        if(wordIndex > currentWordIndex || charId >= typedWord.length) {
            return 'untyped';
        }

        return typedWord[charId] === char ? 'correct' : 'incorrect';
    };

    return (
        <div className="test" onClick={handleContainerClick}>
            <div className="box">
                {wordsList.map((word, idx) => (
                    <div
                        key={word + idx}
                        className={`word ${idx === currentWordIndex ? 'active' : ''}`}
                        ref={idx === currentWordIndex ? activeWordRef : null}>
                        {word.split("").map((char, charId) => (
                            <span key={char + charId} className={getCharClass(char, charId, typedWord, idx)}>
                                {char}
                            </span>
                        ))}
                        {isActive && idx === currentWordIndex ? (
                            <span ref={caretRef} id="caret" className="blink" style={{left: typedWord.length * 14.5833}}>|</span>
                        ) : null}
                    </div>
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