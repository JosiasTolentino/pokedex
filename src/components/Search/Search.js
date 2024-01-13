import { useState } from "react";
import "./search.css";
import "../../styles/typeColors.css";

export default function Search({ setSelectedPokemon }) {
  const [searchPokemon, setSearchPokemon] = useState("");
  const [notFound, setNotFound] = useState(false);

  const getUrl = `https://pokeapi.co/api/v2/pokemon/${searchPokemon}`;

  function getPokemon() {
    if (searchPokemon !== "")
      fetch(getUrl)
        .then((response) => response.json())
        .then((data) => {
          setSelectedPokemon({ id: data.id, name: data.name });
          console.log(data);
          console.log(setSelectedPokemon);
        })
        .catch((err) => {
          console.log("Pokemon not found", err);
          setNotFound(true);
        });
  }

  function handleSearch() {
    getPokemon();
  }

  console.log(searchPokemon);
  return (
    <div className="search-container">
      <div className="input-container">
        <input
          className={notFound && "error-color"}
          type="text"
          placeholder="Pokemon name or ID"
          value={searchPokemon}
          onChange={(e) => {
            setSearchPokemon(e.target.value);
            setNotFound(false);
          }}
        ></input>
        <button className={notFound && "error-color"} onClick={handleSearch}>
          🔍
        </button>
      </div>
      {notFound && (
        <span className="error-message">
          Pokemon not found, check if the name or ID was entered correctly
        </span>
      )}
    </div>
  );
}
