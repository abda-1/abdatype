import React from 'react';

// Caret display + assign incorrect/ correct character inputs for current active word
const WordDisplay = ({word, index, currentWordIndex, typedWord, getCharClass, caretRef}) => {
    return (
        <div className={`word ${index === currentWordIndex ? 'active' : ''}`}>
            {word.split("").map((char, charIndex) => (
                <span key={char+charIndex} className={getCharClass(char,charIndex, index)}>
                    {char}
                </span>
            ))}

            {index === currentWordIndex && (
                <span ref={caretRef} className='caret blink' style={{left: typedWord.length * 14.5833}}>|</span>
            )}
        </div>
    )
}

export default WordDisplay;