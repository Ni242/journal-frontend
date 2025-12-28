import React, { useState } from "react";

import CsvUpload from "./components/CsvUpload";
import CapitalEditor from "./components/CapitalEditor";
import PnlSummary from "./components/PnlSummary";
import PnlTabs from "./components/PnlTabs";
import StrategyAnalytics from "./components/StrategyAnalytics";
import TradesTable from "./components/TradesTable";
import PositionsTable from "./components/PositionsTable";
import CapitalHistoryTable from "./components/CapitalHistoryTable";
import RiskUsageTable from "./components/RiskUsageTable";
import RiskUsageBarChart from "./components/RiskUsageBarChart"; // ✅ NEW
import StrategyPnLBarChart from "./components/StrategyPnLBarChart";



export default function App() {
  const triggered = useState(0);
  const refresh = triggered[0];
  const setRefresh = triggered[1];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ================= HEADER ================= */}
        <header>
          <h1 className="text-3xl font-bold text-gray-800">
            Trading Journal
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track performance · Analyze strategies · Improve discipline
          </p>
        </header>

        {/* ================= CAPITAL EDITOR ================= */}
        <CapitalEditor
          onUpdate={() => setRefresh(r => r + 1)}
        />

        {/* ================= CSV UPLOAD ================= */}
        <CsvUpload
          onUpload={() => setRefresh(r => r + 1)}
        />

        {/* ================= PNL SUMMARY ================= */}
        <PnlSummary refresh={refresh} />

        {/* ================= PNL BREAKDOWN ================= */}
        <PnlTabs refresh={refresh} />

        {/* ================= CAPITAL HISTORY ================= */}
        <CapitalHistoryTable refresh={refresh} />

        {/* ================= RISK METRICS ================= */}
        <RiskUsageTable refresh={refresh} />
        <RiskUsageBarChart refresh={refresh} /> {/* ✅ VISUAL */}

        {/* ================= STRATEGY ANALYTICS ================= */}
        <StrategyAnalytics refresh={refresh} />

        {/* ================= TRADES TABLE ================= */}
        <TradesTable refresh={refresh} />

        {/* ================= POSITIONS ================= */}
        <PositionsTable refresh={refresh} />

        <StrategyPnLBarChart refresh={refresh} />

      </div>
    </div>
  );
}
