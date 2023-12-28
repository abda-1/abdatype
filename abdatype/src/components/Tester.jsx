import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../state/AppContext';
import wordsList from '../dictionary/words.json';

import '../stylesheets/Tester.scss'

const Tester = () => {

    /* state variables */
    const {time, setTime, testStarted, setTestStarted} = useAppContext();

    /* initialise states */
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [typedWord, setTypedWord] = useState('');
    const [typedHistory, setTypedHistory] = useState([]);
    const activeWordRef = useRef(null);
    const caretRef = useRef(null);

    /* condition for starting the timer */
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

    const handleKeyPress = (e) => {
        if(!testStarted) {
            setTestStarted(true);
            startTimer();
        }
    }

    useEffect(() => {
        // reset the test
        if (time === 0) {
            setCurrentWordIndex(0)
            setTypedWord('');
            setTypedHistory([]);
        }
    }, [time]);


    const handleChange = (e) => {
        const newTypedWord = e.target.value;
        setTypedWord(newTypedWord);

        if (newTypedWord.endsWith(' ') || newTypedWord.endsWith('\n')) {
            setTypedHistory([...typedHistory, newTypedWord.trim()]);
            setCurrentWordIndex(currentWordIndex + 1); // (currentWordIndex) => currentWordIndex+1?
            setTypedWord('');
        }

    };

    const currentWord = wordsList[currentWordIndex];
    const isActive = currentWordIndex < wordsList.length;
    const caretPos = typedWord.length * 21;

    const getCharClass = (char, charId, typedWord, wordIndex) => {
        
        if (wordIndex !== currentWordIndex) {
            return 'completed';
        }
        
        if(wordIndex > currentWordIndex || charId >= typedWord.length) {
            return 'untyped';
        }
        return typedWord[charId] === char ? 'correct' : 'incorrect';
    };

    return (
        <div className="test">
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
            <input type="text" value={typedWord} onChange={handleChange} />
        </div>
    );

};



export default Tester;