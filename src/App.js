import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import ItemsEach from './ItemsEach';

const App = () => {
  const [searchResult, setSearchResult] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSearch = (event) => {
    setSearchResult(event.target.value);
  };

  const getSuggestions = async () => {
    try {
      const response = await axios.get(`/complete/search`, {
        params: {
          client: 'firefox',
          q: searchResult,
        },
      });
      setSuggestions(response.data[1]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="main-background">
      <img src="https://assets.ccbp.in/frontend/react-js/google-logo.png" alt="logo google" className="google-image" />
      <br />
      <input
        type="search"
        placeholder="Enter what you want to search"
        onChange={getSearch}
        className="input-box"
      />
      <button onClick={getSuggestions} className="button">
        Submit
      </button>

      <ul>
        {suggestions.map((eachItem, index) => (
          <ItemsEach key={index} item={eachItem} />
        ))}
      </ul>
    </div>
  );
};

export default App;
