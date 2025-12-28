export default function BrokerageSummary({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Brokerage & Charges</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Total Turnover</span>
          <span>₹ {data.turnover.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-red-600">
          <span>Total Charges</span>
          <span>₹ {data.total_charges.toFixed(2)}</span>
        </div>

        <hr />

        <div className="flex justify-between font-semibold">
          <span>Net P&L (After Charges)</span>
          <span
            className={
              data.net_pnl >= 0 ? "text-green-600" : "text-red-600"
            }
          >
            ₹ {data.net_pnl.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
