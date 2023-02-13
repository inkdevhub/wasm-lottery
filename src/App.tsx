import React from 'react';
import { ApiContextProvider } from './context/ApiContext';
import Home from './Home';

const App = () => {
	return (
		<>
      <ApiContextProvider>
        <Home />
      </ApiContextProvider>
		</>
	);
};

export default App;
