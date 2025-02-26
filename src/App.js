import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Header from "./components/Header";
import AllPokemons from "./components/AllPokemons";
import SinglePokemon from "./components/SinglePokemon";
import Pokedex from "./components/Pokedex";
import Arena from "./components/Arena";
import Footer from "./components/Footer";
import serverURL from "./serverURL";
import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./components/Search";
import SearchResults from "./components/searchResults";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [userPokemon, setUserPokemon] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleChoice = (event) => {
    const targetPokemonId = event.target.attributes.payload.value;
    console.log(targetPokemonId);
    setUserPokemon(targetPokemonId);
    console.log(userPokemon);
  };

  const handleFilter = (e) => {
    const searchWord = e.target.value;

    const newFilter = pokemons.filter((pokemon) => {
      return pokemon.name.english
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  useEffect(() => {
    fetch(`${serverURL}/pokemons`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data);
      })
      .catch((err) => console.log({ fetchAllPokemonError: err.message }));
  }, []);

  if (!pokemons) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <div style={{ position: "relative" }}>
        <div className="headerContainer">
          <Header pokemons={pokemons} />
          <Search
            style={{ color: "black" }}
            placeholder={"search pokemon"}
            handleFilter={handleFilter}
          />
        </div>
        <SearchResults
          style={{ position: "absolute" }}
          className="searchResultsList"
          filteredData={filteredData}
        />
      </div>

      <div className="main-container">
        <div className="poke-body">
          <Routes>
            <Route
              path="/"
              element={
                <AllPokemons pokemons={pokemons} chosePokemon={handleChoice} />
              }
            />
            <Route
              path="/pokemon/:id"
              element={
                <SinglePokemon
                  pokemons={pokemons}
                  chosePokemon={handleChoice}
                />
              }
            />

            <Route path="/pokemons" element={<Pokedex pokemons={pokemons} />} />
            <Route
              path="/arena"
              element={<Arena pokemons={pokemons} userPokemon={userPokemon} />}
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
