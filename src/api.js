// src/api.js

// 🔥 Backend base URL (Render backend)
export const API_BASE = "https://journal-live.onrender.com";

/**
 * Unified API fetch helper
 * - Handles base URL
 * - Handles JSON
 * - Throws on HTTP errors
 */
export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "omit", // no cookies needed
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  // Some endpoints may return empty response
  if (res.status === 204) return null;

  return res.json();
}
