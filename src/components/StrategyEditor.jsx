import { apiFetch } from "../api";

const STRATEGIES = [
  "Breakout",
  "Support",
  "Resistance",
  "Reversal",
  "Scalp",
  "Hedge",
  "Swing",
];

export default function StrategyEditor({ trade, onUpdate }) {
  async function saveStrategy(value) {
    // update strategy
    await apiFetch(`/trades/${trade.id}/strategy`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ final_strategy: value }),
    });

    // refresh trades list
    const updatedTrades = await apiFetch("/trades");
    onUpdate(updatedTrades);
  }

  return (
    <select
      className="ml-2 border rounded px-1 text-sm"
      value={trade.final_strategy || ""}
      onChange={e => saveStrategy(e.target.value)}
    >
      <option value="">Auto</option>

      {STRATEGIES.map(strategy => (
        <option key={strategy} value={strategy}>
          {strategy}
        </option>
      ))}
    </select>
  );
}
