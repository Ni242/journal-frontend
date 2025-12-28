import { useEffect, useState } from "react";

export default function StrategyAnalytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/analytics/strategy")
      .then(res => res.json())
      .then(res => {
        setData(Array.isArray(res) ? res : []);
        setLoading(false);
      })
      .catch(() => {
        setData([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded shadow">
        Loading strategy analytics…
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-white p-4 rounded shadow text-gray-500">
        No strategy analytics available yet
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-3 text-lg">
        Strategy Performance
      </h2>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b text-gray-600">
            <th className="p-2 text-left">Strategy</th>
            <th className="p-2 text-center">Trades</th>
            <th className="p-2 text-center">Win %</th>
            <th className="p-2 text-center">Avg R:R</th>
            <th className="p-2 text-right">Total PnL</th>
          </tr>
        </thead>

        <tbody>
          {data.map((s, idx) => {
            const trades = s.trades ?? 0;
            const winRate = s.win_rate ?? 0;
            const avgRR = s.avg_rr;
            const totalPnl = s.total_pnl ?? 0;

            return (
              <tr
                key={`${s.strategy}-${idx}`}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-2 font-medium">
                  {s.strategy || "Unclassified"}
                </td>

                <td className="p-2 text-center">
                  {trades}
                </td>

                <td
                  className={`p-2 text-center font-semibold ${
                    winRate >= 50
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {winRate.toFixed(2)}%
                </td>

                <td className="p-2 text-center">
                  {avgRR !== null && avgRR !== undefined
                    ? avgRR.toFixed(2)
                    : "—"}
                </td>

                <td
                  className={`p-2 text-right font-semibold ${
                    totalPnl >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  ₹ {Number(totalPnl).toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
