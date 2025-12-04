import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Customer } from "../types/customer";
import { addCustomer, getCustomerById, updateCustomer } from "../api/customerApi";

export default function CustomerForm(): JSX.Element {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const nav = useNavigate();

  const [form, setForm] = useState<Partial<Customer>>({
    name: "",
    birthYear: new Date().getFullYear() - 25,
    address: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      if (!isEdit || !id) return;
      setLoading(true);
      try {
        const data = await getCustomerById(Number(id));
        setForm(data);
      } catch (e) {
        console.error(e);
        alert("Không tải được khách hàng");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, isEdit]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name) {
      alert("Nhập tên khách");
      return;
    }
    try {
      if (isEdit && id) {
        await updateCustomer(Number(id), form as Customer);
        alert("Cập nhật thành công");
      } else {
        await addCustomer(form as Customer);
        alert("Thêm khách thành công");
      }
      nav("/customers");
    } catch (err) {
      console.error(err);
      alert("Lỗi lưu khách hàng");
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow max-w-lg">
      <h3 className="text-xl mb-4">{isEdit ? "Sửa" : "Thêm"} khách hàng</h3>
      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm">Họ tên</label>
            <input className="w-full p-2 border rounded" value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>

          <div>
            <label className="block text-sm">Năm sinh</label>
            <input type="number" className="w-full p-2 border rounded" value={form.birthYear ?? ""} onChange={(e) => setForm({ ...form, birthYear: Number(e.target.value) })} />
          </div>

          <div>
            <label className="block text-sm">Địa chỉ</label>
            <input className="w-full p-2 border rounded" value={form.address ?? ""} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>

          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">{isEdit ? "Cập nhật" : "Thêm"}</button>
          </div>
        </form>
      )}
    </div>
  );
}

