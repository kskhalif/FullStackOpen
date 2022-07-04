import React, { useState } from 'react';
import './App.css';

import SearchByName from './components/SearchByName';
import Results from './components/Results';

const App = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (event) => setInput(event.target.value); 
    
  return (
    <div>
      <h1>Data for Countries</h1>
      <SearchByName input={input} handleInputChange={handleInputChange} />
      <Results data={data} setData={setData} input={input} />
    </div>
  );
};

export default App;
