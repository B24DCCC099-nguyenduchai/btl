import api from './apiClient';

export const fetchInventoryCurrent = () => api.get('/stats/inventory/current').then(res => res.data);
export const fetchInventoryAsOf = (date: string) => api.get(`/stats/inventory?date=${date}`).then(res => res.data);
export const fetchCustomerHistory = (customerId: number) => api.get(`/stats/customer/${customerId}/history`).then(res => res.data);
