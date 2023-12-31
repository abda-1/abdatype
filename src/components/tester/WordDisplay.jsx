import React from 'react';

// Caret display + assign incorrect/ correct character inputs for current active word
const WordDisplay = ({word, index, currentWordIndex, typedWord, getCharClass, caretRef, indent}) => {
    return (
        <div className={`word ${index === currentWordIndex ? 'active' : ''}`}>
            <span className='indentation'>{indent}</span>
            {word.split("").map((char, charIndex) => (
                <span key={char+charIndex} className={getCharClass(char,charIndex, index)}>
                    {char}
                </span>
            ))}

            {index === currentWordIndex && typedWord.length > word.length &&
                typedWord.slice(word.length).split("").map((char, charIndex) => (
                    <span key={char+charIndex} className='trailing'>
                        {char}
                    </span>
                ))
            }

            {index === currentWordIndex && (
                <span ref={caretRef} className='caret blink' style={{left: (typedWord.length + (indent ? indent.length : 0)) * 14.5833}}>|</span>
            )}
        </div>
    )
}

export default WordDisplay;