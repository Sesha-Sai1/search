import React, { useEffect, useState } from "react";
import countryData from "../json/CountryData.json";

const Search = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);

  const handleCountryData = () => {
    const newCountryData = [...countryData];
    if (query.length !== 0) {
      const filteredCountries = newCountryData.filter((country) => {
        return (
          country.capital.toLowerCase().includes(query.toLowerCase()) ||
          country.country.toLowerCase().includes(query.toLowerCase())
        );
      });
      setCountries(filteredCountries);
      setQuery("");
    } else {
      setCountries([]);
    }
  };

  const fetchSuggestions = (search) => {
    if (search.length > 0) {
      const newSuggestions = countryData.filter((item) => {
        return (
          item.capital.toLowerCase().includes(query.toLowerCase()) ||
          item.country.toLowerCase().includes(query.toLowerCase())
        );
      });
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  useEffect(() => {
    fetchSuggestions(query);
  }, [query]);
  return (
    <div className="mainContainer">
      <div>
        <h2>Get Country Data by Searching with Country Name or Capital</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="search-bar">
            <i class="fa-brands fa-google"></i>
            <input
              type="text"
              placeholder="Search for a country"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={handleCountryData}
            ></i>
          </div>
        </div>
        {suggestions.length > 0 && (
          <div>
            <ul className="suggestions-list">
              {suggestions.map((item, i) => (
                <li
                  key={i}
                  style={{ listStyle: "none", cursor: "pointer" }}
                  onClick={handleCountryData}
                >
                  {item.country}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div style={{ marginTop: "12px" }}>
          {countries.length > 0
            ? countries.map((country) => {
                return (
                  <div
                    style={{
                      border: "2px dotted green",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "20px",
                    }}
                    className="details-container"
                  >
                    <div>
                      <h2>Country's Name : {country.country}</h2>
                      <p>
                        <b>Country's Capital : {country.capital}</b>
                      </p>
                      <p>
                        <b>Country's Population : {country.population}</b>
                      </p>
                      <p>
                        <b>Country's Currency : {country.currency}</b>
                      </p>
                      <p>
                        <b>
                          Country's official_language :{" "}
                          {typeof country.official_language === Object
                            ? country.official_language[0]
                            : country.official_language}
                        </b>
                      </p>
                    </div>
                  </div>
                );
              })
            : query.length < 0 && <h1>No Data Found</h1>}
        </div>
      </div>
    </div>
  );
};

export default Search;
