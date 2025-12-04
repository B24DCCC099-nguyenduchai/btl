import React, { useEffect, useState } from "react";
import { getCustomers, deleteCustomer } from "../api/customerApi";
import { Customer } from "../types/customer";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

export default function CustomersPage(): JSX.Element {
  const [list, setList] = useState<Customer[]>([]);
  const [q, setQ] = useState("");
  const nav = useNavigate();

  async function load() {
    try {
      const res = await getCustomers();
      setList(res.data || []);
    } catch (e) {
      console.error(e);
      setList([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id: number) {
    if (!confirm("Xóa khách hàng?")) return;
    try {
      await deleteCustomer(id);
      await load();
    } catch (e) {
      alert("Xóa thất bại");
      console.error(e);
    }
  }

  const filtered = list.filter(
    (c) => c.name.toLowerCase().includes(q.toLowerCase()) || String(c.id).includes(q) || c.address?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Khách hàng</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => nav("/customers/new")}>
            Thêm khách
          </button>
        </div>
      </div>

      <SearchBar value={q} onChange={setQ} placeholder="Tìm khách hàng" />

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Tên</th>
            <th className="p-2">Năm sinh</th>
            <th className="p-2">Địa chỉ</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.id}</td>
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.birthYear}</td>
              <td className="p-2">{c.address}</td>
              <td className="p-2">
                <div className="flex gap-2">
                  <button className="px-2 py-1 bg-yellow-400 rounded" onClick={() => nav(`/customers/${c.id}/edit`)}>
                    Sửa
                  </button>
                  <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => onDelete(c.id)}>
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-gray-500">Không có khách hàng</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
