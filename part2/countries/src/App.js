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
  console.log(countries[0])
  return countries.map((country) => (
    <p key={country.capital[0]}>
      {country.name.official}{" "}
      <button onClick={() => setFilter(country.name.official)}>Show</button>
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
    <h2>{country.name.official}</h2>
    capital {country.capital[0]} <br />
    population {country.population}
    <h3>Spoken languages </h3>
    <ul>
      { Object.entries(country.languages).map(([key, val]) =>
        <li key={key}>{val}</li>) }
      {/* {country.languages.map((language) => ( */}
        {/* <li key={language.iso639_1}>{language.name}</li> */}
      {/* ))} */}
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
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterEnter = (event) => {
    setFilter(event.target.value);
  };

  const countriesToDisplay = countries.filter((country) =>
    country.name.official.toLowerCase().includes(filter.toLowerCase())
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
