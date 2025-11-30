import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  // API uses "name" from frontend -> map to full_name in DB? keep simple: field name
  @Column()
  name!: string;

  @Column({ type: "int", nullable: true })
  birthYear?: number;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ type: "text", nullable: true })
  address?: string;

  @CreateDateColumn()
  created_at!: Date;
}
