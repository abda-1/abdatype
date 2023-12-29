import React, { useEffect } from 'react';
import { useAppContext } from '../../state/AppContext';

import "../../stylesheets/common/Header.scss";

const Header = () => {
    const {theme, setTheme, initialTime, setTime, setInitialTime, wordList, setWordList, themeSelection, wordListSelection, timeSelection} = useAppContext();

    return (
        <header className='top'>
            <a href="." className="sign">abdatype</a>
            <div className='buttons'>

                <span className='themes'>
                    themes: 
                    {themeSelection.map((sel) => (
                        <button key={sel} onClick={() => setTheme(sel)} className={`mini ${theme === sel ? 'selected' : ''}`}>
                            {sel}                    
                        </button>
                    ))}
                </span>

                <span className='times'>
                    time:
                    {timeSelection.map((sel) => (
                        <button key={sel} onClick={() => {setTime(sel); setInitialTime(sel)}} className={`mini ${initialTime === sel ? 'selected' : ''}`}>
                            {sel}                    
                        </button>
                    ))}
                </span>

                <span className='wordlist'>
                    test type:
                    {wordListSelection.map((sel) => (
                        <button key={sel} onClick={() => setWordList(sel)} className={`mini ${wordList === sel ? 'selected' : ''}`}>
                            {sel}                    
                        </button>
                    ))}
                </span>
            </div>
        </header>
    );  
};

export default Header;




