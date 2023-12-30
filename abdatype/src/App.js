import { AppProvider, useAppContext } from './state/AppContext';

import MyApp from './MyApp';

export default function App() {
  return (
      <AppProvider>
          <MyApp/>
      </AppProvider>
  );
};
