import { useEffect, useMemo, useState } from 'react';
import { createTransaction, DEFAULT_EXPENSE_CATEGORIES, getCategories } from '../services/appDataService';

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
    const mergedCategories = [...categories, ...DEFAULT_EXPENSE_CATEGORIES];
    const uniqueCategories = [];
    const seenCategoryKeys = new Set();

    mergedCategories.forEach((item) => {
      const key = String(item.id || item.label || '').trim().toLowerCase();

      if (!key || seenCategoryKeys.has(key)) {
        return;
      }

      seenCategoryKeys.add(key);
      uniqueCategories.push(item);
    });

    return uniqueCategories;
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
