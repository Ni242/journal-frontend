import { useEffect, useState } from "react";

export default function WinLossCharts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/analytics/strategy")
      .then(r => r.json())
      .then(setData);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-3">Win % by Strategy</h2>

      {data.map(s => (
        <div key={s.strategy} className="mb-2">
          <div className="flex justify-between text-sm">
            <span>{s.strategy}</span>
            <span>{s.win_rate}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-green-500 rounded"
              style={{ width: `${s.win_rate}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
