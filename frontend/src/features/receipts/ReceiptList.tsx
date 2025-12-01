import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchReceipts } from './receiptSlice';
import Table from '../../components/Table';

export default function ReceiptList() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(s => s.receipts);

  useEffect(() => { dispatch(fetchReceipts()); }, [dispatch]);

  return (
    <Table
      columns={['Mã nhập', 'Thời gian', 'Đơn vị', 'Sản phẩm']}
      data={items}
      renderRow={item => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.date}</td>
          <td>{item.supplier}</td>
          <td>{item.products.map((p: any) => p.name).join(', ')}</td>
        </tr>
      )}
    />
  );
}
