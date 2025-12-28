import React, { useEffect, useState } from "react";
import { fetchPnl } from "../api";

export default function DrawdownTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchPnl().then(data => setRows(data.daily));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Equity & Drawdown</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Date</th>
            <th className="p-2">Daily P&L</th>
            <th className="p-2">Equity</th>
            <th className="p-2">Drawdown</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{r.date}</td>
              <td className={`p-2 ${r.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                ₹ {r.pnl.toFixed(2)}
              </td>
              <td className="p-2">₹ {r.equity.toFixed(2)}</td>
              <td className="p-2 text-red-600">
                ₹ {r.drawdown.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
