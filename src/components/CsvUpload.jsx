import { useState } from "react";
import { API_BASE } from "../api";

export default function CsvUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  async function upload() {
    if (!file) {
      setMsg("Please select a CSV file");
      return;
    }

    setUploading(true);
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/import/csv/trades`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();

      setMsg(`✅ Imported ${data.inserted} trades`);
      onUpload?.();
    } catch (err) {
      console.error(err);
      setMsg("❌ Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-3">
        Upload Dhan Executed Orders
      </h2>

      <div className="flex items-center gap-3">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm"
        />

        <button
          onClick={upload}
          disabled={uploading}
          className={`px-4 py-2 rounded-lg text-white ${
            uploading
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </div>

      {msg && <p className="mt-2 text-sm text-gray-600">{msg}</p>}
    </div>
  );
}
