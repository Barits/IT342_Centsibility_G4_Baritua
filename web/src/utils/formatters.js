// Format currency to PHP or other currency
export const formatCurrency = (amount, currency = 'PHP') => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Format date
export const formatDate = (date, format = 'short') => {
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (format === 'short') {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } else if (format === 'full') {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  } else if (format === 'time') {
    return dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  
  return dateObj.toLocaleDateString();
};

// Format date for input
export const formatDateForInput = (date) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toISOString().split('T')[0];
};

// Format number
export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

// Format percentage
export const formatPercentage = (value) => {
  return `${value.toFixed(2)}%`;
};
