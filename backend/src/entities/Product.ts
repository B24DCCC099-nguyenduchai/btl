import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  // optional sku
  @Column({ nullable: true, unique: true })
  sku?: string;

  @Column()
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  price!: number;

  // tên cột là stock_qty, API sẽ map sang/đến "stock"
  @Column({ type: "int", default: 0 })
  stock_qty!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
