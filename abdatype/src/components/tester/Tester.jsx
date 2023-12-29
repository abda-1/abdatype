import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../state/AppContext';
import wordsList from '../../dictionary/words.json';

import useTimer from '../../hooks/useTimer';

import "../../stylesheets/tester/Tester.scss";

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
    const {resetTimer} = useTimer({time, testStarted, setTime});

    /** after key is pressed, test will start ->>> subject to change... */
    const handleKeyPress = (e) => {
        if(!testStarted) {
            setTestStarted(true);
        }
    }

    /** resetting the test */
    useEffect(() => {
        if (time === 0) {
            setCurrentWordIndex(0);
            setTypedWord('');
            setTypedHistory([]);
            /** randomise words */
            wordsList.sort(() => (Math.random() - 0.5));
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
            <div className='timer'>{time}</div>
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