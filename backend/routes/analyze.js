const express = require("express");
const router = express.Router();

/**
 * Rule-based water quality analysis (server-side).
 * Mirrors the frontend logic so results can also be computed via API.
 */

function analyzePH(ph) {
  if (ph < 6.5) return { status: "Acidic (Unsafe)", level: "unsafe" };
  if (ph <= 8.5) return { status: "Safe", level: "safe" };
  return { status: "Alkaline (Unsafe)", level: "unsafe" };
}

function analyzeTDS(tds) {
  if (tds < 300) return { status: "Excellent", level: "safe" };
  if (tds <= 600) return { status: "Good", level: "moderate" };
  if (tds <= 1000) return { status: "Fair", level: "moderate" };
  return { status: "Unsafe", level: "unsafe" };
}

function analyzeTurbidity(turbidity) {
  if (turbidity < 5) return { status: "Safe", level: "safe" };
  return { status: "Unsafe", level: "unsafe" };
}

function analyzeTemperature(temp) {
  if (temp >= 10 && temp <= 25) return { status: "Ideal", level: "safe" };
  if ((temp >= 5 && temp < 10) || (temp > 25 && temp <= 35))
    return { status: "Acceptable", level: "moderate" };
  return { status: "Extreme", level: "unsafe" };
}

function getOverallResult(results) {
  const levels = results.map((r) => r.level);
  if (levels.includes("unsafe")) return "unsafe";
  if (levels.includes("moderate")) return "moderate";
  return "safe";
}

function getHealthSuggestions(overall, results) {
  const suggestions = [];

  if (overall === "safe") {
    suggestions.push("Your water quality appears safe for drinking.");
    suggestions.push("Continue regular monitoring to maintain quality.");
    return suggestions;
  }

  const phResult = results.find((r) => r.param === "pH");
  const tdsResult = results.find((r) => r.param === "TDS");
  const turbidityResult = results.find((r) => r.param === "Turbidity");
  const tempResult = results.find((r) => r.param === "Temperature");

  if (phResult && phResult.level === "unsafe") {
    suggestions.push(
      phResult.status.includes("Acidic")
        ? "Water is acidic. Use a neutralizing filter or add alkaline minerals."
        : "Water is too alkaline. Consider an acidic water treatment system."
    );
  }

  if (tdsResult && (tdsResult.level === "unsafe" || tdsResult.level === "moderate")) {
    suggestions.push("High TDS detected. Use a Reverse Osmosis (RO) water purifier.");
  }

  if (turbidityResult && turbidityResult.level === "unsafe") {
    suggestions.push("Water is turbid. Use a sediment filter and boil water before drinking.");
  }

  if (tempResult && tempResult.level !== "safe") {
    suggestions.push("Water temperature is not ideal. Store water in a cool, shaded area.");
  }

  if (overall === "unsafe") {
    suggestions.push("Do NOT drink this water without proper treatment.");
    suggestions.push("Consider getting your water professionally tested.");
  }

  return suggestions;
}

// POST /api/analyze — Analyze water quality parameters
router.post("/analyze", (req, res) => {
  const { ph, tds, turbidity, temperature } = req.body;

  // Validate inputs
  const errors = [];
  if (ph === undefined || ph === null || isNaN(Number(ph)))
    errors.push("pH is required and must be a number");
  else if (Number(ph) < 0 || Number(ph) > 14)
    errors.push("pH must be between 0 and 14");

  if (tds === undefined || tds === null || isNaN(Number(tds)))
    errors.push("TDS is required and must be a number");
  else if (Number(tds) < 0) errors.push("TDS cannot be negative");

  if (turbidity === undefined || turbidity === null || isNaN(Number(turbidity)))
    errors.push("Turbidity is required and must be a number");
  else if (Number(turbidity) < 0) errors.push("Turbidity cannot be negative");

  if (temperature === undefined || temperature === null || isNaN(Number(temperature)))
    errors.push("Temperature is required and must be a number");

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const phNum = Number(ph);
  const tdsNum = Number(tds);
  const turbNum = Number(turbidity);
  const tempNum = Number(temperature);

  const phResult = { param: "pH", value: phNum, ...analyzePH(phNum) };
  const tdsResult = { param: "TDS", value: `${tdsNum} ppm`, ...analyzeTDS(tdsNum) };
  const turbidityResult = {
    param: "Turbidity",
    value: `${turbNum} NTU`,
    ...analyzeTurbidity(turbNum),
  };
  const tempResult = {
    param: "Temperature",
    value: `${tempNum} °C`,
    ...analyzeTemperature(tempNum),
  };

  const results = [phResult, tdsResult, turbidityResult, tempResult];
  const overall = getOverallResult(results);
  const suggestions = getHealthSuggestions(overall, results);

  res.json({
    success: true,
    data: { results, overall, suggestions },
  });
});

module.exports = router;
