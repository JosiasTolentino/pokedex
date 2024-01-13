import "./navigation.css";

export default function Navigation({ onNextPage, onPreviousPage, offset }) {
  return (
    <div className="buttons-container">
      {offset > 1 ? (
        <button onClick={onPreviousPage} className="button">
          Previous
        </button>
      ) : (
        ""
      )}
      <button onClick={onNextPage} className="button">
        Next
      </button>
    </div>
  );
}
