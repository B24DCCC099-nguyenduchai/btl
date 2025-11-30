import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userRepo = () => AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const exist = await userRepo().findOne({ where: [{ username }, { email }] });
    if (exist) return res.status(400).json({ message: "User exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = userRepo().create({ username, email, password_hash: hash, role: "staff" });
    await userRepo().save(user);
    res.json({ message: "Registered" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Missing fields" });

    const user = await userRepo().findOne({ where: { username } });
    if (!user || !user.password_hash) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ sub: user.id, role: user.role, username: user.username }, process.env.JWT_SECRET || "change_this_secret", { expiresIn: "8h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
