import { useEffect, useState } from 'react';
import { getBudgets } from '../services/appDataService';
import {
  EMPTY_BUDGETS,
  isBudgetsPayload
} from '../utils/financeHelpers';

const useBudgetData = (selectedMonth) => {
  const [budgetData, setBudgetData] = useState(EMPTY_BUDGETS);

  useEffect(() => {
    let isMounted = true;

    const loadBudgetData = async () => {
      const budgets = await getBudgets(selectedMonth);

      if (!isMounted) {
        return;
      }

      if (isBudgetsPayload(budgets)) {
        setBudgetData(budgets);
      } else {
        setBudgetData(EMPTY_BUDGETS);
      }
    };

    loadBudgetData();

    const handleRefresh = () => {
      loadBudgetData();
    };

    window.addEventListener('budgets:updated', handleRefresh);
    window.addEventListener('transactions:updated', handleRefresh);

    return () => {
      isMounted = false;
      window.removeEventListener('budgets:updated', handleRefresh);
      window.removeEventListener('transactions:updated', handleRefresh);
    };
  }, [selectedMonth]);

  return {
    budgetData
  };
};

export default useBudgetData;
