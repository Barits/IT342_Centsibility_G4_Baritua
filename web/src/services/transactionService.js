import api from './api';

const transactionService = {
  createTransaction: async (transactionData) => {
    const response = await api.post('/transactions', transactionData);
    return response.data;
  },

  getAllTransactions: async () => {
    const response = await api.get('/transactions');
    return response.data;
  },

  getTransactionById: async (id) => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },

  getTransactionsByDateRange: async (startDate, endDate) => {
    const response = await api.get('/transactions/date-range', {
      params: { startDate, endDate },
    });
    return response.data;
  },

  getTransactionsByType: async (type) => {
    const response = await api.get(`/transactions/type/${type}`);
    return response.data;
  },

  getTransactionsByCategory: async (category) => {
    const response = await api.get(`/transactions/category/${category}`);
    return response.data;
  },

  updateTransaction: async (id, transactionData) => {
    const response = await api.put(`/transactions/${id}`, transactionData);
    return response.data;
  },

  deleteTransaction: async (id) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },
};

export default transactionService;
