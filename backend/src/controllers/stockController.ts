import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { StockEntry } from "../entities/StockEntry";
import { Product } from "../entities/Product";

export const createStockEntry = async (req: Request, res: Response) => {
  try {
    const { productId, quantity, unit_price, entry_type, note } = req.body;
    if (!productId || !quantity) return res.status(400).json({ message: "Missing fields" });

    const prodRepo = AppDataSource.getRepository(Product);
    const product = await prodRepo.findOneBy({ id: productId });
    if (!product) return res.status(400).json({ message: "Product not found" });

    const entry = new StockEntry();
    entry.product = product;
    entry.quantity = quantity;
    entry.unit_price = unit_price;
    entry.entry_type = entry_type || "import";
    entry.note = note;

    await AppDataSource.transaction(async (tx) => {
      await tx.save(StockEntry, entry);
      product.stock_qty = product.stock_qty + quantity;
      await tx.save(Product, product);
    });

    res.json({ message: "Stock entry created", stock_qty: product.stock_qty });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
