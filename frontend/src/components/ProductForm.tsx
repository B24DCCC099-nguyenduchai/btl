import { useState, useEffect } from "react";
import { Product } from "../types";

export default function ProductForm({
  product,
  onSave,
}: {
  product: Product | null;
  onSave: (p: Product) => void;
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
    }
  }, [product]);

  const submit = () => {
    onSave({ id: product?.id, name, price, stock });
    setName("");
    setPrice(0);
    setStock(0);
  };

  return (
    <div className="bg-white p-4 rounded shadow w-96 mb-5">
      <h3 className="font-bold text-lg mb-2">
        {product ? "Sửa sản phẩm" : "Thêm sản phẩm"}
      </h3>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Tên sản phẩm"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        className="border p-2 w-full mb-2"
        placeholder="Giá"
        value={price}
        onChange={(e) => setPrice(+e.target.value)}
      />
      <input
        type="number"
        className="border p-2 w-full mb-2"
        placeholder="Tồn kho"
        value={stock}
        onChange={(e) => setStock(+e.target.value)}
      />

      <button className="bg-blue-600 text-white p-2 w-full" onClick={submit}>
        {product ? "Cập nhật" : "Thêm"}
      </button>
    </div>
  );
}
