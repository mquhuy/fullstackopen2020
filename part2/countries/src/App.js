import React, { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ countries, filter, setFilter }) => {
  if (filter.length === 0) {
    return null;
  }
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (countries.length > 1) {
    return <CountryList countries={countries} setFilter={setFilter} />;
  }
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
  return <p>No matches</p>;
};

const CountryList = ({ countries, setFilter }) => {
  return countries.map((country) => (
    <p key={country.alpha2Code}>
      {country.name}{" "}
      <button onClick={() => setFilter(country.name)}>Show</button>
    </p>
  ));
};

const Weather = ({ capital }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState({});
  const requestAddress = "http://api.weatherstack.com/current?access_key=".concat(
    api_key,
    "&query=",
    capital
  );
  useEffect(() => {
    axios.get(requestAddress).then((response) => {
      setWeather(response.data.current);
    });
  }, [requestAddress]);
  return (
    <>
      <h3>Weather in {capital}</h3>
      <b>temperature:</b> {weather.temperature} Celcius <br />
      <img src={weather.weather_icons} alt="weather_icon" /> <br />
      <b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}
    </>
  );
};

const Country = ({ country }) => (
  <>
    <h2>{country.name}</h2>
    capital {country.capital} <br />
    population {country.population}
    <h3>languages </h3>
    <ul>
      {country.languages.map((language) => (
        <li key={language.iso639_1}>{language.name}</li>
      ))}
    </ul>
    <img
      src={country.flag}
      alt={country.name + " flag"}
      style={{ width: "10em" }}
    />
    <Weather capital={country.capital} />
  </>
);

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterEnter = (event) => {
    setFilter(event.target.value);
  };

  const countriesToDisplay = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <form>
        find countries
        <input onChange={handleFilterEnter} />
      </form>
      <Countries
        countries={countriesToDisplay}
        filter={filter}
        setFilter={setFilter}
      />
    </>
  );
};

export default App;
