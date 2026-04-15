import { useMemo, useState } from 'react';
import { upsertBudgetPlan } from '../services/appDataService';
import {
  toMonthValue,
  getBudgetMonthOptions,
  isMonthWithinAllowedRange
} from '../utils/financeHelpers';

const useAddBudgetForm = (onSuccess, options = {}) => {
  const {
    initialAmount = '',
    initialMonth = toMonthValue(new Date()),
    allowAnyMonth = false
  } = options;

  const monthOptions = useMemo(() => getBudgetMonthOptions(), []);
  const [amount, setAmount] = useState(String(initialAmount ?? ''));
  const [month, setMonth] = useState(String(initialMonth ?? toMonthValue(new Date())));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const submitBudget = async () => {
    setError('');

    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid budget amount greater than zero.');
      return;
    }

    if (!allowAnyMonth && !isMonthWithinAllowedRange(month)) {
      setError('Please select a month from the current month up to 2 months ahead.');
      return;
    }

    setSaving(true);

    try {
      const payload = await upsertBudgetPlan({
        month,
        amount: parsedAmount
      });

      window.dispatchEvent(new Event('budgets:updated'));

      onSuccess(payload);
    } catch (saveError) {
      setError('Unable to save budget right now. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return {
    amount,
    setAmount,
    month,
    setMonth,
    monthOptions,
    error,
    saving,
    submitBudget
  };
};

export default useAddBudgetForm;
