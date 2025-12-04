import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/productApi";
import { getCustomers } from "../api/customerApi";
import { addOrder } from "../api/orderApi";
import { Order, OrderItem } from "../types/order";

export default function OrderForm(): JSX.Element {
  const [products, setProducts] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [customerId, setCustomerId] = useState<number | "">("");
  const [lines, setLines] = useState<OrderItem[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const p = await getProducts();
        setProducts(p || []);
        const c = await getCustomers();
        setCustomers(c || []);
        if (p && p.length) setLines([{ productId: p[0].id, quantity: 1 }]);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  function addLine() {
    setLines([...lines, { productId: products[0]?.id || 0, quantity: 1 }]);
  }
  function updateLine(i: number, payload: OrderItem) {
    const next = [...lines];
    next[i] = payload;
    setLines(next);
  }
  function removeLine(i: number) {
    setLines(lines.filter((_, idx) => idx !== i));
  }

  async function submit() {
    if (!customerId) {
      alert("Chọn khách hàng");
      return;
    }
    if (!lines.length) {
      alert("Thêm sản phẩm");
      return;
    }

    const order: Order = {
      id: 0,
      customerId: Number(customerId),
      date: new Date().toISOString(),
      items: lines,
    };

    try {
      await addOrder(order);
      alert("Tạo đơn hàng thành công");
      nav("/orders");
    } catch (e) {
      console.error(e);
      alert("Tạo đơn thất bại");
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow max-w-3xl">
      <h3 className="text-xl mb-3">Tạo đơn hàng</h3>

      <div className="mb-3">
        <select className="w-full p-2 border rounded" value={String(customerId)} onChange={(e) => setCustomerId(Number(e.target.value))}>
          <option value="">-- Chọn khách hàng --</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {lines.map((ln, i) => (
        <div key={i} className="grid grid-cols-3 gap-2 mb-2">
          <select value={String(ln.productId)} onChange={(e) => updateLine(i, { ...ln, productId: Number(e.target.value) })} className="p-2 border rounded">
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <input type="number" value={ln.quantity} min={1} onChange={(e) => updateLine(i, { ...ln, quantity: Number(e.target.value) })} className="p-2 border rounded" />

          <button type="button" onClick={() => removeLine(i)} className="px-3 py-1 bg-red-500 text-white rounded">
            Xóa
          </button>
        </div>
      ))}

      <div className="flex gap-2 mb-3">
        <button type="button" onClick={addLine} className="px-3 py-1 bg-blue-600 text-white rounded">
          Thêm dòng
        </button>
        <button onClick={submit} className="px-3 py-1 bg-green-600 text-white rounded">
          Tạo đơn
        </button>
      </div>
    </div>
  );
}
