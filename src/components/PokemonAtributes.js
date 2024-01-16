export default function PokemonAtributes({ pokemonInfo }) {
  return (
    <>
      {pokemonInfo.stats.map((stats) => {
        return (
          <div>
            <p>
              {stats.stat.name.charAt(0).toUpperCase() +
                stats.stat.name.slice(1)}
              : {stats.base_stat}
            </p>
          </div>
        );
      })}
    </>
  );
}
