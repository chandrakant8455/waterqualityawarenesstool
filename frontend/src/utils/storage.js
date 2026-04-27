/**
 * Local storage utilities for persisting water quality analysis results.
 */

const STORAGE_KEY = "water_quality_results";

export function saveResult(result) {
  const existing = getResults();
  const entry = {
    ...result,
    id: Date.now(),
    timestamp: new Date().toISOString(),
  };
  existing.unshift(entry);
  // Keep only the last 50 results
  const trimmed = existing.slice(0, 50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  return entry;
}

export function getResults() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function clearResults() {
  localStorage.removeItem(STORAGE_KEY);
}
