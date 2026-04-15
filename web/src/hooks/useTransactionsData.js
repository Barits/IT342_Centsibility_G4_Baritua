import { useEffect, useMemo, useState } from 'react';
import { getTransactions } from '../services/appDataService';

const TRANSACTIONS_CACHE_KEY = 'centsibility.transactions.list';
const INCOME_CATEGORIES = new Set(['income', 'salary', 'general income', 'general-income']);

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

const useTransactionsData = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [transactions, setTransactions] = useState(() => readCachedTransactions());

  useEffect(() => {
    let isMounted = true;

    const loadTransactions = async () => {
      const data = await getTransactions();
      if (!isMounted) {
        return;
      }

      const safeTransactions = Array.isArray(data) ? data : [];
      setTransactions(safeTransactions);

      try {
        window.localStorage.setItem(TRANSACTIONS_CACHE_KEY, JSON.stringify(safeTransactions));
      } catch (cacheError) {
        // Ignore write failures and continue with fresh in-memory data.
      }
    };

    loadTransactions();

    return () => {
      isMounted = false;
    };
  }, []);

  const expenseTransactions = useMemo(() => (
    transactions.filter((transaction) => {
      const normalizedCategory = String(transaction.category || '').trim().toLowerCase();
      const numericAmount = Number(transaction.amount);
      return !INCOME_CATEGORIES.has(normalizedCategory) && numericAmount < 0;
    })
  ), [transactions]);

  const filters = useMemo(() => (
    ['All', ...new Set(expenseTransactions.map((transaction) => transaction.category).filter(Boolean))]
  ), [expenseTransactions]);

  const totalSpent = useMemo(() => (
    expenseTransactions.reduce((sum, transaction) => {
      const numericAmount = Number(transaction.amount) || 0;
      return sum + Math.abs(numericAmount);
    }, 0)
  ), [expenseTransactions]);

  const filteredTransactions = useMemo(() => (
    expenseTransactions.filter((transaction) => {
      const matchesSearch = !searchQuery
        || `${transaction.name} ${transaction.category}`.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || transaction.category === activeFilter;
      return matchesSearch && matchesFilter;
    })
  ), [expenseTransactions, searchQuery, activeFilter]);

  const groupedTransactions = useMemo(() => (
    filteredTransactions.reduce((groups, transaction) => {
      const period = transaction.period || transaction.date || 'Recent';
      if (!groups[period]) {
        groups[period] = [];
      }
      groups[period].push(transaction);
      return groups;
    }, {})
  ), [filteredTransactions]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    filters,
    totalSpent,
    groupedTransactions,
    hasResults: filteredTransactions.length > 0
  };
};

export default useTransactionsData;
