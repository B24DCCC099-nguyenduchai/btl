import api from './apiClient';

export const login = (username: string, password: string) =>
  api.post('/auth/login', { username, password }).then(res => res.data);

export const loginWithGoogle = (token: string) =>
  api.post('/auth/google', { token }).then(res => res.data);

export const loginWithFacebook = (token: string) =>
  api.post('/auth/facebook', { token }).then(res => res.data);
