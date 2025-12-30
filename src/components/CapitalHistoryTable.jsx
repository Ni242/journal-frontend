import { useEffect, useState } from "react";
import { apiFetch } from "../api";

export default function CapitalHistoryTable({ refresh }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/pnl")
      .then(data => {
        setRows(data.daily || []);
        setLoading(false);
      })
      .catch(() => {
        setRows([]);
        setLoading(false);
      });
  }, [refresh]);

  if (loading) {
    return (
      <div className="bg-white rounded shadow p-4">
        Loading capital history…
      </div>
    );
  }

  if (!rows.length) return null;

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-3">
        Capital History (Day-by-Day)
      </h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Date</th>
            <th className="p-2 text-right">Day P&amp;L (₹)</th>
            <th className="p-2 text-right">Remaining Capital (₹)</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{r.date}</td>

              <td
                className={`p-2 text-right font-medium ${
                  r.net_pnl >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ₹ {Number(r.net_pnl).toFixed(2)}
              </td>

              <td className="p-2 text-right font-semibold">
                ₹ {Number(r.equity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
