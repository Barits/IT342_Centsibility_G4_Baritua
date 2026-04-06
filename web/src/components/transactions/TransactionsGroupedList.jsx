import React from 'react';
import { Box, Typography } from '@mui/material';
import EmptyState from '../EmptyState';
import TransactionItem from './TransactionItem';

const TransactionsGroupedList = ({ groupedTransactions, hasResults, onAddTransaction }) => {
  if (!hasResults) {
    return (
      <Box className="transactions-content">
        <EmptyState
          title="No expense transactions yet"
          description="Only expense entries are shown on this page. Add an expense to get started."
          actionLabel="Add transaction"
          onAction={onAddTransaction}
        />
      </Box>
    );
  }

  return (
    <Box className="transactions-content">
      {Object.entries(groupedTransactions).map(([period, groupedItems]) => (
        <Box key={period} className="transaction-period">
          <Typography variant="caption" className="transaction-period-label">
            {period.toUpperCase()}
          </Typography>
          <Box className="transaction-period-list">
            {groupedItems.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TransactionsGroupedList;
