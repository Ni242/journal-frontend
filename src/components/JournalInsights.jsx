import { useEffect, useState } from "react";
import { apiFetch } from "../api";

export default function JournalInsights() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/analytics/strategy")
      .then(data => {
        if (!Array.isArray(data) || !data.length) {
          setLoading(false);
          return;
        }

        // 🔍 Compute insights
        let worst = null;
        let best = null;

        data.forEach(s => {
          if (!worst || s.total_pnl < worst.total_pnl) {
            worst = s;
          }
          if (!best || s.win_rate > best.win_rate) {
            best = s;
          }
        });

        setInsights({
          worst_strategy: worst,
          best_strategy: best,
        });

        setLoading(false);
      })
      .catch(() => {
        setInsights(null);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded shadow">
        Loading journal insights…
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="bg-white p-4 rounded shadow text-gray-500">
        No insights available yet
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-3">
        📓 Journal Insights
      </h2>

      <div className="grid md:grid-cols-2 gap-4 text-sm">

        {/* ❌ Worst Strategy */}
        <div className="border rounded p-3 bg-red-50">
          <div className="font-semibold text-red-700">
            Worst Strategy
          </div>
          <div>
            {insights.worst_strategy.strategy}
          </div>
          <div className="text-red-600 font-semibold">
            ₹ {Number(insights.worst_strategy.total_pnl).toFixed(2)}
          </div>
        </div>

        {/* ✅ Best Strategy */}
        <div className="border rounded p-3 bg-green-50">
          <div className="font-semibold text-green-700">
            Best Win Rate
          </div>
          <div>
            {insights.best_strategy.strategy}
          </div>
          <div className="text-green-600 font-semibold">
            {Number(insights.best_strategy.win_rate).toFixed(2)}%
          </div>
        </div>

      </div>
    </div>
  );
}
