import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCustomers } from './customerSlice';
import Table from '../../components/Table';

export default function CustomerList() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(s => s.customers);

  useEffect(() => { dispatch(fetchCustomers()); }, [dispatch]);

  return (
    <Table
      columns={['Mã KH', 'Họ tên', 'Năm sinh', 'Địa chỉ']}
      data={items}
      renderRow={item => (
        <tr key={item.id}>
          <td>{item.code}</td>
          <td>{item.name}</td>
          <td>{item.birthYear}</td>
          <td>{item.address}</td>
        </tr>
      )}
    />
  );
}
