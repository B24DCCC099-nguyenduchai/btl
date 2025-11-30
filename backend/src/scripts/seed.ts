import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";
import { Customer } from "../entities/Customer";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

async function seed() {
  await AppDataSource.initialize();
  const prodRepo = AppDataSource.getRepository(Product);
  const custRepo = AppDataSource.getRepository(Customer);
  const userRepo = AppDataSource.getRepository(User);

  // products 20
  const products = [];
  for (let i = 1; i <= 20; i++) {
    products.push({
      sku: `P${i.toString().padStart(3, "0")}`,
      name: `Sản phẩm ${i}`,
      description: `Mô tả sản phẩm ${i}`,
      price: Math.round((i * 12345) % 250000),
      stock_qty: Math.floor(Math.random() * 200)
    });
  }
  await prodRepo.save(products);

  // customers 20
  const customers = [];
  for (let i = 1; i <= 20; i++) {
    customers.push({
      name: `Khách hàng ${i}`,
      birthYear: 1980 + (i % 20),
      phone: `09000000${i.toString().padStart(2, "0")}`,
      email: `kh${i}@example.com`,
      address: `Địa chỉ ${i}`
    });
  }
  await custRepo.save(customers);

  // admin user
  const hash = await bcrypt.hash("admin123", 10);
  const admin = userRepo.create({ username: "admin", email: "admin@example.com", password_hash: hash, role: "admin" });
  await userRepo.save(admin);

  console.log("Seed finished. Admin credentials: admin / admin123");
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
