import React, { useEffect, useState } from "react";

export default function PnlSummary({ refresh }) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pnl")
      .then(res => res.json())
      .then(data => setSummary(data.summary))
      .catch(err => console.error(err));
  }, [refresh]);

  if (!summary) {
    return (
      <div className="bg-white p-4 rounded shadow">
        Loading P&L...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <div className="text-gray-500">Today</div>
        <div className={`text-2xl font-bold ${summary.today >= 0 ? "text-green-600" : "text-red-600"}`}>
          ₹ {summary.today.toFixed(2)}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="text-gray-500">This Week</div>
        <div className={`text-2xl font-bold ${summary.this_week >= 0 ? "text-green-600" : "text-red-600"}`}>
          ₹ {summary.this_week.toFixed(2)}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="text-gray-500">This Month</div>
        <div className={`text-2xl font-bold ${summary.this_month >= 0 ? "text-green-600" : "text-red-600"}`}>
          ₹ {summary.this_month.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
