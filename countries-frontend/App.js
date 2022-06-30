import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import SearchByName from './components/SearchByName';
import Results from './components/Results';

const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    axios 
      .get('https://restcountries.com/v3.1/all')
      .then(response => setData(response.data));
  }, []);

  const handleNameChange = (event) => setName(event.target.value);
    
  return (
    <div>
    <h1>Data for Countries</h1>
    <SearchByName name={name} handleNameChange={handleNameChange} />
    <Results data={data} name={name} />
    </div>
  );
};

export default App;
