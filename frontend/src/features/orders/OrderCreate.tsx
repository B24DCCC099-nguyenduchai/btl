import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { createOrder } from '../../api/orders';
import { fetchProducts } from '../products/productSlice';
import { fetchCustomers } from '../customers/customerSlice';

export default function OrderCreate() {
  const products = useAppSelector(s => s.products.items);
  const customers = useAppSelector(s => s.customers.items);

  const [customerId, setCustomerId] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<{ id: number; quantity: number }[]>([]);

  const toggleProduct = (id: number) => {
    const exists = selectedProducts.find(p => p.id === id);
    if (exists) setSelectedProducts(selectedProducts.filter(p => p.id !== id));
    else setSelectedProducts([...selectedProducts, { id, quantity: 1 }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrder({ customerId, products: selectedProducts });
      alert('Tạo đơn hàng thành công');
      setCustomerId(0);
      setSelectedProducts([]);
    } catch (err) { console.error(err); }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      <select value={customerId} onChange={e => setCustomerId(Number(e.target.value))} className="border p-2 w-full">
        <option value={0}>Chọn khách hàng</option>
        {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      <div className="grid grid-cols-2 gap-2">
        {products.map(p => (
          <div key={p.id} className="border p-2 rounded flex justify-between items-center">
            <span>{p.name}</span>
            <input type="checkbox" checked={!!selectedProducts.find(sp => sp.id === p.id)} onChange={() => toggleProduct(p.id)} />
          </div>
        ))}
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Tạo đơn hàng</button>
    </form>
  );
}
