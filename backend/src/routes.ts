import { Router } from "express";
import * as auth from "./controllers/authController";
import * as product from "./controllers/productController";
import * as customer from "./controllers/customerController";
import * as order from "./controllers/orderController";
import * as stock from "./controllers/stockController";
import { authMiddleware } from "./middlewares/auth";

const router = Router();

// auth
router.post("/auth/register", auth.register);
router.post("/auth/login", auth.login);

// products
router.get("/products", product.listProducts);
router.post("/products", authMiddleware, product.createProduct);
router.put("/products/:id", authMiddleware, product.updateProduct);
router.delete("/products/:id", authMiddleware, product.deleteProduct);

// customers
router.get("/customers", customer.listCustomers);
router.post("/customers", authMiddleware, customer.createCustomer);

// orders
router.post("/orders", authMiddleware, order.createOrder);
router.get("/orders", authMiddleware, order.listOrders);

// stock entries
router.post("/stock_entries", authMiddleware, stock.createStockEntry);

export default router;
