import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const RecentTransactionsCard = ({ recentTransactions, formatCurrencyCompact, formatTransactionTime }) => (
  <Paper elevation={0} className="dashboard-budget-health-card">
    <Typography variant="h6" className="dashboard-section-title">
      Recent Transactions
    </Typography>

    {recentTransactions.length === 0 ? (
      <Typography variant="body2" className="dashboard-empty-copy">
        No recent activity yet. Add a quick expense to verify entries are being recorded.
      </Typography>
    ) : (
      <Box className="dashboard-recent-list">
        {recentTransactions.map((transaction) => (
          <Box key={transaction.id} className="dashboard-recent-item">
            <Box className="dashboard-recent-main">
              <Typography variant="body2" className="dashboard-recent-name">
                {transaction.name}
              </Typography>
              <Typography variant="caption" className="dashboard-recent-meta">
                {transaction.category} • {formatTransactionTime(transaction)}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              className={`dashboard-recent-amount ${Number(transaction.amount) < 0 ? 'negative' : 'positive'}`}
            >
              {Number(transaction.amount) < 0 ? '-' : '+'}
              {formatCurrencyCompact(Math.abs(Number(transaction.amount) || 0))}
            </Typography>
          </Box>
        ))}
      </Box>
    )}
  </Paper>
);

export default RecentTransactionsCard;
