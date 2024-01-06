export default function ItemsPerPage({ limit, setLimit }) {
  const limitOptions = Array(10)
    .fill(10)
    .map((n, i) => n + i * 10);
  return (
    <div className="ipp-container">
      <label>Pokemons per page </label>
      <select
        className="select-options"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      >
        {limitOptions.map((option) => (
          <option key={option} value={option}>
            {" "}
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
