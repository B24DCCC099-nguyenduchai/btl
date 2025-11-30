import { useEffect, useState } from "react";
import api from "../services/api";

export default function Products() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    api.get("/products").then((res) => setData(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>
      <ul>
        {data.map((p) => (
          <li key={p.id}>{p.name} - {p.price}</li>
        ))}
      </ul>
    </div>
  );
}
