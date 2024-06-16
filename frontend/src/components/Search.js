import React, { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import style from "../styles/Search.module.css";
const Search = ({ items }) => {
  const [searchUser, setSearchUser] = useState('');
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }
  const formatResult = (item) => {
    return (
      <div>
        <span>{item.name}</span>
      </div>
    )
  }
  return (
    <div>
      <h1>Search</h1> 
      <ReactSearchAutocomplete
        items={items}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        formatResult={formatResult}
        autoFocus
        />
    </div>
  );
}
 
export default Search;