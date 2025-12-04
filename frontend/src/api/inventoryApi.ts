import { api } from "./api";
import { ImportRecord } from "../types/inventory";

export const getImports = async () => {
  const res = await api.get<ImportRecord[]>("/inventory");
  return res.data;
};

export const getImportById = async (id: number) => {
  const res = await api.get<ImportRecord>(`/inventory/${id}`);
  return res.data;
};

export const addImport = async (data: ImportRecord) => {
  const res = await api.post("/inventory", data);
  return res.data;
};

export const updateImport = async (id: number, data: ImportRecord) => {
  const res = await api.put(`/inventory/${id}`, data);
  return res.data;
};

export const deleteImport = async (id: number) => {
  const res = await api.delete(`/inventory/${id}`);
  return res.data;
};
