import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getResults = (data, name) => {
    return data.filter(country =>
      country.name.common.toLowerCase().includes(name.toLowerCase()) ||
      country.name.official.toLowerCase().includes(name.toLowerCase())
    );
};

const ListLanguage = (props) => {
    return (
        <li>{props.language}</li>
    );
};

const WeatherData = (props) => {
    const [temp, setTemp] = useState('');
    const [wind, setWind] = useState('');
    const [icon, setIcon] = useState('');
    const api_key = '3954ac8c3003271f325a3d7e814592a1';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
                    props.city + '&appid=' + api_key + '&units=metric';
    useEffect(() => {
        axios 
          .get(url)
          .then(response => {
            setTemp(response.data.main.temp);
            setWind(response.data.wind.speed);
            setIcon(response.data.weather[0].icon)
          })
    }, []);
    const iconURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
    return (
        <div>
          <h3>Weather in {props.city}</h3>
          <p>Temperature: {temp} Celsius</p>
          <img src={iconURL} alt='' />
          <p>Wind: {wind} m/s</p>
        </div>
    );
};

const showCountryData = (country) => {
    const languages = Object.values(country.languages);
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Official Name: {country.name.official}</p>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages:</h3>
        <ul>
          {languages.map((language) => 
            <ListLanguage key={language} language={language} />
          )}
        </ul>
        <img src={country.flags.png} alt='' />
        <WeatherData city={country.capital} />
      </div>
    );
};

const Toggle = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.toggle ? 'hide' : 'show'}
        </button>
    );
};

const ListCountry = (props) => {
    const [toggle, setToggle] = useState(false);
    const handleClick = (event) => setToggle(!toggle);
    return (
        <div>
        <p>
            {props.country.name.common + ' '}
            <Toggle toggle={toggle} handleClick={handleClick} />
        </p>
        {toggle ? showCountryData(props.country) : null}
        </div>
    );
};

const Results = (props) => {
    if (!props.name) return;
    const results = getResults(props.data, props.name);
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
                <ListCountry 
                    key={country.name.common} 
                    country={country}
                />
            )
        );
    }
    return showCountryData(results[0]);
};

export default Results;
