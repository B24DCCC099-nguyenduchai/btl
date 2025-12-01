import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from './productSlice';
import Table from '../../components/Table';

export default function ProductList() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(s => s.products);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  return (
    <Table
      columns={['Mã SP', 'Tên SP', 'Giá', 'Tồn kho']}
      data={items}
      renderRow={item => <tr key={item.id}><td>{item.sku}</td><td>{item.name}</td><td>{item.price}</td><td>{item.quantity}</td></tr>}
    />
  );
}
