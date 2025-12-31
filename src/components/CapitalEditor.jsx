import { useEffect, useState } from "react";
import { apiFetch } from "../api";


export default function CapitalEditor({ onUpdate }) {
  const [capital, setCapital] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // ---------------------------
  // Load current capital
  // ---------------------------
  useEffect(() => {
    apiFetch("/capital")
      .then(data => {
        setCapital(data.capital ?? "");
        setLoading(false);
      })
      .catch(() => {
        setMsg("❌ Failed to load capital");
        setLoading(false);
      });
  }, []);

  // ---------------------------
  // Save capital
  // ---------------------------
  const saveCapital = async () => {
    if (!capital || Number(capital) <= 0) {
      setMsg("Capital must be greater than 0");
      return;
    }

    setSaving(true);
    setMsg("");

    try {
      await apiFetch("/capital", {
        method: "POST",
        body: JSON.stringify({ capital: Number(capital) }),
      });

      setMsg("✅ Capital updated");
      onUpdate?.();
    } catch {
      setMsg("❌ Failed to update capital");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded shadow">
        Loading capital…
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">
        💼 Trading Capital
      </h2>

      <div className="flex items-center gap-3">
        <input
          type="number"
          className="border rounded px-3 py-1 w-40"
          value={capital}
          onChange={e => setCapital(e.target.value)}
          placeholder="Enter capital"
        />

        <button
          onClick={saveCapital}
          disabled={saving}
          className={`px-4 py-1 rounded text-white ${
            saving
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>

      {msg && (
        <div className="text-sm mt-2 text-gray-600">
          {msg}
        </div>
      )}
    </div>
  );
}
