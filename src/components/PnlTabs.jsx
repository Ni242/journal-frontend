import React, { useEffect, useState } from "react";
import { apiFetch } from "../api";


export default function PnlTabs({ refresh }) {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("daily");

  useEffect(() => {
    apiFetch("/pnl")

      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [refresh]);

  if (!data) {
    return (
      <div className="bg-white p-4 rounded shadow">
        Loading P&L...
      </div>
    );
  }

  const rows =
    tab === "daily" ? data.daily :
    tab === "weekly" ? data.weekly :
    data.monthly;

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-4">
        Performance Breakdown
      </h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {["daily", "weekly", "monthly"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1 rounded ${
              tab === t
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Table */}
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">
              {tab === "daily"
                ? "Date"
                : tab === "weekly"
                ? "Week"
                : "Month"}
            </th>
            <th className="p-2 text-right">P&L (₹)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const value =
              tab === "daily"
                ? row.net_pnl
                : row.pnl;

            const safeValue = Number(value ?? 0);

            return (
              <tr key={i} className="border-t">
                <td className="p-2">
                  {row.date || row.week || row.month}
                </td>
                <td
                  className={`p-2 text-right font-semibold ${
                    safeValue < 0
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  ₹ {safeValue.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
