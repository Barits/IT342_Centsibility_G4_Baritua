import api from './api';
import authService from './authService';

const safeGet = async (path, fallback) => {
  try {
    const response = await api.get(path);
    return response.data ?? fallback;
  } catch (error) {
    return fallback;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data ?? authService.getCurrentUser();
  } catch (error) {
    return authService.getCurrentUser();
  }
};

export const getDashboardOverview = async () => {
  return safeGet('/dashboard/overview', {
    summary: null,
    balance: null,
    monthChange: null,
    stats: [],
    todaySpending: null,
    dailyAverage: null,
    recentTransactions: []
  });
};

export const getTransactions = async () => {
  return safeGet('/transactions', []);
};

export const getAnalytics = async () => {
  return safeGet('/analytics', {
    summary: null,
    spendingByCategory: [],
    monthlyBreakdown: [],
    categoryBreakdown: []
  });
};

export const getBudgets = async (month) => {
  const query = month ? `?month=${encodeURIComponent(month)}` : '';

  return safeGet(`/budgets${query}`, {
    summary: null,
    categoryBudgets: [],
    uncategorized: []
  });
};

export const getBudgetPlans = async () => {
  return safeGet('/budgets/plans', []);
};

export const upsertBudgetPlan = async (payload) => {
  const response = await api.post('/budgets/plans', payload);
  return response.data;
};

export const getCategories = async () => {
  return safeGet('/categories', []);
};

export const createTransaction = async (payload) => {
  const response = await api.post('/transactions', payload);
  return response.data;
};