import React from 'react';
import { useAppContext } from '../../state/AppContext';

import "../../stylesheets/common/Header.scss";

const Header = () => {
    const {theme, setTheme, time, setTime} = useAppContext();
    const themes = ['default', 'sunset', 'night', 'vscode', 'monokai'];
    const gameTypes = ['words', 'cpp', 'algorithms', 'python', 'javascript'];


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


