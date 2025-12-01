import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg h-screen p-4 border-r">
      <ul className="flex flex-col gap-3">
        <li><Link  to="/products" className="hover:text-blue-600">Sản phẩm</Link></li>
        <li><Link to="/customers" className="hover:text-blue-600">Khách hàng</Link></li>
        <li><Link to="/orders" className="hover:text-blue-600">Đơn hàng</Link></li>
        <li><Link to="/receipts" className="hover:text-blue-600">Nhập kho</Link></li>
        <li><Link to="/stats" className="hover:text-blue-600">Thống kê</Link></li>
      </ul>
    </div>
  );
}
