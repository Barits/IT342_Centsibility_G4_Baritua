import { useSelector, useDispatch } from 'react-redux';
import { setBudgets, setLoading, setError } from '../store/slices/budgetSlice';
import budgetService from '../services/budgetService';

export const useBudgets = () => {
  const dispatch = useDispatch();
  const { budgets, currentBudget, loading, error } = useSelector(
    (state) => state.budgets
  );

  const fetchBudgets = async () => {
    try {
      dispatch(setLoading(true));
      const data = await budgetService.getAllBudgets();
      dispatch(setBudgets(data));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };

  return {
    budgets,
    currentBudget,
    loading,
    error,
    fetchBudgets,
  };
};

export default useBudgets;
