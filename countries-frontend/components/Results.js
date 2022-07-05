import React, { useState, useEffect } from 'react';

import weatherService from '../services/weather';

const Toggle = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.toggle ? 'hide' : 'show'}
    </button>
  );
};

const Country = (props) => {
  const [toggle, setToggle] = useState(false);
  const handleClick = (event) => setToggle(!toggle);
  const countryData = <CountryData country={props.country} />
  return (
    <div>
      <p>
        {props.country.name.common + ' '}
        <Toggle toggle={toggle} handleClick={handleClick} />
      </p>
      {toggle ? countryData : null}
    </div>
  );
};

const CountryList = (props) => {
  return (
    props.data.map(country => 
      <Country 
        key={country.name.common} 
        country={country}
      />
    )
  );
};

const Language = (props) => {
  return (
    <li>{props.language}</li>
  );
};

const LanguageList = (props) => {
  return (
    <ul>
      {props.languages.map(language => 
        <Language key={language} language={language} />
      )}
    </ul>
  );
};

const WeatherData = (props) => {
  const [temp, setTemp] = useState('');
  const [wind, setWind] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    weatherService
      .getWeather(props.city) 
      .then(data => {
        setTemp(data.main.temp);
        setWind(data.wind.speed);
        setIcon(data.weather[0].icon);
      });
  }, [props.city]);

  return (
    <div>
      <h3>Weather in {props.city}</h3>
      <p>Temperature: {temp} Celsius</p>
      <img src={weatherService.getIcon(icon)} alt='' />
      <p>Wind: {wind} m/s</p>
    </div>
  );
};

const CountryData = (props) => {
  const country = props.country;
  const languages = Object.values(country.languages);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Official Name: {country.name.official}</p>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <LanguageList languages={languages} />
      <img src={country.flags.png} alt='' />
      <WeatherData city={country.capital} />
    </div>
  );
};

const Results = (props) => {
  if (!props.input) {
    return null;
  }
  if (!props.data.length) {
    return (
      <p>No matches.</p>
    );
  }
  if (props.data.length > 10) {
    return (
      <p>
        Too many matches; try specifying your search.
      </p>
    );
  }
  if (props.data.length > 1) {
    return (
      <div>
        <CountryList data={props.data} />
      </div>
    );
  }
  return (
    <div>
      <CountryData country={props.data[0]} />
    </div>
  );
};

export default Results;
