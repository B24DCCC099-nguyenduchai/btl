import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchOrders } from './orderSlice';
import Table from '../../components/Table';

export default function OrderList() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(s => s.orders);

  useEffect(() => { dispatch(fetchOrders()); }, [dispatch]);

  return (
    <Table
      columns={['Mã đơn', 'Khách hàng', 'Ngày mua', 'Sản phẩm']}
      data={items}
      renderRow={item => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.customerName}</td>
          <td>{item.date}</td>
          <td>{item.products.map((p: any) => p.name).join(', ')}</td>
        </tr>
      )}
    />
  );
}
