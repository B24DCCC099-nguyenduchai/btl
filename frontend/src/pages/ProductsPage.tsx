import { useEffect, useState } from "react";
import api from "../api/axios";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);

  const load = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const save = async (p: Product) => {
    if (p.id) await api.put(`/products/${p.id}`, p);
    else await api.post("/products", p);

    setEditing(null);
    load();
  };

  const remove = async (id: number) => {
    await api.delete(`/products/${id}`);
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

      <ProductForm product={editing} onSave={save} />

      <ProductList
        products={products}
        onEdit={setEditing}
        onDelete={remove}
      />
    </div>
  );
}
