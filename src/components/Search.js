import React from "react";

const Search = ({ placeholder, data, handleFilter }) => {
  return (
    <div className="search">
      <div className="searchInput">
        <form
        // onSubmit={handleSubmit}
        >
          <input
            id="searchPokemon"
            type="text"
            placeholder={placeholder}
            onChange={handleFilter}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default Search;
