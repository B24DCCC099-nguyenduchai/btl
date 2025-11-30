import { useState } from "react";
import api from "../services/api";

export default function Import() {
  const [file, setFile] = useState<File | null>(null);

  const upload = async () => {
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    await api.post("/import", form);
    alert("Import success!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Import Data</h2>

      <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />

      <button onClick={upload}>Upload</button>
    </div>
  );
}
