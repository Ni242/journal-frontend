import { apiFetch } from "../api";

export default function NotesEditor({ trade, onUpdate }) {

  async function saveNotes(val) {
    try {
      // 🔹 Update notes
      await apiFetch(`/trades/${trade.id}/notes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: val }),
      });

      // 🔹 Refresh trades list
      const updatedTrades = await apiFetch("/trades");
      onUpdate(updatedTrades);

    } catch (err) {
      console.error("Failed to save notes", err);
    }
  }

  return (
    <textarea
      className="border rounded w-full text-xs p-1"
      defaultValue={trade.notes || ""}
      onBlur={e => saveNotes(e.target.value)}
      placeholder="Add notes…"
    />
  );
}
