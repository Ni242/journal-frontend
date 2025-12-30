import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

export default function StrategyPnlBarChart({ refresh }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiFetch("/analytics/strategy-pnl")
      .then(res => res.json())
      .then(res => setData(Array.isArray(res) ? res : []))
      .catch(() => setData([]));
  }, [refresh]);

  if (!data.length) {
    return (
      <div className="bg-white p-4 rounded shadow text-gray-500">
        No strategy PnL data
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">
        Strategy Performance (Net P&L)
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="strategy" />
          <YAxis />
          <Tooltip />
          
          {/* 🔥 ZERO LINE (CRITICAL FOR CLARITY) */}
          <ReferenceLine y={0} stroke="#888" />

          <Bar dataKey="pnl">
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.pnl >= 0 ? "#16a34a" : "#dc2626"} // ✅ FIX
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <p className="text-xs text-gray-400 mt-2">
        Green = Profitable · Red = Loss-making
      </p>
    </div>
  );
}
