import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchInventoryCurrent } from './statsSlice';
import Table from '../../components/Table';

export default function InventoryStats() {
  const dispatch = useAppDispatch();
  const { inventory } = useAppSelector(s => s.stats);

  useEffect(() => { dispatch(fetchInventoryCurrent()); }, [dispatch]);

  return (
    <Table
      columns={['Sản phẩm', 'Tồn kho']}
      data={inventory}
      renderRow={item => <tr key={item.id}><td>{item.name}</td><td>{item.quantity}</td></tr>}
    />
  );
}
