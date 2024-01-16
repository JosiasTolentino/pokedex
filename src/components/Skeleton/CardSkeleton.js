import "./skeleton.css";

export default function CardSkeleton() {
  return (
    <div className="skeleton animate-pulse">
      <div className="skeleton-title animate-pulse"></div>
      <div className="skeleton-tag animate-pulse"></div>
      <div className="skeleton-image animate-pulse"></div>
    </div>
  );
}
