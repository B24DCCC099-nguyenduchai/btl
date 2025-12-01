import React, { useState } from 'react';
import { createCustomer, updateCustomer } from '../../api/customers';

interface Props { customer?: any; onClose: () => void; }

export default function CustomerForm({ customer, onClose }: Props) {
  const [code, setCode] = useState(customer?.code || '');
  const [name, setName] = useState(customer?.name || '');
  const [birthYear, setBirthYear] = useState(customer?.birthYear || '');
  const [address, setAddress] = useState(customer?.address || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (customer) await updateCustomer(customer.id, { code, name, birthYear, address });
      else await createCustomer({ code, name, birthYear, address });
      onClose();
    } catch (err) { console.error(err); }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input value={code} onChange={e => setCode(e.target.value)} placeholder="Mã KH" className="border p-2 mb-2 w-full" />
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Họ tên" className="border p-2 mb-2 w-full" />
      <input type="number" value={birthYear} onChange={e => setBirthYear(Number(e.target.value))} placeholder="Năm sinh" className="border p-2 mb-2 w-full" />
      <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Địa chỉ" className="border p-2 mb-2 w-full" />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">{customer ? 'Cập nhật' : 'Thêm'}</button>
    </form>
  );
}
