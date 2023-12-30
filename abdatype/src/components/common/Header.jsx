import React from 'react';
import { useAppContext } from '../../state/AppContext';

import "../../stylesheets/common/Header.scss";

const Header = () => {
    const {theme, setTheme, initialTime, setTime, setInitialTime, wordList, setWordList, themeSelection, wordListSelection, timeSelection} = useAppContext();

    return (
        <header>
            <a href="https://github.com/abda-1/abdatype" target='blank' className="sign">abdatype</a>
            <div className='buttons'>

                <span className='title'>
                    themes: 
                    {themeSelection.map((sel) => (
                        <button key={sel} onClick={() => setTheme(sel)} className={`mini ${theme === sel ? 'selected' : ''}`}>
                            {sel}                    
                        </button>
                    ))}
                </span>

                <span className='title'>
                    time:
                    {timeSelection.map((sel) => (
                        <button key={sel} onClick={() => {setTime(sel); setInitialTime(sel)}} className={`mini ${initialTime === sel ? 'selected' : ''}`}>
                            {sel}                    
                        </button>
                    ))}
                </span>

                <span className='title'>
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




