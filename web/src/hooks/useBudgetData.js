import { useEffect, useState } from 'react';
import { getBudgets, getTransactions } from '../services/appDataService';
import {
  getLastMonthSpentByCategory,
  isBudgetsPayload,
  readCachedBudgets,
  writeCachedBudgets
} from '../utils/financeHelpers';

const useBudgetData = () => {
  const [budgetData, setBudgetData] = useState(() => readCachedBudgets());
  const [managedBudgets, setManagedBudgets] = useState(() => readCachedBudgets().categoryBudgets || []);
  const [lastMonthSpentByCategory, setLastMonthSpentByCategory] = useState({});

  useEffect(() => {
    let isMounted = true;

    const loadBudgetData = async () => {
      const [budgets, transactions] = await Promise.all([getBudgets(), getTransactions()]);

      if (!isMounted) {
        return;
      }

      if (isBudgetsPayload(budgets)) {
        setBudgetData(budgets);
        setManagedBudgets(Array.isArray(budgets.categoryBudgets) ? budgets.categoryBudgets : []);
        writeCachedBudgets(budgets);
      }

      setLastMonthSpentByCategory(getLastMonthSpentByCategory(transactions));
    };

    loadBudgetData();

    return () => {
      isMounted = false;
    };
  }, []);

  const persistBudgetData = (nextData) => {
    setBudgetData(nextData);
    writeCachedBudgets(nextData);
  };

  return {
    budgetData,
    managedBudgets,
    setManagedBudgets,
    lastMonthSpentByCategory,
    persistBudgetData
  };
};

export default useBudgetData;
