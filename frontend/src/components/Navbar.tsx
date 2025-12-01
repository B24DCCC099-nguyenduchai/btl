import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-600 text-white px-6 py-3 shadow">
      <div className="text-xl font-bold">Quản lý cửa hàng</div>
      {/* <div className="space-x-4">
        <Link to="/products">Sản phẩm</Link>
        <Link to="/customers">Khách hàng</Link>
        <Link to="/orders">Đơn hàng</Link>
        <Link to="/receipts">Nhập kho</Link>
        <Link to="/stats">Thống kê</Link>
      </div> */}
    </nav>
  );
}
