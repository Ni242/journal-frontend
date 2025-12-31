// src/api.js
export const API_BASE = "https://journal-live.onrender.com";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API error");
  }

  return res.status === 204 ? null : res.json();
}
