import React, {useState, createContext, useContext} from 'react';

const AppContext = createContext();

// redefinition for ease of use
export const useAppContext = () => useContext(AppContext);

// manage state variables
export const AppProvider = ({children}) => {
    const [theme, setTheme] = useState('default');
    const [time, setTime] = useState(15);
    const [testStarted, setTestStarted] = useState(false);

    return (
        <AppContext.Provider value={{   theme, setTheme, 
                                        time, setTime, 
                                        testStarted, setTestStarted}}>
            {children}
        </AppContext.Provider>
    );
};
