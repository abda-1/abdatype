import React from 'react';
import { useAppContext } from '../state/AppContext';

import "../stylesheets/Header.scss";

const Header = () => {
    const {theme, setTheme, time, setTime} = useAppContext();
    const themes = ['default', 'beige', 'dark', 'vscode', 'github'];

    return (
        <header className='top'>
            <a href="." className="sign">
                abdatype
            </a>
            <div className="buttons">
                {themes.map((th) => (
                    <button key={th} onClick={() => setTheme(th)} className="mini">
                        {th}                    
                    </button>
                ))}
            </div>
        </header>
    );  
};

export default Header;


