import { useEffect, useState } from "react";

export default function RiskUsageTable({ refresh }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pnl/")
      .then(res => res.json())
      .then(data => setRows(data.daily || []));
  }, [refresh]);

  if (!rows.length) return null;

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-3">
        Risk % Used Per Day
      </h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Date</th>
            <th className="p-2 text-right">Day P&L (₹)</th>
            <th className="p-2 text-right">Risk Used (%)</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => {
            const risk = Number(r.risk_pct ?? 0);

            return (
              <tr key={i} className="border-b">
                <td className="p-2">{r.date}</td>

                <td
                  className={`p-2 text-right font-medium ${
                    r.net_pnl >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ₹ {r.net_pnl.toFixed(2)}
                </td>

                <td
                  className={`p-2 text-right font-bold ${
                    risk <= 1
                      ? "text-green-600"
                      : risk <= 2
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {risk.toFixed(2)} %
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Risk legend */}
      <div className="text-xs text-gray-500 mt-2">
        🟢 ≤ 1% Safe &nbsp; 🟡 1–2% Caution &nbsp; 🔴 &gt; 2% Risk Violation
      </div>
    </div>
  );
}
