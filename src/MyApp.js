import React, {useEffect} from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Tester from './components/tester/Tester';
import { useAppContext } from './state/AppContext';

export default function MyApp() {

  const {theme} = useAppContext();

  useEffect (() => {
    const root = document.getElementById('root');
    if (root) {
      root.className = theme;
    }
  }, [theme]);

  return (
    <div className='app'>
        <Header/>
        <Tester/>
        <Footer/>
    </div>
  );
};
