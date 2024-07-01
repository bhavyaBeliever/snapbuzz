import React, { useEffect, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import style from "../styles/Search.module.css";
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchUser, setSearchUser] = useState('');
  const [items, setItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleOnSearch = (string, results) => {
    setSearchResults(results);
    setIsSearchActive(true); // Activate search results display
  }

  useEffect(() => {
    fetch('/users/getUsersInfo')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(err => console.log('Error:', err));
  }, []);

  const handleOnHover = (result) => {
    console.log("handleOnHover", result);
  }

  const handleOnSelect = (item) => {
    console.log("handleOnSelect", item);
  }

  const handleOnFocus = () => {
    console.log('Focused');
  }

  return (
    <div>
      <h1 style={{ padding: "15px" }}>Search</h1>
      <div style={{ position: 'relative' }}>
        <ReactSearchAutocomplete
          items={items}
          fuseOptions={{ keys: ['username'] }}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          className={style.SearchBox}
          style={{ borderTop: "10px", borderBottom: "0px" }}
          showNoResults={false}
        />
        {isSearchActive ? (
          <div style={{ textAlign: "center" }}>

            <ul style={{ position: 'absolute', top: '100%', left: 0, zIndex: 2, backgroundColor: "black", padding: "20px", listStyle: "none", width: "100%", "margin": "auto" }}>
              {searchResults.map((result, index) => (
                <li key={result._id} style={{ padding: "20px", borderBottom: "1px solid #ccc", "width": "100%"}}>
                  <Link to={`/user/${result.username}`} className={style.link}>
                    {result.username}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>

            <ul style={{ position: 'absolute', top: '100%', left: 0, zIndex: 2, backgroundColor: "black", padding: "20px", listStyle: "none", width: "90%", margin: "auto" }}>
              {
                <li style={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
                  No Results...
                </li>
              }
            </ul>
          </div>
        )
        }
      </div>
    </div>
  );
}

export default Search;
