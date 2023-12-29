import React, {useState, createContext, useContext} from 'react';

const AppContext = createContext();

// redefinition for ease of use
export const useAppContext = () => useContext(AppContext);

// manage global state variables
export const AppProvider = ({children}) => {
    const [theme, setTheme] = useState('default');
    const [time, setTime] = useState(10);
    const [wordList, setWordList] = useState('words');
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [initialTime, setInitialTime] = useState(10);

    const themeSelection = ['default', 'sunset', 'night'];
    const wordListSelection = ['words', 'cpp'];
    const timeSelection = [10, 15, 30, 60];

    return (
        <AppContext.Provider 
            value={{themeSelection, wordListSelection, timeSelection,
                    theme, setTheme, 
                    time, setTime, 
                    wordList, setWordList, 
                    testStarted, setTestStarted,
                    testCompleted, setTestCompleted,
                    initialTime, setInitialTime}}
        >
            {children}
        </AppContext.Provider>
    );
};
