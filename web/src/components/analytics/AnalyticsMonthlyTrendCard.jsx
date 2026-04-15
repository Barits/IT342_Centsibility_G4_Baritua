import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import EmptyState from '../EmptyState';

const AnalyticsMonthlyTrendCard = ({ items, formatCurrency }) => (
  <Paper elevation={0} className="analytics-card">
    <Typography variant="h6" className="analytics-card-title">
      Monthly Trend
    </Typography>
    {items.length === 0 ? (
      <EmptyState
        title="No monthly trend yet"
        description="Show the month-by-month income and expense trend once backend analytics are available."
      />
    ) : (
      <Box className="analytics-list">
        {items.map((item) => (
          <Box key={item.month} className="analytics-list-item">
            <Typography variant="body2" className="analytics-list-label">
              {item.month}
            </Typography>
            <Typography variant="body2" className="analytics-list-value">
              Income {formatCurrency(item.income)} | Expenses {formatCurrency(item.expenses)}
            </Typography>
          </Box>
        ))}
      </Box>
    )}
  </Paper>
);

export default AnalyticsMonthlyTrendCard;
