import './App.css';
import React, { useState, useEffect } from 'react';
import ItemsEach from './ItemsEach';

const App = () => {
  const [searchResult, setSearchResult] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSearch = (event) => {
    setSearchResult(event.target.value);
  };

  useEffect(() => {
    const fetchSuggestions = (requestTerm) => {
      const script = document.createElement('script');
      script.src = `https://suggestqueries.google.com/complete/search?callback=suggestCallBack&hl=en&ds=yt&jsonp=suggestCallBack&q=${encodeURIComponent(
        requestTerm
      )}&client=youtube`;

      window.suggestCallBack = (data) => {
        const suggestions = data[1].map((val) => ({ value: val[0] }));
        setSuggestions(suggestions.slice(0, 7));
      };

      document.body.appendChild(script);

      // Cleanup script
      return () => {
        document.body.removeChild(script);
      };
    };

    if (searchResult) {
      fetchSuggestions(searchResult);
    }
  }, [searchResult]);

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
      <ul>
        {suggestions.map((eachItem, index) => (
          <ItemsEach key={index} item={eachItem} />
        ))}
      </ul>
    </div>
  );
};

export default App;
