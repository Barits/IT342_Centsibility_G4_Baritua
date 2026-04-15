import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import EmptyState from '../EmptyState';

const AnalyticsMonthlyTrendCard = ({ items, formatCurrency }) => (
  <Paper elevation={0} className="analytics-card">
    <Typography variant="h6" className="analytics-card-title">
      Monthly Breakdown
    </Typography>
    {items.length === 0 ? (
      <EmptyState
        title="No monthly breakdown yet"
        description="Category totals will appear here once the backend analytics are available."
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

export default AnalyticsMonthlyTrendCard;
