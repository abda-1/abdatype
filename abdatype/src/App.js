import { AppProvider, useAppContext } from './state/AppContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Tester from './components/tester/Tester';

function App() {
  //const {theme} = useAppContext();
  
  return (
    <AppProvider>
      <Header/>
      <Tester />
      <Footer/>
    </AppProvider>
  );
};

export default App;
