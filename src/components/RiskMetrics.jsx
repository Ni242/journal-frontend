import React from "react";

export default function RiskMetrics({ summary }) {
  if (!summary) return null;

  const {
    max_drawdown,
    max_drawdown_pct,
    avg_daily_loss,
    worst_day,
    capital,
  } = summary;

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-semibold mb-4">Risk Metrics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Max Drawdown */}
        <div>
          <p className="text-sm text-gray-500">Max Drawdown</p>
          <p className="text-lg font-bold text-red-600">
            ₹{max_drawdown.toFixed(2)}
          </p>
          <p className="text-xs text-gray-400">
            {max_drawdown_pct.toFixed(2)}%
          </p>
        </div>

        {/* Avg Daily Loss */}
        <div>
          <p className="text-sm text-gray-500">Avg Daily Loss</p>
          <p className="text-lg font-bold text-red-600">
            ₹{avg_daily_loss.toFixed(2)}
          </p>
        </div>

        {/* Worst Day */}
        <div>
          <p className="text-sm text-gray-500">Worst Day</p>
          {worst_day ? (
            <>
              <p className="text-lg font-bold text-red-600">
                ₹{worst_day.net_pnl.toFixed(2)}
              </p>
              <p className="text-xs text-gray-400">{worst_day.date}</p>
            </>
          ) : (
            <p className="text-sm text-gray-400">—</p>
          )}
        </div>

        {/* Capital */}
        <div>
          <p className="text-sm text-gray-500">Capital</p>
          <p className="text-lg font-bold">
            ₹{capital.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
