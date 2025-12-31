import { useState } from "react";
import { API_BASE } from "../api";

export default function CsvUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");

  async function uploadCsv() {
    if (!file) {
      setMsg("Please select a CSV file");
      return;
    }

    setUploading(true);
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/import/csv`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      setMsg("✅ CSV uploaded successfully");
      onUpload?.();
    } catch (err) {
      console.error(err);
      setMsg("❌ CSV upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">Upload Dhan Executed Orders</h2>

      <div className="flex items-center gap-3">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={uploadCsv}
          disabled={uploading}
          className={`px-4 py-1 rounded text-white ${
            uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </div>

      {msg && <div className="text-sm mt-2">{msg}</div>}
    </div>
  );
}