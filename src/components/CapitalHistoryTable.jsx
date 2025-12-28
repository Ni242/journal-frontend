import { useEffect, useState } from "react";

export default function CapitalHistoryTable({ refresh }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pnl/")
      .then(res => res.json())
      .then(data => {
        setRows(data.daily || []);
      });
  }, [refresh]);

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
            <th className="p-2 text-right">Day P&L (₹)</th>
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
                ₹ {r.net_pnl.toFixed(2)}
              </td>

              <td className="p-2 text-right font-semibold">
                ₹ {r.equity.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
