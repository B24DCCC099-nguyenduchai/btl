import api from './apiClient';

export const getOrders = () => api.get('/orders/').then(res => res.data);
export const createOrder = (data: any) => api.post('/orders/', data).then(res => res.data);
export const updateOrder = (id: number, data: any) => api.put(`/orders/${id}/`, data).then(res => res.data);
export const deleteOrder = (id: number) => api.delete(`/orders/${id}/`).then(res => res.data);
