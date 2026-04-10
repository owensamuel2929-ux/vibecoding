import { useState, useRef } from "react";
import { uploadCSV } from "../api";

export default function UploadCSV({ onUpload }) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const inputRef = useRef();

  async function handleFile(file) {
    if (!file || !file.name.endsWith(".csv")) {
      setMessage({ type: "error", text: "Please upload a .csv file" });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const result = await uploadCSV(file);
      setMessage({ type: "success", text: `Imported ${result.count} transactions from ${result.filename}` });
      onUpload();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }

  return (
    <div className="mb-6">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
          ${dragging ? "border-blue-400 bg-blue-900/20" : "border-slate-600 hover:border-slate-400"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
        <p className="text-slate-400 text-sm">
          {loading ? "Uploading..." : "Drop your bank CSV here or click to browse"}
        </p>
        <p className="text-slate-600 text-xs mt-1">Supports Chase, Bank of America, and generic CSV formats</p>
      </div>
      {message && (
        <p className={`mt-2 text-sm ${message.type === "error" ? "text-red-400" : "text-green-400"}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
