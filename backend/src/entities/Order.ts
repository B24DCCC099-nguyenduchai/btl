import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from "typeorm";
import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Customer, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "customer_id" })
  customer?: Customer;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  total!: number;

  @Column({ default: "pending" })
  status!: string;

  @CreateDateColumn()
  order_date!: Date;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true, eager: true })
  items?: OrderItem[];
}
