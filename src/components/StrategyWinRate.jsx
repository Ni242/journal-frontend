import React, { useEffect, useState } from "react";

export default function StrategyWinRate() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch("/analytics/strategy")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load strategy analytics");
        return res.json();
      })
      .then(json => {
        setData(Array.isArray(json) ? json : []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded shadow">
        Loading strategy analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded shadow text-red-600">
        {error}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-white p-4 rounded shadow">
        No strategy data available
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">
        Strategy Win Percentage
      </h2>

      <div className="space-y-4">
        {data.map(item => (
          <div key={item.strategy}>
            {/* Header */}
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">
                {item.strategy}
              </span>
              <span className="text-gray-600">
                {item.win_rate}% · {item.trades} trades
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded h-3">
              <div
                className={`h-3 rounded transition-all ${
                  item.win_rate >= 60
                    ? "bg-green-500"
                    : item.win_rate >= 40
                    ? "bg-yellow-400"
                    : "bg-red-500"
                }`}
                style={{ width: `${item.win_rate}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
