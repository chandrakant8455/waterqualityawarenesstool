import { useState, useSyncExternalStore, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getResults, clearResults } from "../utils/storage";
import "./History.css";

const OVERALL_LABELS = { safe: "Safe", moderate: "Moderate", unsafe: "Unsafe" };
const OVERALL_COLORS = { safe: "#2ecc71", moderate: "#f39c12", unsafe: "#e74c3c" };

function useStoredResults() {
  const subscribe = useCallback((cb) => {
    window.addEventListener("storage", cb);
    return () => window.removeEventListener("storage", cb);
  }, []);
  return useSyncExternalStore(subscribe, getResults, getResults);
}

export default function History() {
  const storedResults = useStoredResults();
  const [cleared, setCleared] = useState(false);
  const results = cleared ? [] : storedResults;

  function handleClear() {
    if (window.confirm("Clear all saved results?")) {
      clearResults();
      setCleared(true);
    }
  }

  /* Prepare trend chart data (most recent 20, reversed for chronological order) */
  const trendData = results
    .slice(0, 20)
    .reverse()
    .map((r, i) => ({
      test: `#${i + 1}`,
      pH: Number(r.inputs.ph),
      TDS: Number(r.inputs.tds),
      Turbidity: Number(r.inputs.turbidity),
      Temp: Number(r.inputs.temperature),
    }));

  return (
    <div className="history">
      <div className="history-header">
        <h1>Analysis History</h1>
        <p>View and track your past water quality analyses.</p>
      </div>

      {results.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h2>No Results Yet</h2>
          <p>
            Run a water quality analysis and save the results to see them here.
          </p>
        </div>
      ) : (
        <>
          {/* Trend Chart */}
          {trendData.length > 1 && (
            <div className="trend-chart-card">
              <h3>Parameter Trends (Last {trendData.length} Tests)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="test" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pH" stroke="#0077b6" strokeWidth={2} />
                  <Line type="monotone" dataKey="TDS" stroke="#e74c3c" strokeWidth={2} />
                  <Line type="monotone" dataKey="Turbidity" stroke="#f39c12" strokeWidth={2} />
                  <Line type="monotone" dataKey="Temp" stroke="#2ecc71" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Results List */}
          <div className="results-list">
            {results.map((r) => (
              <div key={r.id} className="history-card">
                <div className="history-card-header">
                  <span className="history-date">
                    {new Date(r.timestamp).toLocaleString()}
                  </span>
                  <span
                    className="history-badge"
                    style={{ background: OVERALL_COLORS[r.overall] }}
                  >
                    {OVERALL_LABELS[r.overall]}
                  </span>
                </div>
                <div className="history-params">
                  <span>pH: {r.inputs.ph}</span>
                  <span>TDS: {r.inputs.tds} ppm</span>
                  <span>Turbidity: {r.inputs.turbidity} NTU</span>
                  <span>Temp: {r.inputs.temperature} &deg;C</span>
                </div>
              </div>
            ))}
          </div>

          <div className="history-actions">
            <button className="btn-clear" onClick={handleClear}>
              Clear All History
            </button>
          </div>
        </>
      )}
    </div>
  );
}
