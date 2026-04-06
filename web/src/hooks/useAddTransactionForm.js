import { useEffect, useMemo, useState } from 'react';
import { createTransaction, getCategories } from '../services/appDataService';

const DEFAULT_EXPENSE_CATEGORIES = [
  { id: 'food', label: 'Food', icon: '🍔', color: '#EF4444' },
  { id: 'transport', label: 'Transport', icon: '🚗', color: '#3B82F6' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️', color: '#EC4899' },
  { id: 'bills', label: 'Bills', icon: '💡', color: '#F59E0B' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬', color: '#8B5CF6' },
  { id: 'health', label: 'Health', icon: '💊', color: '#EF4444' },
  { id: 'education', label: 'Education', icon: '📚', color: '#3B82F6' },
  { id: 'housing', label: 'Housing', icon: '🏠', color: '#10B981' },
  { id: 'subscriptions', label: 'Subscriptions', icon: '📱', color: '#3B82F6' },
  { id: 'other', label: 'Other', icon: '📦', color: '#6B7280' }
];

const useAddTransactionForm = (locationSearch, onSuccess) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      const data = await getCategories();
      if (isMounted) {
        setCategories(Array.isArray(data) ? data : []);
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const expenseCategories = useMemo(() => {
    const filteredExpenseCategories = categories.filter((item) => {
      const normalizedId = String(item.id || '').toLowerCase();
      const normalizedLabel = String(item.label || '').toLowerCase();
      return !['income', 'salary', 'general-income'].includes(normalizedId)
        && !['income', 'salary', 'general income'].includes(normalizedLabel);
    });

    return filteredExpenseCategories.length > 0
      ? filteredExpenseCategories
      : DEFAULT_EXPENSE_CATEGORIES;
  }, [categories]);

  useEffect(() => {
    const params = new URLSearchParams(locationSearch);
    const quickCategory = String(params.get('category') || '').toLowerCase();
    const quickDescription = params.get('description');

    const matchedCategory = expenseCategories.find((item) => String(item.id || '').toLowerCase() === quickCategory);
    if (matchedCategory) {
      setCategory(matchedCategory.id);
    }

    if (quickDescription) {
      setDescription(quickDescription);
    }
  }, [locationSearch, expenseCategories]);

  const submitExpense = async () => {
    setError('');

    if (!amount || Number(amount) <= 0) {
      setError('Please enter a valid amount greater than zero.');
      return;
    }

    if (!category) {
      setError('Please select a category.');
      return;
    }

    setSaving(true);

    try {
      await createTransaction({
        type: 'expense',
        amount: Number(amount),
        category,
        description,
        date,
        notes
      });
      onSuccess();
    } catch (submitError) {
      setError('Unable to save transaction right now. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return {
    amount,
    setAmount,
    category,
    setCategory,
    description,
    setDescription,
    date,
    setDate,
    notes,
    setNotes,
    expenseCategories,
    error,
    saving,
    submitExpense
  };
};

export default useAddTransactionForm;
