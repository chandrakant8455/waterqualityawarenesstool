import "./ResultCard.css";

/* Displays a single parameter analysis result with color coding */
export default function ResultCard({ param, value, status, level }) {
  return (
    <div className={`result-card result-${level}`}>
      <div className="result-param">{param}</div>
      <div className="result-value">{value}</div>
      <div className={`result-badge badge-${level}`}>{status}</div>
    </div>
  );
}
