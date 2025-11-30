import { useEffect, useState } from "react";
import api from "../services/api";

export default function Customers() {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    api.get("/customers").then((res) => setList(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Customers</h2>
      <ul>
        {list.map((c) => (
          <li key={c.id}>{c.name} - {c.phone}</li>
        ))}
      </ul>
    </div>
  );
}
