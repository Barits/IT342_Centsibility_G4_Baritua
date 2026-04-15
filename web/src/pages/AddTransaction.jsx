import { useLocation, useNavigate } from 'react-router-dom';
import AddTransactionExpenseScreen from '../components/addTransaction/AddTransactionExpenseScreen';
import useAddTransactionForm from '../hooks/useAddTransactionForm';
import '../css/AddTransaction.css';

const AddTransaction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const form = useAddTransactionForm(location.search, () => navigate('/transactions', {
    state: {
      refreshTs: Date.now()
    }
  }));

  return <AddTransactionExpenseScreen form={form} onBack={() => navigate(-1)} />;
};

export default AddTransaction;
