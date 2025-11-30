import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/Product";

const repo = () => AppDataSource.getRepository(Product);

// Return products mapping stock_qty -> stock (for frontend)
export const listProducts = async (req: Request, res: Response) => {
  try {
    const q = (req.query.q as string) || "";
    const products = await repo().createQueryBuilder("p")
      .where("p.name LIKE :q OR p.sku LIKE :q", { q: `%${q}%` })
      .orderBy("p.id", "DESC")
      .getMany();

    // map properties to frontend-friendly fields (stock)
    const mapped = products.map(p => ({
      id: p.id,
      sku: p.sku,
      name: p.name,
      description: p.description,
      price: Number(p.price),
      stock: p.stock_qty
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { sku, name, description, price, stock, stock_qty } = req.body;
    const p = repo().create({
      sku,
      name,
      description,
      price: price ?? 0,
      stock_qty: stock ?? stock_qty ?? 0
    });
    await repo().save(p);
    res.json({ message: "Created", product: { id: p.id, name: p.name, price: Number(p.price), stock: p.stock_qty } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const p = await repo().findOneBy({ id });
    if (!p) return res.status(404).json({ message: "Not found" });
    if (data.name !== undefined) p.name = data.name;
    if (data.description !== undefined) p.description = data.description;
    if (data.price !== undefined) p.price = data.price;
    if (data.stock !== undefined) p.stock_qty = data.stock;
    await repo().save(p);
    res.json({ message: "Updated", product: { id: p.id, name: p.name, price: Number(p.price), stock: p.stock_qty } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await repo().delete(id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
