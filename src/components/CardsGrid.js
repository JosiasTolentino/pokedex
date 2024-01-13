import Loader from "./Loader";
import Card from "./Card/Card";

export default function CardsGrid({ pokemonList, isLoading, onOpenDetails }) {
  return (
    <div className="cards-grid">
      {isLoading ? (
        <Loader />
      ) : (
        pokemonList.map((pokemon) => (
          <Card
            key={pokemon.url}
            pokemon={pokemon}
            onOpenDetails={onOpenDetails}
          />
        ))
      )}
    </div>
  );
}
