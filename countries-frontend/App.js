import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    axios 
      .get('https://restcountries.com/v3.1/all')
      .then(response => setData(response.data));
  }, []);

  const handleNameChange = (event) => setName(event.target.value);
    
  const getResults = () => {
    return data.filter(country =>
      country.name.common.toLowerCase().includes(name.toLowerCase()) ||
      country.name.official.toLowerCase().includes(name.toLowerCase())
    );
  };

  const showResults = () => {
    if (!name) return;
    const results = getResults();
    if (!results.length) {
      return (
        <p>No matches.</p>
      );
    }
    if (results.length > 10) {
      return (
        <p>
          Too many matches; try specifying your search.
        </p>
      );
    }
    if (results.length > 1) {
      return (
        results.map(country =>
          <p>{country.name.common}</p>
        )
      );
    }
    const country = results[0];
    const languages = Object.values(country.languages);
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages:</h3>
        <ul>
          {languages.map((language) => 
            <li>{language}</li>
          )}
        </ul>
        <img src={country.flags.png} alt='' />
      </div>
    );
  };

  return (
    <div>
    <h1>Data for Countries</h1>
    <p>
        search by name:
        <input
          value={name}
          onChange={handleNameChange}
        />
     </p>
    {showResults()}
    </div>
  );
};

export default App;
