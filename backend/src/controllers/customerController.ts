import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Customer } from "../entities/Customer";

const repo = () => AppDataSource.getRepository(Customer);

export const listCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await repo().find({ order: { id: "DESC" } });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    // frontend uses name, birthYear, address
    const { name, birthYear, phone, email, address } = req.body;
    const c = repo().create({ name, birthYear, phone, email, address });
    await repo().save(c);
    res.json(c);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
