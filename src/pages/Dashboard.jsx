import React from "react";
import { useEffect, useState } from "react";
import api from "../api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function Dashboard() {
  const [positions, setPositions] = useState([]);
  const [pnl, setPnl] = useState([]);

  useEffect(() => {
    api.get("/positions").then((r) => setPositions(r.data));
    api.get("/analytics/daily-pnl").then((r) => setPnl(r.data));
  }, []);

  return (
    <>
      {/* POSITIONS */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">
          Positions
        </h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-1">Symbol</th>
              <th className="border p-1">Qty</th>
              <th className="border p-1">Avg Price</th>
              <th className="border p-1">Realized P&L</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((p, i) => (
              <tr key={i} className="text-center border-t">
                <td className="border p-1">{p.symbol}</td>
                <td className="border p-1">{p.net_qty}</td>
                <td className="border p-1">{p.avg_price}</td>
                <td
                  className={`border p-1 ${
                    p.realized_pnl >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {p.realized_pnl}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EQUITY CURVE */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">
          Equity Curve
        </h2>

        <Line
          data={{
            labels: pnl.map((d) => d.date),
            datasets: [
              {
                label: "Equity",
                data: pnl.map((d) => d.equity),
                borderColor: "blue",
              },
            ],
          }}
        />
      </div>
    </>
  );
}
