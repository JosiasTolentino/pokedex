import { useEffect, useState } from "react";
import PokemonDetail from "./PokemonDetails/PokemonDetail";
import ItemsPerPage from "./ItemsPerPage/ItemsPerPage";
import Navigation from "./Navigation/Navigation";
import CardsGrid from "./CardsGrid";
import "../styles/app.css";
import "../styles/typeColors.css";
import Search from "./Search/Search";

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(1010);
  const [limit, setLimit] = useState(20);
  const [selectedPokemon, setSelectedPokemon] = useState({ id: 0, name: "" });
  const [listIsOver, setListIsOver] = useState(false);

  console.log(offset);

  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        const filteredPokemonList = data.results.filter(
          (pokemon) => pokemon.url.length < 40
        );
        setPokemonList(filteredPokemonList);
        const lastPokemon = data.results.filter(
          (pokemon) => pokemon.url.length >= 40
        );
        if (lastPokemon.length > 1) {
          setListIsOver(true);
        } else {
          setListIsOver(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
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
            <Search onOpenDetails={handleOpenDetails} />
            <Navigation
              listIsOver={listIsOver}
              offset={offset}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
            />
            <CardsGrid
              pokemonList={pokemonList}
              isLoading={isLoading}
              onOpenDetails={handleOpenDetails}
            />
            <ItemsPerPage limit={limit} setLimit={setLimit} />
            <Navigation
              listIsOver={listIsOver}
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
