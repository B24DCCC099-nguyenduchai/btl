import { useEffect, useState } from "react";
import api from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Orders</h2>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>Order #{o.id} - Total: {o.total}</li>
        ))}
      </ul>
    </div>
  );
}
