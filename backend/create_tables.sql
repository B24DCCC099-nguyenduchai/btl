CREATE DATABASE IF NOT EXISTS pharmacy_shop;
USE pharmacy_shop;

-- products
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) DEFAULT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(13,2) NOT NULL DEFAULT 0,
  stock INT NOT NULL DEFAULT 0
);

-- customers
CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  birth_year INT DEFAULT NULL,
  address VARCHAR(500) DEFAULT NULL
);

-- orders
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) DEFAULT NULL,
  customer_id INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) NOT NULL DEFAULT 'Pending',
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- order_items
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(13,2) NOT NULL DEFAULT 0,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- inventory imports
CREATE TABLE IF NOT EXISTS inventory_imports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- inventory items
CREATE TABLE IF NOT EXISTS inventory_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  import_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (import_id) REFERENCES inventory_imports(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

----------------------------------------------------------
-- SAMPLE DATA (Ví dụ)
----------------------------------------------------------

-- sample products
INSERT INTO products (code, name, price, stock) VALUES
('P001', 'Paracetamol 500mg', 15000, 120),
('P002', 'Vitamin C 1000mg', 30000, 80),
('P003', 'Thuốc ho Prospan', 75000, 40),
('P004', 'Nước muối sinh lý', 9000, 200);

-- sample customers
INSERT INTO customers (name, birth_year, address) VALUES
('Nguyễn Văn A', 1995, 'Hà Nội'),
('Trần Thị B', 2000, 'Đà Nẵng'),
('Lê Văn C', 1988, 'TP HCM');

-- sample inventory imports
INSERT INTO inventory_imports (code) VALUES
('IMP001'),
('IMP002');

-- sample inventory items
INSERT INTO inventory_items (import_id, product_id, quantity) VALUES
(1, 1, 50),   -- nhập thêm Paracetamol
(1, 2, 20),   -- nhập thêm Vitamin C
(2, 4, 100);  -- nhập thêm nước muối

-- sample orders
INSERT INTO orders (code, customer_id, status) VALUES
('ORD001', 1, 'Pending'),
('ORD002', 2, 'Completed');

-- sample order_items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 2, 15000),
(1, 4, 5, 9000),
(2, 3, 1, 75000);
