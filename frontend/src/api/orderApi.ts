import { api } from "./api";
import { Order } from "../types/order";

export const getOrders = async () => {
  const res = await api.get<Order[]>("/orders");
  return res.data;
};

export const getOrderById = async (id: number) => {
  const res = await api.get<Order>(`/orders/${id}`);
  return res.data;
};

export const addOrder = async (data: Order) => {
  const res = await api.post("/orders", data);
  return res.data;
};

export const updateOrder = async (id: number, data: Order) => {
  const res = await api.put(`/orders/${id}`, data);
  return res.data;
};

export const deleteOrder = async (id: number) => {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
};

export const completeOrder = async (id: number) => {
  const res = await api.patch(`/orders/${id}/complete`);
  return res.data;
};
