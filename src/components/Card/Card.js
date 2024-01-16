import { useEffect, useState } from "react";
import img from "../../assets/pngaaa.com-96212.png";
import "./card.css";

export default function Card({ pokemon, onOpenDetails }) {
  const [pokemonInfo, setPokemonInfo] = useState([]);
  const [pokemonType, setPokemonType] = useState([]);
  const url = `${pokemon.url}`;

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setPokemonInfo(data);
        setPokemonType(data.types.map((typeSlot) => typeSlot.type.name));
      } catch (err) {
        console.log(err);
      }
    }
    fetchPokemons();
  }, [url]);

  const formatedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const formatedId = Number(pokemonInfo.id).toString().padStart(3, "0");
  const pokemonImage =
    pokemonInfo.id < 649
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonInfo.id}.svg`
      : pokemonInfo.id < 1012
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonInfo.id}.png`;

  return (
    <div
      onClick={() => onOpenDetails(pokemonInfo.id, pokemonInfo.name)}
      className={`card bg-color-${pokemonType[0]}`}
    >
      <span className="id-text">#{formatedId}</span>
      <div className="left-column">
        <h3 className="pokemon-name">{formatedName}</h3>
        <div className="tag-container">
          {pokemonType.map((type) => (
            <span key={type} className={`tag bg-color-${type}`}>
              {type}
            </span>
          ))}
        </div>
      </div>
      <div className="right-column ">
        <img className="pokeball-img" src={img} alt={"pokeball"} />
        <img src={pokemonImage} alt={pokemonInfo.name} />
      </div>
    </div>
  );
}
