import React from "react";

export default function RiskAlerts({ alerts }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      {alerts.map((a, i) => (
        <div
          key={i}
          className={`p-4 rounded shadow text-sm font-semibold ${
            a.type === "danger"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          🚦 {a.message}
        </div>
      ))}
    </div>
  );
}
