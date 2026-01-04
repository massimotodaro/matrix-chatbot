import './LoadingIndicator.css';

export function LoadingIndicator() {
  return (
    <span className="loading-indicator">
      <span className="loading-dot"></span>
      <span className="loading-dot"></span>
      <span className="loading-dot"></span>
    </span>
  );
}
