import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmptyState from './EmptyState';
import '../css/components/RecentTransactions.css';

const RecentTransactions = ({ transactions = [] }) => {
  const navigate = useNavigate();

  const formatCurrency = (amount) => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}₱${Math.abs(amount).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <Box className="recent-transactions">
      <Box className="recent-transactions-header">
        <Typography variant="h6" className="recent-transactions-title">
          Recent Transactions
        </Typography>
        <Typography 
          variant="body2" 
          className="recent-transactions-see-all"
          onClick={() => navigate('/transactions')}
        >
          See All
        </Typography>
      </Box>

      {transactions.length === 0 ? (
        <EmptyState
          title="No recent transactions"
          description="Transactions from the backend will appear here once you add them."
          actionLabel="Add transaction"
          onAction={() => navigate('/add-transaction')}
        />
      ) : (
        <Box className="transactions-list">
        {transactions.map((transaction) => (
          <Box key={transaction.id} className="transaction-item">
            <Box className="transaction-icon-container">
              <Box className="transaction-icon">{transaction.icon}</Box>
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
              <Typography 
                variant="body1" 
                className={`transaction-amount ${transaction.amount >= 0 ? 'positive' : 'negative'}`}
              >
                {formatCurrency(transaction.amount)}
              </Typography>
              <Typography variant="caption" className="transaction-time">
                {transaction.time}
              </Typography>
            </Box>
          </Box>
        ))}
        </Box>
      )}
    </Box>
  );
};

export default RecentTransactions;
