import React from "react";
import { useState } from "react";
import api from "../api";

export default function CsvUpload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const upload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/import/csv/trades", formData);
      setMsg(`Inserted trades: ${res.data.inserted}`);
    } catch (err) {
      setMsg("Upload failed");
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="font-semibold mb-2">
        Upload Dhan Executed Orders
      </h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={upload}
        className="ml-3 px-4 py-1 bg-blue-600 text-white rounded"
      >
        Upload
      </button>

      {msg && (
        <p className="mt-2 text-sm text-green-600">
          {msg}
        </p>
      )}
    </div>
  );
}
