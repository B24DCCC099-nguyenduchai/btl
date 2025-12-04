import { api } from "./api";
import { Product } from "../types/product";

export const getProducts = async () => {
  const res = await api.get<Product[]>("/products");
  return res.data;
};

export const getProductById = async (id: number) => {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
};

export const addProduct = async (data: Product) => {
  const res = await api.post("/products", data);
  return res.data;
};

export const updateProduct = async (id: number, data: Product) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};
