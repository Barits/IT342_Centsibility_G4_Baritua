import api from './api';

const budgetService = {
  createBudget: async (budgetData) => {
    const response = await api.post('/budgets', budgetData);
    return response.data;
  },

  getAllBudgets: async () => {
    const response = await api.get('/budgets');
    return response.data;
  },

  getActiveBudgets: async () => {
    const response = await api.get('/budgets/active');
    return response.data;
  },

  getBudgetById: async (id) => {
    const response = await api.get(`/budgets/${id}`);
    return response.data;
  },

  getBudgetsByCategory: async (category) => {
    const response = await api.get(`/budgets/category/${category}`);
    return response.data;
  },

  updateBudget: async (id, budgetData) => {
    const response = await api.put(`/budgets/${id}`, budgetData);
    return response.data;
  },

  deleteBudget: async (id) => {
    const response = await api.delete(`/budgets/${id}`);
    return response.data;
  },
};

export default budgetService;
