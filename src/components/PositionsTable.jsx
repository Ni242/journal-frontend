import { useEffect, useState } from "react";
import { apiFetch } from "../api";

export default function PositionsTable({ refresh }) {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiFetch("/positions")
      .then(data => {
        setPositions(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load positions");
        setPositions([]);
      })
      .finally(() => setLoading(false));
  }, [refresh]);

  if (loading) {
    return <div className="bg-white p-4 rounded shadow">Loading positions…</div>;
  }

  if (error) {
    return <div className="bg-white p-4 rounded shadow text-red-500">{error}</div>;
  }

  if (!positions.length) {
    return <div className="bg-white p-4 rounded shadow text-gray-500">No realized positions</div>;
  }

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Positions (Realized)</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Symbol</th>
            <th className="p-2">Lots</th>
            <th className="p-2">Avg Buy</th>
            <th className="p-2">PnL (Pts)</th>
            <th className="p-2">PnL (₹)</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((p, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{p.symbol}</td>
              <td className="p-2">{p.lots}</td>
              <td className="p-2">₹ {p.avg_price}</td>
              <td className={`p-2 ${p.realized_pnl_points >= 0 ? "text-green-600" : "text-red-600"}`}>
                {p.realized_pnl_points}
              </td>
              <td className={`p-2 ${p.realized_pnl_amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                ₹ {p.realized_pnl_amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
