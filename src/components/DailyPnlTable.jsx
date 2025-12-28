import React, { useEffect, useState } from "react";
import { fetchPnl } from "../api";

export default function DailyPnlTable() {
  const [daily, setDaily] = useState([]);

  useEffect(() => {
    fetchPnl().then(data => setDaily(data.daily));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Day-wise P&L</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Date</th>
            <th className="p-2">P&L (₹)</th>
          </tr>
        </thead>
        <tbody>
          {daily.map((d, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{d.date}</td>
              <td
                className={`p-2 font-medium ${
                  d.pnl >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ₹ {d.pnl.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
