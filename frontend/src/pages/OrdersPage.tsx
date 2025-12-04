import React, { useEffect, useState } from "react";
import { getOrders, deleteOrder, completeOrder } from "../api/orderApi";
import { getProducts } from "../api/productApi";
import { getCustomers } from "../api/customerApi";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

export default function OrdersPage(): JSX.Element {
  const [orders, setOrders] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const nav = useNavigate();

  async function load() {
    try {
      const r = await getOrders();
      setOrders(r.data || []);
    } catch (e) {
      console.error(e);
      setOrders([]);
    }
  }

  async function loadLookups() {
    try {
      const p = await getProducts();
      setProducts(p.data || []);
      const c = await getCustomers();
      setCustomers(c.data || []);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    load();
    loadLookups();
  }, []);

  async function onDelete(id: number) {
    if (!confirm("Xóa đơn hàng?")) return;
    try {
      await deleteOrder(id);
      await load();
    } catch (e) {
      alert("Xóa thất bại");
    }
  }

  async function onComplete(id: number) {
    if (!confirm("Đánh dấu hoàn tất?")) return;
    try {
      await completeOrder(id);
      await load();
    } catch (e) {
      alert("Không thể hoàn tất");
    }
  }

  const filtered = orders.filter((o) => {
    const qq = q.toLowerCase();
    return String(o.id).includes(q) || (o.customer_name || "").toLowerCase().includes(qq) || (o.status || "").toLowerCase().includes(qq);
  });

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Đơn hàng</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => nav("/orders/new")}>Tạo đơn</button>
        </div>
      </div>

      <SearchBar value={q} onChange={setQ} placeholder="Tìm theo mã, khách, trạng thái..." />

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left">
            <th className="p-2">Mã</th>
            <th className="p-2">Khách</th>
            <th className="p-2">Ngày</th>
            <th className="p-2">Sản phẩm</th>
            <th className="p-2">Trạng thái</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((o) => (
            <tr key={o.id} className="border-t">
              <td className="p-2">{o.id}</td>
              <td className="p-2">{o.customer_name || o.customerId}</td>
              <td className="p-2">{o.date}</td>
              <td className="p-2">{(o.items || []).map((it: any) => `${it.name || it.productId} x${it.quantity}`).join(", ")}</td>
              <td className="p-2">{o.status}</td>
              <td className="p-2 flex gap-2">
                {o.status !== "Completed" && <button onClick={() => onComplete(o.id)} className="px-2 py-1 bg-blue-600 text-white rounded">Hoàn tất</button>}
                <button onClick={() => onDelete(o.id)} className="px-2 py-1 bg-red-500 text-white rounded">Xóa</button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan={6} className="p-4 text-center text-gray-500">Không có đơn hàng</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
