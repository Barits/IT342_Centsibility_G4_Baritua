import { useSelector, useDispatch } from 'react-redux';
import { setTransactions, setLoading, setError } from '../store/slices/transactionSlice';
import transactionService from '../services/transactionService';

export const useTransactions = () => {
  const dispatch = useDispatch();
  const { transactions, currentTransaction, loading, error } = useSelector(
    (state) => state.transactions
  );

  const fetchTransactions = async () => {
    try {
      dispatch(setLoading(true));
      const data = await transactionService.getAllTransactions();
      dispatch(setTransactions(data));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError(err.message));
      dispatch(setLoading(false));
    }
  };

  return {
    transactions,
    currentTransaction,
    loading,
    error,
    fetchTransactions,
  };
};

export default useTransactions;
