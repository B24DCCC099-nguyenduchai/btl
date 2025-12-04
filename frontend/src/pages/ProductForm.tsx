import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../types/product";
import { addProduct, getProductById, updateProduct } from "../api/productApi";

export default function ProductForm(): JSX.Element {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const nav = useNavigate();

  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    price: 0,
    stock: 0,
    id: undefined,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      if (!isEdit || !id) return;
      setLoading(true);
      try {
        const data = await getProductById(Number(id));
        setForm(data);
      } catch (e) {
        console.error(e);
        alert("Không tải được sản phẩm");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, isEdit]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || form.price === undefined || form.stock === undefined) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      if (isEdit && id) {
        await updateProduct(Number(id), form as Product);
        alert("Cập nhật thành công");
      } else {
        await addProduct(form as Product);
        alert("Thêm sản phẩm thành công");
      }
      nav("/products");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi lưu sản phẩm");
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow max-w-2xl">
      <h3 className="text-xl mb-4">{isEdit ? "Sửa" : "Thêm"} sản phẩm</h3>
      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm">Mã (tùy chọn)</label>
            <input
              className="w-full p-2 border rounded"
              value={(form as any).code ?? ""}
              onChange={(e) => setForm({ ...form, ...( { code: e.target.value } as any ) })}
            />
          </div>

          <div>
            <label className="block text-sm">Tên</label>
            <input
              className="w-full p-2 border rounded"
              value={form.name ?? ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm">Giá</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={form.price ?? 0}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                required
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm">Tồn kho</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={form.stock ?? 0}
                onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                required
                min={0}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">{isEdit ? "Cập nhật" : "Thêm"}</button>
          </div>
        </form>
      )}
    </div>
  );
}
