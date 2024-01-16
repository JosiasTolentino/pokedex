import Card from "./Card/Card";
import CardSkeleton from "./Skeleton/CardSkeleton";

export default function CardsGrid({ pokemonList, isLoading, onOpenDetails }) {
  const skeletonCards = Array(pokemonList.length).fill(1);
  return (
    <div className="cards-grid">
      {isLoading
        ? skeletonCards.map((i) => {
            return <CardSkeleton />;
          })
        : pokemonList.map((pokemon) => (
            <>
              <Card
                key={pokemon.url}
                pokemon={pokemon}
                onOpenDetails={onOpenDetails}
              />
            </>
          ))}
    </div>
  );
}
