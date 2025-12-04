import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../api/productApi";
import { Product } from "../types/product";
import SearchBar from "../components/SearchBar";

export default function ProductsPage(): JSX.Element {
  const [items, setItems] = useState<Product[]>([]);
  const [q, setQ] = useState("");
  const nav = useNavigate();

  async function load() {
    try {
      const res = await getProducts();
      setItems(res.data || []);
    } catch (e) {
      console.error(e);
      setItems([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id: number) {
    if (!confirm("Xác nhận xóa sản phẩm?")) return;
    try {
      await deleteProduct(id);
      await load();
    } catch (e) {
      alert("Xóa thất bại");
      console.error(e);
    }
  }

  const filtered = items.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      String(p.id).includes(q) ||
      (p as any).code?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Danh sách sản phẩm</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => nav("/products/new")}>
            Thêm sản phẩm
          </button>
          <Link to="/search" className="px-3 py-1 bg-gray-200 rounded">Tìm kiếm</Link>
        </div>
      </div>

      <SearchBar value={q} onChange={setQ} placeholder="Tìm theo mã hoặc tên" />

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Mã / Tên</th>
            <th className="p-2">Giá</th>
            <th className="p-2">Tồn kho</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{(p as any).code ? `${(p as any).code} - ${p.name}` : p.name}</td>
              <td className="p-2">{p.price.toLocaleString("vi-VN")}</td>
              <td className="p-2">{p.stock}</td>
              <td className="p-2 space-x-2">
                <button className="px-2 py-1 bg-yellow-400 rounded" onClick={() => nav(`/products/${p.id}/edit`)}>
                  Sửa
                </button>
                <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => onDelete(p.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                Không có sản phẩm
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
