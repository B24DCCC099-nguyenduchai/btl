import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  password_hash?: string;

  @Column({ default: "local" })
  provider!: string;

  @Column({ default: "staff" })
  role!: string;

  @CreateDateColumn()
  created_at!: Date;
}
