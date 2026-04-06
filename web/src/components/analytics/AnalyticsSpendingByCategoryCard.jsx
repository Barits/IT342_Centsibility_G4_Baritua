import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import EmptyState from '../EmptyState';

const AnalyticsSpendingByCategoryCard = ({ items, formatCurrency }) => (
  <Paper elevation={0} className="analytics-card">
    <Typography variant="h6" className="analytics-card-title">
      Spending by Category
    </Typography>
    {items.length === 0 ? (
      <EmptyState
        title="No category breakdown yet"
        description="Category analytics will render here once the backend provides grouped spending totals."
      />
    ) : (
      <Box className="analytics-list">
        {items.map((item) => (
          <Box key={item.category} className="analytics-list-item">
            <Typography variant="body2" className="analytics-list-label">
              {item.category}
            </Typography>
            <Typography variant="body2" className="analytics-list-value">
              {item.percentage}% ({formatCurrency(item.amount)})
            </Typography>
          </Box>
        ))}
      </Box>
    )}
  </Paper>
);

export default AnalyticsSpendingByCategoryCard;
