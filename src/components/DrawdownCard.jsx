import React, { useEffect, useState } from "react";
import { fetchPnl } from "../api";

export default function DrawdownCard() {
  const [maxDD, setMaxDD] = useState(0);

  useEffect(() => {
    fetchPnl().then(data => setMaxDD(data.summary.max_drawdown));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <p className="text-sm text-gray-500">Max Drawdown</p>
      <p className="text-2xl font-bold text-red-600">
        ₹ {maxDD.toFixed(2)}
      </p>
    </div>
  );
}
