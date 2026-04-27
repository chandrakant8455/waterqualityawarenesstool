import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { analyzeWater } from "../utils/waterAnalysis";
import { saveResult } from "../utils/storage";
import ResultCard from "../components/ResultCard";
import "./Checker.css";

/* Color mapping for result levels */
const LEVEL_COLORS = {
  safe: "#2ecc71",
  moderate: "#f39c12",
  unsafe: "#e74c3c",
};

const OVERALL_LABELS = {
  safe: "Safe",
  moderate: "Moderate",
  unsafe: "Unsafe",
};

export default function Checker() {
  const [form, setForm] = useState({ ph: "", tds: "", turbidity: "", temperature: "" });
  const [errors, setErrors] = useState({});
  const [analysis, setAnalysis] = useState(null);
  const [saved, setSaved] = useState(false);

  /* Validate a single field */
  function validateField(name, value) {
    if (value === "") return "This field is required";
    const num = Number(value);
    if (isNaN(num)) return "Must be a number";
    switch (name) {
      case "ph":
        if (num < 0 || num > 14) return "pH must be between 0 and 14";
        break;
      case "tds":
        if (num < 0) return "TDS cannot be negative";
        if (num > 5000) return "TDS value too high (max 5000)";
        break;
      case "turbidity":
        if (num < 0) return "Turbidity cannot be negative";
        if (num > 1000) return "Turbidity value too high (max 1000)";
        break;
      case "temperature":
        if (num < -10 || num > 100) return "Temperature must be between -10 and 100";
        break;
    }
    return "";
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    setSaved(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = analyzeWater(
      Number(form.ph),
      Number(form.tds),
      Number(form.turbidity),
      Number(form.temperature)
    );
    setAnalysis(result);
    setSaved(false);
    window.scrollTo({ top: document.querySelector(".results-section")?.offsetTop - 80, behavior: "smooth" });
  }

  function handleSave() {
    if (analysis) {
      saveResult({
        inputs: { ...form },
        ...analysis,
      });
      setSaved(true);
    }
  }

  function handleReset() {
    setForm({ ph: "", tds: "", turbidity: "", temperature: "" });
    setErrors({});
    setAnalysis(null);
    setSaved(false);
  }

  /* Prepare chart data */
  const barData = analysis
    ? analysis.results.map((r) => ({
        name: r.param,
        score: r.level === "safe" ? 100 : r.level === "moderate" ? 60 : 20,
        level: r.level,
      }))
    : [];

  const radarData = analysis
    ? analysis.results.map((r) => ({
        param: r.param,
        value: r.level === "safe" ? 100 : r.level === "moderate" ? 60 : 20,
      }))
    : [];

  return (
    <div className="checker">
      <div className="checker-header">
        <h1>Water Quality Checker</h1>
        <p>Enter your water parameters below to get an instant quality analysis.</p>
      </div>

      {/* Input Form */}
      <form className="checker-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="ph">pH Level (0 &ndash; 14)</label>
            <input
              id="ph"
              name="ph"
              type="number"
              step="0.1"
              placeholder="e.g. 7.0"
              value={form.ph}
              onChange={handleChange}
              className={errors.ph ? "input-error" : ""}
            />
            {errors.ph && <span className="error-msg">{errors.ph}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="tds">TDS (ppm)</label>
            <input
              id="tds"
              name="tds"
              type="number"
              step="1"
              placeholder="e.g. 250"
              value={form.tds}
              onChange={handleChange}
              className={errors.tds ? "input-error" : ""}
            />
            {errors.tds && <span className="error-msg">{errors.tds}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="turbidity">Turbidity (NTU)</label>
            <input
              id="turbidity"
              name="turbidity"
              type="number"
              step="0.1"
              placeholder="e.g. 2.5"
              value={form.turbidity}
              onChange={handleChange}
              className={errors.turbidity ? "input-error" : ""}
            />
            {errors.turbidity && <span className="error-msg">{errors.turbidity}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="temperature">Temperature (&deg;C)</label>
            <input
              id="temperature"
              name="temperature"
              type="number"
              step="0.1"
              placeholder="e.g. 22"
              value={form.temperature}
              onChange={handleChange}
              className={errors.temperature ? "input-error" : ""}
            />
            {errors.temperature && <span className="error-msg">{errors.temperature}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-analyze">
            Analyze
          </button>
          <button type="button" className="btn-reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {/* Results Section */}
      {analysis && (
        <div className="results-section">
          {/* Overall Result */}
          <div className={`overall-result overall-${analysis.overall}`}>
            <h2>Overall Water Quality</h2>
            <div className="overall-badge">{OVERALL_LABELS[analysis.overall]}</div>
          </div>

          {/* Parameter Cards */}
          <div className="results-grid">
            {analysis.results.map((r) => (
              <ResultCard key={r.param} {...r} />
            ))}
          </div>

          {/* Charts */}
          <div className="charts-section">
            <div className="chart-card">
              <h3>Quality Score by Parameter</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    formatter={(val) =>
                      val >= 80 ? "Safe" : val >= 50 ? "Moderate" : "Unsafe"
                    }
                  />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={LEVEL_COLORS[entry.level]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3>Parameter Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="param" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar
                    dataKey="value"
                    stroke="#0077b6"
                    fill="#0077b6"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Health Suggestions */}
          <div className="suggestions-card">
            <h3>Health Recommendations</h3>
            <ul>
              {analysis.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Save Button */}
          <div className="save-section">
            <button className="btn-save" onClick={handleSave} disabled={saved}>
              {saved ? "Saved to History" : "Save Results"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
