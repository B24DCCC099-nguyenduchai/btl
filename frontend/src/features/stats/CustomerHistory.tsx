import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCustomerHistory } from './statsSlice';
import Table from '../../components/Table';
import { useAppSelector as selectCustomers } from '../../app/hooks';

export default function CustomerHistory() {
  const dispatch = useAppDispatch();
  const { customerHistory } = useAppSelector(s => s.stats);
  const customers = useAppSelector(s => s.customers.items);
  const [customerId, setCustomerId] = useState<number>(0);

  useEffect(() => {
    if (customerId) dispatch(fetchCustomerHistory(customerId));
  }, [customerId, dispatch]);

  return (
    <div>
      <select value={customerId} onChange={e => setCustomerId(Number(e.target.value))} className="border p-2 mb-2">
        <option value={0}>Chọn khách hàng</option>
        {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      <Table
        columns={['Mã đơn', 'Ngày mua', 'Sản phẩm']}
        data={customerHistory}
        renderRow={item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.date}</td>
            <td>{item.products.map((p: any) => p.name).join(', ')}</td>
          </tr>
        )}
      />
    </div>
  );
}
