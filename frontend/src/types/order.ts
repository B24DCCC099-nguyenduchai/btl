
export interface OrderItem {
productId: number;
quantity: number;
}


export interface Order {
id: number;
customerId: number;
date: string;
items: OrderItem[];
}