import api from './api';

const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  googleLogin: async (googleToken) => {
    const response = await api.post('/auth/google/login', { token: googleToken });
    return response.data;
  },
  
  googleRegister: async (googleToken) => {
    const response = await api.post('/auth/google/register', { token: googleToken });
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  }
};

export default authService;
