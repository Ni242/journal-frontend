import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

export default function RiskUsageBarChart({ refresh }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiFetch("/risk-usage")
      .then(res => res.json())
      .then(setData)
      .catch(() => setData([]));
  }, [refresh]);

  const getColor = (risk) => {
    if (risk <= 1) return "#22c55e";   // green
    if (risk <= 2) return "#facc15";   // yellow
    return "#ef4444";                  // red
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">
        Risk % Used Per Day
      </h2>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis
            domain={[0, Math.max(5, Math.max(...data.map(d => d.risk_pct)) + 1)]}
            tickFormatter={(v) => `${v}%`}
          />

          <Tooltip formatter={(v) => `${v.toFixed(2)}%`} />

          {/* Risk Limits */}
          <ReferenceLine y={1} stroke="#22c55e" strokeDasharray="4 4" label="1% Safe" />
          <ReferenceLine y={2} stroke="#f97316" strokeDasharray="4 4" label="2% Max" />

          <Bar dataKey="risk_pct">
            <LabelList
              dataKey="risk_pct"
              position="top"
              formatter={(v) => `${v.toFixed(2)}%`}
            />
            {data.map((entry, index) => (
              <Cell key={index} fill={getColor(entry.risk_pct)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex gap-4 text-sm mt-3">
        <span className="text-green-600">● ≤ 1% Safe</span>
        <span className="text-yellow-500">● 1–2% Caution</span>
        <span className="text-red-600">● &gt; 2% Violation</span>
      </div>
    </div>
  );
}
