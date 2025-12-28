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
    await fetch(`http://127.0.0.1:8000/trades/${trade.id}/strategy`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ final_strategy: value }),
    });

    // refresh trades
    const res = await fetch("http://127.0.0.1:8000/trades");
    onUpdate(await res.json());
  }

  return (
    <select
      className="ml-2 border rounded px-1"
      value={trade.final_strategy || ""}
      onChange={e => saveStrategy(e.target.value)}
    >
      <option value="">Auto</option>
      {STRATEGIES.map(s => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
