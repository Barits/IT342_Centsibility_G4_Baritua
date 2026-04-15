export const BUDGETS_CACHE_KEY = 'centsibility.budgets.overview';

export const EMPTY_BUDGETS = {
  summary: null,
  categoryBudgets: [],
  uncategorized: []
};

export const isBudgetsPayload = (value) => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return Array.isArray(value.categoryBudgets) && Array.isArray(value.uncategorized);
};

export const readCachedBudgets = () => {
  try {
    const rawValue = window.localStorage.getItem(BUDGETS_CACHE_KEY);
    if (!rawValue) {
      return EMPTY_BUDGETS;
    }

    const parsedValue = JSON.parse(rawValue);
    return isBudgetsPayload(parsedValue) ? parsedValue : EMPTY_BUDGETS;
  } catch (cacheError) {
    return EMPTY_BUDGETS;
  }
};

export const writeCachedBudgets = (payload) => {
  try {
    window.localStorage.setItem(BUDGETS_CACHE_KEY, JSON.stringify(payload));
  } catch (cacheError) {
    // Ignore cache write failures and keep in-memory state.
  }
};

export const toMonthValue = (dateInput) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    const fallback = new Date();
    return `${fallback.getFullYear()}-${String(fallback.getMonth() + 1).padStart(2, '0')}`;
  }

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

export const formatMonthLabelFromValue = (monthValue) => {
  const [yearText, monthText] = String(monthValue || '').split('-');
  const year = Number(yearText);
  const month = Number(monthText);

  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    return 'Invalid month';
  }

  const date = new Date(year, month - 1, 1);
  return date.toLocaleString('en-PH', { month: 'long', year: 'numeric' });
};

export const getBudgetMonthOptions = () => {
  const baseDate = new Date();

  return Array.from({ length: 3 }, (_, index) => {
    const optionDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + index, 1);
    const value = toMonthValue(optionDate);

    return {
      value,
      label: formatMonthLabelFromValue(value)
    };
  });
};

export const isMonthWithinAllowedRange = (monthValue) => {
  const allowedValues = getBudgetMonthOptions().map((item) => item.value);
  return allowedValues.includes(monthValue);
};

export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) {
    return '—';
  }

  return `₱${amount.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

export const getPercentage = (spent, limit) => {
  if (!limit || limit <= 0) {
    return 0;
  }

  return Math.min((spent / limit) * 100, 100);
};

export const getProgressTone = (percentage) => {
  if (percentage >= 90) {
    return 'danger';
  }

  if (percentage >= 70) {
    return 'warning';
  }

  return 'good';
};

export const getLastMonthSpentByCategory = (transactions) => {
  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthYear = lastMonth.getFullYear();
  const lastMonthIndex = lastMonth.getMonth();

  return safeTransactions.reduce((acc, transaction) => {
    const amount = Number(transaction.amount);
    const dateValue = transaction.date ? new Date(transaction.date) : null;

    if (!dateValue || Number.isNaN(dateValue.getTime())) {
      return acc;
    }

    if (dateValue.getFullYear() !== lastMonthYear || dateValue.getMonth() !== lastMonthIndex) {
      return acc;
    }

    if (amount >= 0) {
      return acc;
    }

    const key = String(transaction.category || '').trim().toLowerCase();
    if (!key) {
      return acc;
    }

    acc[key] = (acc[key] || 0) + Math.abs(amount);
    return acc;
  }, {});
};
