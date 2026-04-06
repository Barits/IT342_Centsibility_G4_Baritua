import { useEffect, useState } from 'react';
import authService from '../services/authService';
import { getCurrentUser, getBudgets, getTransactions } from '../services/appDataService';
import {
  EMPTY_BUDGETS,
  isBudgetsPayload,
  readCachedBudgets,
  writeCachedBudgets
} from '../utils/financeHelpers';

const TRANSACTIONS_CACHE_KEY = 'centsibility.transactions.list';

const readCachedTransactions = () => {
  try {
    const rawValue = window.localStorage.getItem(TRANSACTIONS_CACHE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch (cacheError) {
    return [];
  }
};

const useDashboardData = () => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [budgetData, setBudgetData] = useState(() => readCachedBudgets());
  const [recentTransactions, setRecentTransactions] = useState(() => readCachedTransactions().slice(0, 5));

  useEffect(() => {
    let isMounted = true;

    const loadBudgetSnapshot = async () => {
      const budgets = await getBudgets();
      if (!isMounted || !isBudgetsPayload(budgets)) {
        return;
      }

      setBudgetData(budgets);
      writeCachedBudgets(budgets);
    };

    const loadRecentTransactions = async () => {
      const data = await getTransactions();
      if (!isMounted) {
        return;
      }

      const safeTransactions = Array.isArray(data) ? data : [];
      setRecentTransactions(safeTransactions.slice(0, 5));

      try {
        window.localStorage.setItem(TRANSACTIONS_CACHE_KEY, JSON.stringify(safeTransactions));
      } catch (cacheError) {
        // Ignore storage write failures and keep in-memory state.
      }
    };

    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      if (isMounted && currentUser) {
        setUser(currentUser);
      }
    };

    loadBudgetSnapshot();
    loadRecentTransactions();
    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    user,
    budgetData: isBudgetsPayload(budgetData) ? budgetData : EMPTY_BUDGETS,
    recentTransactions
  };
};

export default useDashboardData;
