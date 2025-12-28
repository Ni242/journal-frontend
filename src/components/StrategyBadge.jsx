export default function StrategyBadge({ trade }) {
  const strategy = trade.final_strategy || trade.suggested_strategy;
  const isManual = trade.strategy_source === "MANUAL";

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold
        ${isManual ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}
    >
      {strategy || "—"} {isManual ? "(Manual)" : "(AI)"}
    </span>
  );
}
