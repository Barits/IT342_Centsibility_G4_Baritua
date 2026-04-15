import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import EmptyState from '../EmptyState';

const AnalyticsCategoryBreakdownCard = ({ items, formatCurrency }) => (
  <Paper elevation={0} className="analytics-card">
    <Typography variant="h6" className="analytics-card-title">
      Category Breakdown
    </Typography>
    {items.length === 0 ? (
      <EmptyState
        title="No breakdown data yet"
        description="Backend category totals will show here once they are saved and returned by the API."
      />
    ) : (
      <Box className="analytics-list">
        {items.map((item) => (
          <Box key={item.category} className="analytics-list-item">
            <Typography variant="body2" className="analytics-list-label">
              {item.category}
            </Typography>
            <Typography variant="body2" className="analytics-list-value">
              {formatCurrency(item.amount)}
            </Typography>
          </Box>
        ))}
      </Box>
    )}
  </Paper>
);

export default AnalyticsCategoryBreakdownCard;
