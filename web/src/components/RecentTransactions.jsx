import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../css/components/RecentTransactions.css';

const RecentTransactions = ({ transactions = [] }) => {
  const navigate = useNavigate();

  const defaultTransactions = [
    {
      id: 1,
      name: 'Grocery Shopping',
      category: 'Food',
      icon: '🍔',
      amount: -350.00,
      time: '2:30 PM',
      date: 'Today'
    },
    {
      id: 2,
      name: 'Salary',
      category: 'Income',
      icon: '💰',
      amount: 8250.00,
      time: '9:00 AM',
      date: 'Today'
    },
    {
      id: 3,
      name: 'Grab Ride',
      category: 'Transport',
      icon: '🚗',
      amount: -120.00,
      time: '11:15 AM',
      date: 'Yesterday'
    },
    {
      id: 4,
      name: 'Netflix Subscription',
      category: 'Entertainment',
      icon: '🎬',
      amount: -549.00,
      time: '12:00 AM',
      date: 'Yesterday'
    }
  ];

  const transactionData = transactions.length > 0 ? transactions : defaultTransactions;

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

      <Box className="transactions-list">
        {transactionData.map((transaction) => (
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
    </Box>
  );
};

export default RecentTransactions;
