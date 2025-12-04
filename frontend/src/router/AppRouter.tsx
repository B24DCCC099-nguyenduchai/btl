import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import CustomersPage from "../pages/CustomersPage";
import OrdersPage from "../pages/OrdersPage";
import InventoryPage from "../pages/InventoryPage";
import SearchPage from "../pages/SearchPage";
import Navbar from "../components/Navbar";


export default function AppRouter() {
return (
<BrowserRouter>
<Navbar />
<Routes>
<Route path="/" element={<LoginPage />} />
<Route path="/products" element={<ProductsPage />} />
<Route path="/customers" element={<CustomersPage />} />
<Route path="/orders" element={<OrdersPage />} />
<Route path="/inventory" element={<InventoryPage />} />
<Route path="/search" element={<SearchPage />} />
</Routes>
</BrowserRouter>
);
}