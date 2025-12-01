import api from './apiClient';

export const getReceipts = () => api.get('/receipts/').then(res => res.data);
export const createReceipt = (data: any) => api.post('/receipts/', data).then(res => res.data);
export const updateReceipt = (id: number, data: any) => api.put(`/receipts/${id}/`, data).then(res => res.data);
export const deleteReceipt = (id: number) => api.delete(`/receipts/${id}/`).then(res => res.data);
