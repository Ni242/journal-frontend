import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { apiFetch } from "../api";

export default function WinLossChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    apiFetch("/analytics/win-loss")
      .then(r => r.json())
      .then(setData);
  }, []);

  if (!data) return null;

  const chartData = [
    { name: "Wins", value: data.wins },
    { name: "Losses", value: data.losses },
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-3">Win vs Loss</h2>

      <PieChart width={250} height={250}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          label
        >
          <Cell fill="#16a34a" />
          <Cell fill="#dc2626" />
        </Pie>
        <Tooltip />
      </PieChart>

      <div className="text-center mt-2 text-sm">
        Win %: <b>{data.win_pct}%</b>
      </div>
    </div>
  );
}
