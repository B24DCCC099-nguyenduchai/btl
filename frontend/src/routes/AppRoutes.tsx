/* import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import ProductList from '../features/products/ProductList';
import CustomerList from '../features/customers/CustomerList';
import OrderList from '../features/orders/OrderList';
import OrderCreate from '../features/orders/OrderCreate';
import ReceiptList from '../features/receipts/ReceiptList';
import ReceiptForm from '../features/receipts/ReceiptForm';
import InventoryStats from '../features/stats/InventoryStats';
import CustomerHistory from '../features/stats/CustomerHistory';
import { useAppSelector } from '../app/hooks';

export default function AppRoutes() {
  const user = useAppSelector(s => s.auth.user);

  if (!user) {
    return (
      <Routes>
        <Route path="/*" element={<LoginPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/orders" element={<OrderList />} />
      <Route path="/orders/create" element={<OrderCreate />} />
      <Route path="/receipts" element={<ReceiptList />} />
      <Route path="/receipts/create" element={<ReceiptForm />} />
      <Route path="/stats/inventory" element={<InventoryStats />} />
      <Route path="/stats/customers" element={<CustomerHistory />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}
 */

import { Routes, Route } from "react-router-dom";
import ProductList from "../features/products/ProductList";
import CustomerList from "../features/customers/CustomerList";
import OrderList from "../features/orders/OrderList";
import ReceiptList from "../features/receipts/ReceiptList";
import InventoryStats from "../features/stats/InventoryStats";
import CustomerHistory from "../features/stats/CustomerHistory";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Bỏ login */}
      {/* <Route path="/login" element={<LoginPage />} /> */}

      {/* Vào thẳng trang chính */}
      <Route path="/" element={<ProductList />} />

      <Route path="/products" element={<ProductList />} />
      <Route path="/customers" element={<CustomerList />} />
      <Route path="/orders" element={<OrderList />} />
      <Route path="/receipts" element={<ReceiptList />} />
      <Route path="/stats/inventory" element={<InventoryStats />} />
      <Route path="/stats/customer-history" element={<CustomerHistory />} />
    </Routes>
  );
}
