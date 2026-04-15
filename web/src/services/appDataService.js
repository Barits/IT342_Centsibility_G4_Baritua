import api from './api';
import authService from './authService';

export const DEFAULT_EXPENSE_CATEGORIES = [
  { id: 'food', label: 'Food', icon: '🍔', color: '#EF4444' },
  { id: 'transport', label: 'Transport', icon: '🚗', color: '#3B82F6' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️', color: '#EC4899' },
  { id: 'bills', label: 'Bills', icon: '💡', color: '#F59E0B' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬', color: '#8B5CF6' },
  { id: 'health', label: 'Health', icon: '💊', color: '#EF4444' },
  { id: 'education', label: 'Education', icon: '📚', color: '#3B82F6' },
  { id: 'salary', label: 'Salary', icon: '💰', color: '#10B981' },
  { id: 'housing', label: 'Housing', icon: '🏠', color: '#10B981' },
  { id: 'subscriptions', label: 'Subscriptions', icon: '📱', color: '#3B82F6' },
  { id: 'other', label: 'Other', icon: '📦', color: '#6B7280' }
];

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
    monthlyTrend: [],
    categoryBreakdown: []
  });
};

export const getBudgets = async () => {
  return safeGet('/budgets', {
    summary: null,
    categoryBudgets: [],
    uncategorized: []
  });
};

export const getCategories = async () => {
  const categories = await safeGet('/categories', []);
  return categories.length > 0 ? categories : DEFAULT_EXPENSE_CATEGORIES;
};

export const createTransaction = async (payload) => {
  const response = await api.post('/transactions', payload);
  return response.data;
};