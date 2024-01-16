import { useEffect, useState } from "react";
import img from "../../assets/pngaaa.com-96212.png";
import PokemonAtributes from "../PokemonAtributes";
import "./pokemonDetails.css";
import DetailSkeleton from "../Skeleton/DetailSkeleton";

export default function PokemonDetail({ selectedPokemon, oncloseDetails }) {
  const [pokemonInfo, setPokemonInfo] = useState([]);
  const [pokemonType, setPokemonType] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const url = `https://pokeapi.co/api/v2/pokemon/${selectedPokemon.id}`;

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setPokemonInfo(data);
        setPokemonType(data.types.map((typeSlot) => typeSlot.type.name));
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

  const formatedName =
    selectedPokemon.name.charAt(0).toUpperCase() +
    selectedPokemon.name.slice(1);
  const formatedId = Number(pokemonInfo.id).toString().padStart(3, "0");
  const pokemonImage =
    pokemonInfo.id < 649
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonInfo.id}.svg`
      : pokemonInfo.id < 1012
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonInfo.id}.png`;

  return (
    <div className="details-container">
      {isLoading ? (
        <DetailSkeleton />
      ) : (
        <>
          <div className={`detail-header-container bg-color-${pokemonType[0]}`}>
            <div className="container-abc">
              <div className="title-container">
                <p className="detail-name">{formatedName}</p>
                <div className="detail-tag-container">
                  {pokemonType.map((type) => (
                    <span key={type} className={`tag bg-color-${type}`}>
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <p className="detail-id">#{formatedId}</p>
            </div>
            <img className="detail-pokeball-img" src={img} alt={"pokeball"} />
          </div>
          <div className="atributes-container">
            <img
              src={pokemonImage}
              alt={formatedName}
              className="detail-image"
            />
            {isLoading ? "" : <PokemonAtributes pokemonInfo={pokemonInfo} />}
          </div>
        </>
      )}

      <button className="button" onClick={oncloseDetails}>
        Close details
      </button>
    </div>
  );
}
