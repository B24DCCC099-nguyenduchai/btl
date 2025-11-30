import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Order } from "../entities/Order";
import { Customer } from "../entities/Customer";
import { Product } from "../entities/Product";
import { OrderItem } from "../entities/OrderItem";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerId, items } = req.body; // items: [{ productId, quantity }]
    if (!items || !Array.isArray(items) || items.length === 0) return res.status(400).json({ message: "No items" });

    const productRepo = AppDataSource.getRepository(Product);
    const order = new Order();
    order.total = 0;
    order.status = "pending";
    order.items = [];

    if (customerId) {
      const cust = await AppDataSource.getRepository(Customer).findOneBy({ id: customerId });
      if (cust) order.customer = cust;
    }

    // validate and prepare
    for (const it of items) {
      const prod = await productRepo.findOneBy({ id: it.productId });
      if (!prod) return res.status(400).json({ message: `Product ${it.productId} not found` });
      if (prod.stock_qty < it.quantity) return res.status(400).json({ message: `Not enough stock for ${prod.name}` });

      const oi = new OrderItem();
      oi.product = prod;
      oi.quantity = it.quantity;
      oi.unit_price = Number(prod.price);
      oi.subtotal = Number(prod.price) * it.quantity;
      order.total += oi.subtotal;
      order.items.push(oi);
    }

    // transaction: save order, order items, decrement stock
    await AppDataSource.transaction(async (tx) => {
      const savedOrder = await tx.save(Order, order);
      for (const oi of order.items!) {
        oi.order = savedOrder;
        await tx.save(OrderItem, oi);
        const prod = await tx.findOne(Product, { where: { id: oi.product.id } });
        if (prod) {
          prod.stock_qty = prod.stock_qty - oi.quantity;
          await tx.save(Product, prod);
        }
      }
    });

    res.json({ message: "Order created", total: order.total });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const listOrders = async (req: Request, res: Response) => {
  try {
    const orders = await AppDataSource.getRepository(Order).find({ relations: ["customer", "items", "items.product"], order: { id: "DESC" }});
    // map for frontend convenience
    const mapped = orders.map(o => ({
      id: o.id,
      customerId: o.customer?.id ?? null,
      customerName: o.customer?.name ?? null,
      total: Number(o.total),
      status: o.status,
      order_date: o.order_date,
      items: o.items?.map(it => ({
        productId: it.product.id,
        name: it.product.name,
        quantity: it.quantity,
        unit_price: Number(it.unit_price),
        subtotal: Number(it.subtotal)
      })) ?? []
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
