import React, {useState, createContext, useContext} from 'react';
import words from '../dictionary/words.json';
import cpp from '../dictionary/cppwords.json';
import javascript from '../dictionary/javawords.json';
import python from '../dictionary/pythonwords.json';

const AppContext = createContext();

// redefinition for ease of use
export const useAppContext = () => useContext(AppContext);

// manage global state variables
export const AppProvider = ({children}) => {
    const [theme, setTheme] = useState('default');
    const [time, setTime] = useState(10);
    const [wordList, setWordList] = useState(words);
    const [wordType, setWordType] = useState('words');
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [initialTime, setInitialTime] = useState(10);

    const themeSelection = ['default', 'light', 'night'];
    const wordTypeSelection = ['words', 'cpp', 'javascript', 'python'];
    const timeSelection = [10, 15, 30, 60];

    const updateWordList = (newType) => {
        setWordType(newType);
        let newList;
        switch (newType) {
            case 'words':
                newList = words;
                break;
            case 'cpp':
                newList = cpp;
                break;
            case 'javascript':
                newList = javascript;
                break;
            case 'python':
                newList = python;
                break;
            
            default:
                newList = words;
        };
        shuffleWords(newList)
    }

    // Shuffle function -> could be made more efficient
    const shuffleWords = (newWordList) => {
        const shuffledList = [...newWordList].sort(() => Math.random() - 0.5);
        setWordList(shuffledList);
    }

    return (
        <AppContext.Provider 
            value={{themeSelection, wordTypeSelection, timeSelection,
                    theme, setTheme, 
                    time, setTime, 
                    wordList, updateWordList, 
                    wordType, setWordType, 
                    testStarted, setTestStarted,
                    testCompleted, setTestCompleted,
                    initialTime, setInitialTime}}
        >
            {children}
        </AppContext.Provider>
    );
};
