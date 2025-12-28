export default function ChargesBreakdown({ daily }) {
  if (!daily?.length) return null;

  const c = daily[0].charges;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Brokerage & Charges</h2>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>Brokerage</div><div className="text-right">₹ {c.brokerage}</div>
        <div>Exchange Charges</div><div className="text-right">₹ {c.exchange}</div>
        <div>SEBI Charges</div><div className="text-right">₹ {c.sebi}</div>
        <div>Stamp Duty</div><div className="text-right">₹ {c.stamp}</div>
        <div>GST</div><div className="text-right">₹ {c.gst}</div>

        <div className="font-bold border-t pt-2">Total</div>
        <div className="font-bold text-right border-t pt-2">
          ₹ {c.total}
        </div>
      </div>
    </div>
  );
}
