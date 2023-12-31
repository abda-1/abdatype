import React, {useEffect} from 'react';
import { useAppContext } from '../../state/AppContext';

import "../../stylesheets/common/Header.scss";

const Header = () => {
    const { theme, setTheme, 
            initialTime, setTime, setInitialTime, 
            testType, setTestType, 
            languageSelected, setLanguageSelected, updateLanguage,
            themeSelection, testTypeSelection, languageSelection, timeSelection } = useAppContext();
    
    // (Bandaid) Fix variable sync issues -> should update when testType, languageType are updated
    useEffect(() => {

        // Automatically swap to cpp
        if (testType === 'algorithms' && languageSelected === 'english') {
            setLanguageSelected('cpp');
        }


    }, [testType, languageSelected, setLanguageSelected]);

    return (
        <header>
            <a href="https://github.com/abda-1/abdatype" target='blank' className="sign">abdatype</a>
            <div className='buttons'>

                <span className='title'>
                    themes: 
                    {themeSelection.map((sel) => (
                        <button 
                            key={sel} 
                            onClick={() => setTheme(sel)} 
                            className={`mini ${theme === sel ? 'selected' : ''}`}
                        >
                            {sel}                    
                        </button>
                    ))}
                </span>

                <span className='title'>
                    time:
                    {timeSelection.map((sel) => (
                        <button 
                            key={sel} 
                            onClick={() => {setTime(sel); setInitialTime(sel);}} 
                            className={`mini ${initialTime === sel ? 'selected' : ''}`}
                        >    
                            {sel}                    
                        </button>
                    ))}
                </span>

                <span className='title'>
                    test type:
                    {testTypeSelection.map((sel) => (
                        <button 
                            key={sel} 
                            onClick={() => {setTestType(sel);}} 
                            className={`mini ${testType === sel ? 'selected' : ''}`}
                        >
                            {sel}                    
                        </button>
                    ))}
                </span>
                
                <span className='title'>
                    language:
                    {languageSelection.map((sel) => (
                        <button 
                            key={sel} 
                            onClick={() => {updateLanguage(sel);}} 
                            disabled={testType === 'algorithms' && sel === 'english'} 
                            className={`mini ${languageSelected === sel ? 'selected' : ''}`}
                        >
                            {sel}                    
                        </button>
                    ))}
                </span>

            </div>
        </header>
    );  
};

export default Header;