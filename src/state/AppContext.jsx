import React, {useState, createContext, useContext} from 'react';
import englishWords from '../dictionary/englishwords.json';
import cppWords from '../dictionary/cppwords.json';
import javascriptWords from '../dictionary/javawords.json';
import pythonWords from '../dictionary/pythonwords.json';

const AppContext = createContext();

// Redefinition for ease of use
export const useAppContext = () => useContext(AppContext);

// Manage global state variables
export const AppProvider = ({children}) => {
    const [theme, setTheme] = useState('default');
    const [time, setTime] = useState(10);
    const [wordList, setWordList] = useState(englishWords);
    const [wordType, setWordType] = useState('words');
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [initialTime, setInitialTime] = useState(15);

    // Algorithms selection (i hope what i do from now doesnt break everything pls)
    const [languageSelected, setLanguageSelected] = useState('english');
    const [testType, setTestType] = useState('words');

    // Button selections
    const themeSelection = ['default', 'light', 'night'];
    const testTypeSelection = ['words', 'algorithms'];
    const languageSelection = ['english', 'cpp', 'java', 'python'];
    const timeSelection = [10, 15, 30, 60];

    const updateLanguage = (newType) => {

        let newList;
        
        switch (newType) {
            case 'english':
                newList = englishWords;
                setLanguageSelected(testType === 'words' ? 'english' : 'cpp');
                break;
            case 'cpp':
                newList = cppWords;
                setLanguageSelected('cpp');
                break;
            case 'java':
                newList = javascriptWords;
                setLanguageSelected('java');
                break;
            case 'python':
                newList = pythonWords;
                setLanguageSelected('python');
                break;
            
            default:
                newList = englishWords;
                setLanguageSelected('english');
        };
        shuffleWords(newList)
    }



    // Shuffle function -> could be made more efficient but scale permits
    const shuffleWords = (newWordList) => {
        const shuffledList = [...newWordList].sort(() => Math.random() - 0.5);
        setWordList(shuffledList);
    }

    return (
        <AppContext.Provider 
            value={{themeSelection, timeSelection, languageSelection, testTypeSelection,
                    shuffleWords,
                    languageSelected, setLanguageSelected, updateLanguage,
                    testType, setTestType,
                    theme, setTheme, 
                    time, setTime, 
                    wordList,
                    wordType, setWordType, 
                    testStarted, setTestStarted,
                    testCompleted, setTestCompleted,
                    initialTime, setInitialTime}}
        >
            {children}
        </AppContext.Provider>
    );
};
