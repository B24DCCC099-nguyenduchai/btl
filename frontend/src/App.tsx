import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import CustomersPage from "./pages/CustomersPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/orders" element={<OrdersPage />} />
    </Routes>
  );
}

export default App;
