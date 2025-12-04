import React, { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { getCustomers } from "../api/customerApi";
import { getOrders } from "../api/orderApi";
import SearchBar from "../components/SearchBar";

export default function SearchPage(): JSX.Element {
  const [q, setQ] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const p = await getProducts();
        setProducts(p || []);
        const c = await getCustomers();
        setCustomers(c || []);
        const o = await getOrders();
        setOrders(o || []);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const pRes = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || (p as any).code?.toLowerCase().includes(q.toLowerCase()));
  const cRes = customers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.address?.toLowerCase().includes(q.toLowerCase()));
  const oRes = orders.filter((o) => String(o.id).includes(q) || (o.customer_name || "").toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl mb-3">Tìm kiếm</h3>
      <SearchBar value={q} onChange={setQ} placeholder="Tìm SP, KH, đơn..." />

      <section className="mb-4">
        <h4 className="font-semibold">Sản phẩm ({pRes.length})</h4>
        <ul className="list-disc pl-6">
          {pRes.map((p) => (
            <li key={p.id}>
              {(p as any).code ? `${(p as any).code} - ${p.name}` : p.name} — {p.stock} cái
            </li>
          ))}
          {pRes.length === 0 && <li className="text-gray-500">Không có kết quả</li>}
        </ul>
      </section>

      <section className="mb-4">
        <h4 className="font-semibold">Khách hàng ({cRes.length})</h4>
        <ul className="list-disc pl-6">
          {cRes.map((c) => (
            <li key={c.id}>
              {c.name} — {c.address}
            </li>
          ))}
          {cRes.length === 0 && <li className="text-gray-500">Không có kết quả</li>}
        </ul>
      </section>

      <section>
        <h4 className="font-semibold">Đơn hàng ({oRes.length})</h4>
        <ul className="list-disc pl-6">
          {oRes.map((o) => (
            <li key={o.id}>
              Đơn #{o.id} — {(o.items || []).map((it: any) => `${it.name || it.productId} x${it.quantity}`).join(", ")}
            </li>
          ))}
          {oRes.length === 0 && <li className="text-gray-500">Không có kết quả</li>}
        </ul>
      </section>
    </div>
  );
}
