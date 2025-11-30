import { useEffect, useState } from "react";
import api from "../api/axios";
import { Order, Customer, Product } from "../types";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customerId, setCustomerId] = useState<number>(0);
  const [items, setItems] = useState<{ productId: number; quantity: number }[]>(
    []
  );

  const loadAll = async () => {
    const [o, c, p] = await Promise.all([
      api.get("/orders"),
      api.get("/customers"),
      api.get("/products"),
    ]);
    setOrders(o.data);
    setCustomers(c.data);
    setProducts(p.data);
  };

  const addOrder = async () => {
    await api.post("/orders", { customerId, date: new Date(), items });
    setItems([]);
    loadAll();
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>

      <div className="bg-white p-4 shadow rounded w-96 mb-5">
        <select
          className="border p-2 w-full mb-2"
          onChange={(e) => setCustomerId(+e.target.value)}
        >
          <option value={0}>-- Chọn khách hàng --</option>
          {customers.map((c) => (
            <option value={c.id} key={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          className="bg-green-600 text-white p-2 w-full"
          onClick={() =>
            setItems([...items, { productId: products[0].id!, quantity: 1 }])
          }
        >
          + Thêm sản phẩm
        </button>

        {items.map((item, i) => (
          <div key={i} className="border p-2 mt-2 rounded">
            <select
              className="border p-1 mr-2"
              value={item.productId}
              onChange={(e) =>
                (item.productId = +e.target.value) || setItems([...items])
              }
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="border p-1 w-20"
              value={item.quantity}
              onChange={(e) =>
                (item.quantity = +e.target.value) || setItems([...items])
              }
            />
          </div>
        ))}

        <button onClick={addOrder} className="bg-blue-500 text-white p-2 w-full mt-3">
          Tạo đơn hàng
        </button>
      </div>

      <h2 className="font-bold text-xl mb-2">Danh sách đơn hàng</h2>
      <ul>
        {orders.map((o) => (
          <li key={o.id} className="bg-white p-3 border mb-2 shadow rounded">
            Đơn #{o.id} – Khách hàng {o.customerId}
          </li>
        ))}
      </ul>
    </div>
  );
}
