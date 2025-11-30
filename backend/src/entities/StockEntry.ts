import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class StockEntry {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, { onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "product_id" })
  product!: Product;

  @Column({ type: "int" })
  quantity!: number;

  @Column({ type: "decimal", precision: 12, scale: 2, nullable: true })
  unit_price?: number;

  @Column({ default: "import" })
  entry_type!: string;

  @Column({ type: "text", nullable: true })
  note?: string;

  @CreateDateColumn()
  entry_date!: Date;
}
