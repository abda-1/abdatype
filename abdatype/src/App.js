import { AppProvider, useAppContext } from './state/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Tester from './components/Tester';
import Timer from './components/Timer';

function App() {
  //const {theme} = useAppContext();
  
  return (
    <AppProvider>
      <div className="app">
        <Header />
        <Timer />
        <Tester />
        <Footer />
      </div>
    </AppProvider>
  );
};

export default App;
