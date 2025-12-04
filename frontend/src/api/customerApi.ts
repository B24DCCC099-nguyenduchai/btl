import { api } from "./api";
import { Customer } from "../types/customer";

export const getCustomers = async () => {
  const res = await api.get<Customer[]>("/customers");
  return res.data;
};

export const getCustomerById = async (id: number) => {
  const res = await api.get<Customer>(`/customers/${id}`);
  return res.data;
};

export const addCustomer = async (data: Customer) => {
  const res = await api.post("/customers", data);
  return res.data;
};

export const updateCustomer = async (id: number, data: Customer) => {
  const res = await api.put(`/customers/${id}`, data);
  return res.data;
};

export const deleteCustomer = async (id: number) => {
  const res = await api.delete(`/customers/${id}`);
  return res.data;
};
