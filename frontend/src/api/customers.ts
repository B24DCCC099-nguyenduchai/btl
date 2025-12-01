import api from './apiClient';

export const getCustomers = () => api.get('/customers/').then(res => res.data);
export const createCustomer = (data: any) => api.post('/customers/', data).then(res => res.data);
export const updateCustomer = (id: number, data: any) => api.put(`/customers/${id}/`, data).then(res => res.data);
export const deleteCustomer = (id: number) => api.delete(`/customers/${id}/`).then(res => res.data);
