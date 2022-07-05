import React, { useState, useEffect } from 'react';
import './App.css';

import countryService from './services/countries';
import SearchByName from './components/SearchByName';
import Results from './components/Results';

const App = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    countryService
      .get(input)
      .then(results => setData(results));
  }, [input]);

  const handleInputChange = (event) => setInput(event.target.value);
    
  return (
    <div>
      <h1>Data for Countries</h1>
      <SearchByName input={input} handleInputChange={handleInputChange} />
      <Results data={data} input={input} />
    </div>
  );
};

export default App;
