import { useEffect, useState } from "react";

export default function PnlSummary({ refresh }) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pnl/")
      .then(res => res.json())
      .then(data => {
        setSummary(data.summary || null);
      })
      .catch(() => setSummary(null));
  }, [refresh]);

  if (!summary) {
    return (
      <div className="bg-white p-4 rounded shadow">
        Loading P&L summary…
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      {/* ===== PERFORMANCE ===== */}
      <Card label="Today P&L" value={summary.today} />
      <Card label="This Week" value={summary.this_week} />
      <Card label="This Month" value={summary.this_month} />
      <Card label="Net Total" value={summary.net_total} />

      {/* ===== COSTS ===== */}
      <Card label="Gross P&L" value={summary.gross_total} />
      <Card label="Charges / Brokerage" value={summary.charges_total} />
      <Card label="Max Drawdown" value={summary.max_drawdown} />

      {/* ===== CAPITAL (FIXED) ===== */}
      <Card
        label="Remaining Capital"
        value={summary.remaining_capital}
        highlight
      />

    </div>
  );
}

function Card({ label, value, highlight = false }) {
  const num = Number(value ?? 0);

  return (
    <div
      className={`bg-white p-4 rounded shadow ${
        highlight ? "border-2 border-blue-500" : ""
      }`}
    >
      <div className="text-sm text-gray-500">{label}</div>
      <div
        className={`text-lg font-semibold ${
          num >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        ₹ {num.toFixed(2)}
      </div>
    </div>
  );
}
