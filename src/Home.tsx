import React, { useContext, useEffect, useState } from 'react';
import { ApiContext } from './context/ApiContext';
import useContract from './hooks/useContract';

function Home() {
  const { api, apiReady } = useContext(ApiContext);
  const contract = useContract(api, apiReady);
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const getPendingArsw = async () => {
      if (!contract) { return }
      const isRunning = await contract.query.isRunning()

      setIsRunning(isRunning.value)
    }
    getPendingArsw()
  }, [contract])


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> {isRunning}.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
