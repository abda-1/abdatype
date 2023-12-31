import React, {useState, createContext, useContext} from 'react';

import englishWords from '../dictionary/englishwords.json';
import cppWords from '../dictionary/cppwords.json';
import javascriptWords from '../dictionary/javawords.json';
import pythonWords from '../dictionary/pythonwords.json';

import cppAlgorithms from '../dictionary/cppAlgorithms.json';
import javaAlgorithms from '../dictionary/javaAlgorithms.json';
import pythonAlgorithms from '../dictionary/pythonAlgorithms.json';

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
    const [algorithmList, setAlgorithmList] = useState([]);

    // Button selections
    const themeSelection = ['default', 'light', 'night'];
    const testTypeSelection = ['words', 'algorithms'];
    const languageSelection = ['english', 'cpp', 'java', 'python'];
    const timeSelection = [10, 15, 30, 60];
   
    const updateLanguageAndTest = (newLanguage, newTest) => {

        setLanguageSelected(newLanguage);
        setTestType(newTest);

        // Updating language and test-type is words
        if (newTest === 'words') {
            let newList;
            switch (newLanguage) {
                case 'english':
                    newList = englishWords;
                    break;
                case 'cpp':
                    newList = cppWords;
                    break;
                case 'java':
                    newList = javascriptWords;
                    break;
                case 'python':
                    newList = pythonWords;
                    break;
                default:
                    newList = englishWords;
            }
            
            shuffleWords(newList);
        }

        // Updating language and test-type is algorithm
        else if (newTest === 'algorithms') {
            switch (newLanguage) {
                case 'cpp':
                    setAlgorithmList(cppAlgorithms);
                    break;
                case 'java':
                    setAlgorithmList(javaAlgorithms);
                    break;
                case 'python':
                    setAlgorithmList(pythonAlgorithms);
                    break;
                default:
                    // In the case that english is selected -> maybe could change this to some pseucodode list in the future ?
                    setAlgorithmList(cppAlgorithms);
            }
            setLanguageSelected(newLanguage);

        }

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
                    languageSelected, setLanguageSelected, updateLanguageAndTest,
                    testType, setTestType,
                    algorithmList, setAlgorithmList,
                    theme, setTheme, 
                    time, setTime, 
                    wordList, setWordList,
                    wordType, setWordType, 
                    testStarted, setTestStarted,
                    testCompleted, setTestCompleted,
                    initialTime, setInitialTime}}
        >
            {children}
        </AppContext.Provider>
    );
};
