import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity({ name: "order_items" })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order!: Order;

  @ManyToOne(() => Product, { onDelete: "RESTRICT", eager: true })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ type: "int" })
  quantity!: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  unit_price!: number;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  subtotal!: number;
}
