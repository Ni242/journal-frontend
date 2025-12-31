import React, { useEffect, useState } from "react";
import { apiFetch } from "../api";


const STRATEGIES = [
  "",
  "Scalp",
  "Swing",
  "Hedge",
  "Breakout",
  "Reversal",
  "Support",
  "Resistance",
  "Range",
];

export default function TradesTable({ refresh }) {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  // =========================
  // FETCH TRADES
  // =========================
  const fetchTrades = () => {
    setLoading(true);

    apiFetch("/trades")
      .then(res => res.json())
      .then(data => {
        setTrades(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchTrades();
  }, [refresh]);

  // =========================
  // PATCH HELPER (ONE ENDPOINT)
  // =========================
  const patchTrade = async (tradeId, payload) => {
    setSavingId(tradeId);

    await fetch(`http://127.0.0.1:8000/trades/${tradeId}/strategy`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSavingId(null);
  };

  // =========================
  // UPDATE STRATEGY (AUTO SAVE)
  // =========================
  const updateStrategy = async (tradeId, strategy) => {
    // Optimistic UI
    setTrades(prev =>
      prev.map(t =>
        t.id === tradeId
          ? {
              ...t,
              final_strategy: strategy,
              strategy_source: "MANUAL",
            }
          : t
      )
    );

    await patchTrade(tradeId, { strategy });
  };

  // =========================
  // UPDATE NOTES (AUTO SAVE)
  // =========================
  const updateNotes = async (tradeId, notes) => {
    // Optimistic UI
    setTrades(prev =>
      prev.map(t =>
        t.id === tradeId ? { ...t, notes } : t
      )
    );

    await patchTrade(tradeId, { notes });
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded shadow">
        Loading trades...
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow overflow-x-auto">
      <h2 className="text-lg font-semibold mb-3">Trades</h2>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">Symbol</th>
            <th className="p-2 text-left">Side</th>
            <th className="p-2 text-right">Qty</th>
            <th className="p-2 text-right">Price</th>
            <th className="p-2 text-left">Strategy</th>
            <th className="p-2 text-left">Notes</th>
          </tr>
        </thead>

        <tbody>
          {trades.map(t => (
            <tr key={t.id} className="border-b hover:bg-gray-50">
              <td className="p-2">
                {new Date(t.trade_time).toLocaleString()}
              </td>

              <td className="p-2">{t.symbol}</td>

              <td
                className={`p-2 font-semibold ${
                  t.side === "BUY"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {t.side}
              </td>

              <td className="p-2 text-right">{t.quantity}</td>
              <td className="p-2 text-right">
                ₹ {Number(t.price).toFixed(2)}
              </td>

              {/* ===== STRATEGY ===== */}
              <td className="p-2">
                <select
                  className="border rounded px-2 py-1"
                  value={t.final_strategy || ""}
                  onChange={e =>
                    updateStrategy(t.id, e.target.value)
                  }
                >
                  {STRATEGIES.map(s => (
                    <option key={s} value={s}>
                      {s || "—"}
                    </option>
                  ))}
                </select>

                <div className="text-xs mt-1">
                  {savingId === t.id ? (
                    <span className="text-yellow-600">
                      Saving…
                    </span>
                  ) : (
                    <span className="text-gray-500">
                      {t.strategy_source === "AI"
                        ? "🤖 AI"
                        : "✍️ Manual"}{" "}
                      · Saved ✓
                    </span>
                  )}
                </div>
              </td>

              {/* ===== NOTES ===== */}
              <td className="p-2">
                <textarea
                  className="border rounded px-2 py-1 w-48 text-xs"
                  placeholder="Trade notes..."
                  value={t.notes || ""}
                  onChange={e =>
                    updateNotes(t.id, e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
