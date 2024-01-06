import { useEffect, useState } from "react";
import PokemonDetail from "./PokemonDetail";
import ItemsPerPage from "./ItemsPerPage";
import Navigation from "./Navigation";
import CardsGrid from "./CardsGrid";
import "../styles/app.css";
import "../styles/typeColors.css";
import "../styles/card.css";
import "../styles/typeColors.css";
import "../styles/pokemonDetails.css";
import "../styles/itemsPerPage.css";
import "../styles/navigation.css";

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [selectedPokemon, setSelectedPokemon] = useState({ id: 0, name: "" });

  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        setPokemonList(data.results);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPokemons();
  }, [url]);

  function handleNextPage() {
    setOffset(Number(offset) + Number(limit));
  }

  function handlePreviousPage() {
    offset - limit < 0 ? setOffset(0) : setOffset(offset - limit);
  }

  function handleOpenDetails(id, name) {
    setSelectedPokemon({ id: id, name: name });
  }

  function handleCloseDetails() {
    setSelectedPokemon({ id: 0, name: "" });
  }

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1 className="title">Pokedex</h1>
        </header>
        {selectedPokemon.id !== 0 ? (
          <PokemonDetail
            selectedPokemon={selectedPokemon}
            oncloseDetails={handleCloseDetails}
          />
        ) : (
          <>
            <CardsGrid
              pokemonList={pokemonList}
              isLoading={isLoading}
              onOpenDetails={handleOpenDetails}
            />
            <ItemsPerPage limit={limit} setLimit={setLimit} />
            <Navigation
              offset={offset}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
            />
          </>
        )}
      </div>
    </div>
  );
}