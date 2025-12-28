import React from "react";
import { useState } from "react";
import { apiFetch } from "../api";


export default function CsvUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  async function upload() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE}/import/csv/trades`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (res.ok) {
      setMsg(`Imported ${data.inserted} trades`);
      onUpload();
    } else {
      setMsg("Upload failed");
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
          onChange={e => setFile(e.target.files[0])}
          className="block w-full text-sm"
        />

        <button
          onClick={upload}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Upload
        </button>
      </div>

      {msg && <p className="mt-2 text-sm text-gray-600">{msg}</p>}
    </div>
  );
}
