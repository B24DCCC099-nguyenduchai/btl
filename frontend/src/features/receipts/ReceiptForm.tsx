import React, { useState } from 'react';
import { createReceipt } from '../../api/receipts';
import { useAppSelector } from '../../app/hooks';

export default function ReceiptForm({ onClose }: { onClose?: () => void }) {
  const products = useAppSelector(s => s.products.items);
  const [supplier, setSupplier] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const toggleProduct = (id: number) => {
    if (selectedProducts.includes(id)) setSelectedProducts(selectedProducts.filter(p => p !== id));
    else setSelectedProducts([...selectedProducts, id]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReceipt({ supplier, products: selectedProducts });
      onClose();
    } catch (err) { console.error(err); }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      <input value={supplier} onChange={e => setSupplier(e.target.value)} placeholder="Đơn vị nhập" className="border p-2 w-full" />
      <div className="grid grid-cols-2 gap-2">
        {products.map(p => (
          <div key={p.id} className="border p-2 rounded flex justify-between items-center">
            <span>{p.name}</span>
            <input type="checkbox" checked={selectedProducts.includes(p.id)} onChange={() => toggleProduct(p.id)} />
          </div>
        ))}
      </div>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Nhập kho</button>
    </form>
  );
}
