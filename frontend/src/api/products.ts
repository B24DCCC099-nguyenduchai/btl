import api from './apiClient';

export const getProducts = () => api.get('/products/').then(res => res.data);
export const createProduct = (data: any) => api.post('/products/', data).then(res => res.data);
export const updateProduct = (id: number, data: any) => api.put(`/products/${id}/`, data).then(res => res.data);
export const deleteProduct = (id: number) => api.delete(`/products/${id}/`).then(res => res.data);
