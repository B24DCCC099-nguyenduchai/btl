export interface Product {
  id?: number;
  name: string;
  price: number;
  stock: number;
}

export interface Customer {
  id?: number;
  name: string;
  birthYear: number;
  address: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id?: number;
  customerId: number;
  date: string;
  items: OrderItem[];
}
