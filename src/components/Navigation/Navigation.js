import "./navigation.css";

export default function Navigation({
  onNextPage,
  onPreviousPage,
  offset,
  listIsOver,
}) {
  return (
    <div className="buttons-container">
      {offset > 1 ? (
        <button onClick={onPreviousPage} className="button">
          Previous
        </button>
      ) : null}
      {listIsOver ? null : (
        <button onClick={onNextPage} className="button">
          Next
        </button>
      )}
    </div>
  );
}
