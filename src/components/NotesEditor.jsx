export default function NotesEditor({ trade, onUpdate }) {
  async function saveNotes(val) {
    await fetch(`http://127.0.0.1:8000/trades/${trade.id}/notes`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: val }),
    });

    const res = await fetch("http://127.0.0.1:8000/trades");
    onUpdate(await res.json());
  }

  return (
    <textarea
      className="border rounded w-full text-xs"
      defaultValue={trade.notes || ""}
      onBlur={e => saveNotes(e.target.value)}
      placeholder="Add notes..."
    />
  );
}
