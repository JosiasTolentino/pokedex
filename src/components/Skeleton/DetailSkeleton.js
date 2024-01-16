import "./skeleton.css";

export default function DetailSkeleton() {
  const skeletonAtributes = Array(6)
    .fill(1)
    .map((n, i) => n + i);
  return (
    <div className="skeleton-detail-container animate-pulse">
      <div className="skeleton-title-detail animate-pulse"></div>
      <div className="skeleton-tag-container">
        <div className="skeleton-detail-tag animate-pulse"></div>
        <div className="skeleton-atribute-container">
          {skeletonAtributes.map((i) => {
            return <div key={i} className="skeleton-atribute"></div>;
          })}
        </div>
      </div>
      <div className="skeleton-detail-image animate-pulse"></div>
    </div>
  );
}
