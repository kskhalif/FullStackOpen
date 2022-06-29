import React from 'react';

const getResults = (data, name) => {
    return data.filter(country =>
      country.name.common.toLowerCase().includes(name.toLowerCase()) ||
      country.name.official.toLowerCase().includes(name.toLowerCase())
    );
};

const showCountryData = (country) => {
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
        let show = results.reduce((map, country) =>
            map.set(country.name.common, false)
        , new Map());
        console.log(show);
            
        return results.map(country => {
            let name = country.name.common;
            return (
                <p>
                {name + ' '}
                <button onClick={() => show[name] = !show[name]}>
                    {show[name] ? 'hide' : 'show'}
                </button>
                <br></br>
                {show[name] ? showCountryData(country) : null}
                </p>
            );
        });
    }

    return showCountryData(results[0]);
};

export default Results;
