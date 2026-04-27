/**
 * Rule-based water quality analysis utilities.
 * Evaluates pH, TDS, Turbidity, and Temperature parameters
 * and returns status, overall result, and health suggestions.
 */

export function analyzePH(ph) {
  if (ph < 6.5) return { status: "Acidic (Unsafe)", level: "unsafe" };
  if (ph <= 8.5) return { status: "Safe", level: "safe" };
  return { status: "Alkaline (Unsafe)", level: "unsafe" };
}

export function analyzeTDS(tds) {
  if (tds < 300) return { status: "Excellent", level: "safe" };
  if (tds <= 600) return { status: "Good", level: "moderate" };
  if (tds <= 1000) return { status: "Fair", level: "moderate" };
  return { status: "Unsafe", level: "unsafe" };
}

export function analyzeTurbidity(turbidity) {
  if (turbidity < 5) return { status: "Safe", level: "safe" };
  return { status: "Unsafe", level: "unsafe" };
}

export function analyzeTemperature(temp) {
  if (temp >= 10 && temp <= 25) return { status: "Ideal", level: "safe" };
  if ((temp >= 5 && temp < 10) || (temp > 25 && temp <= 35))
    return { status: "Acceptable", level: "moderate" };
  return { status: "Extreme", level: "unsafe" };
}

export function getOverallResult(results) {
  const levels = results.map((r) => r.level);
  if (levels.includes("unsafe")) return "unsafe";
  if (levels.includes("moderate")) return "moderate";
  return "safe";
}

export function getHealthSuggestions(overall, results) {
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
    suggestions.push(
      "Water temperature is not ideal. Store water in a cool, shaded area."
    );
  }

  if (overall === "unsafe") {
    suggestions.push("Do NOT drink this water without proper treatment.");
    suggestions.push("Consider getting your water professionally tested.");
  }

  return suggestions;
}

export function analyzeWater(ph, tds, turbidity, temperature) {
  const phResult = { param: "pH", value: ph, ...analyzePH(ph) };
  const tdsResult = { param: "TDS", value: `${tds} ppm`, ...analyzeTDS(tds) };
  const turbidityResult = {
    param: "Turbidity",
    value: `${turbidity} NTU`,
    ...analyzeTurbidity(turbidity),
  };
  const tempResult = {
    param: "Temperature",
    value: `${temperature} °C`,
    ...analyzeTemperature(temperature),
  };

  const results = [phResult, tdsResult, turbidityResult, tempResult];
  const overall = getOverallResult(results);
  const suggestions = getHealthSuggestions(overall, results);

  return { results, overall, suggestions };
}
