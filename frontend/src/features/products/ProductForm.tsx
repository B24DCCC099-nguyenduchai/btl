import React, { useState } from 'react';
import { createProduct, updateProduct } from '../../api/products';

interface Props { product?: any; onClose: () => void; }

export default function ProductForm({ product, onClose }: Props) {
  const [sku, setSku] = useState(product?.sku || '');
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || 0);
  const [quantity, setQuantity] = useState(product?.quantity || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (product) await updateProduct(product.id, { sku, name, price, quantity });
      else await createProduct({ sku, name, price, quantity });
      onClose();
    } catch (err) { console.error(err); }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input value={sku} onChange={e => setSku(e.target.value)} placeholder="Mã SP" className="border p-2 mb-2 w-full" />
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Tên SP" className="border p-2 mb-2 w-full" />
      <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Giá" className="border p-2 mb-2 w-full" />
      <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} placeholder="Tồn kho" className="border p-2 mb-2 w-full" />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">{product ? 'Cập nhật' : 'Thêm'}</button>
    </form>
  );
}
