import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

import { User } from "./entities/User";
import { Product } from "./entities/Product";
import { Customer } from "./entities/Customer";
import { Order } from "./entities/Order";
import { OrderItem } from "./entities/OrderItem";
import { StockEntry } from "./entities/StockEntry";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: +(process.env.DB_PORT || 3306),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "shop_management",
  synchronize: true, // chỉ dev — production dùng migrations
  logging: false,
  entities: [User, Product, Customer, Order, OrderItem, StockEntry],
});
