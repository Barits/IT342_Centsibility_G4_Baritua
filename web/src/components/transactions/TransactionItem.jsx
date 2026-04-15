import React from 'react';
import { Box, Typography } from '@mui/material';

const COLOR_CLASS_BY_HEX = {
  '#EF4444': 'transaction-color-red',
  '#3B82F6': 'transaction-color-blue',
  '#EC4899': 'transaction-color-pink',
  '#F59E0B': 'transaction-color-amber',
  '#8B5CF6': 'transaction-color-violet',
  '#10B981': 'transaction-color-green'
};

const formatCurrency = (amount) => (`₱${Math.abs(amount).toLocaleString('en-PH', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})}`);

const TransactionItem = ({ transaction }) => {
  const numericAmount = Number(transaction.amount) || 0;

  return (
    <Box className="transaction-item">
      <Box className={`transaction-icon ${COLOR_CLASS_BY_HEX[transaction.color] || 'transaction-color-default'}`}>
        <span>{transaction.icon}</span>
      </Box>

      <Box className="transaction-details">
        <Typography variant="body1" className="transaction-name">
          {transaction.name}
        </Typography>
        <Typography variant="caption" className="transaction-category">
          {transaction.category}
        </Typography>
      </Box>

      <Box className="transaction-amount-container">
        <Typography variant="body1" className="transaction-amount negative">
          -{formatCurrency(numericAmount)}
        </Typography>
        <Typography variant="caption" className="transaction-time">
          {transaction.time || 'Recent'}
        </Typography>
      </Box>
    </Box>
  );
};

export default TransactionItem;
