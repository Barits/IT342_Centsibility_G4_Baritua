import React from 'react';
import { Box } from '@mui/material';
import StatCard from '../StatCard';

const AnalyticsStatsRow = ({ summary, formatCurrency }) => (
  <Box className="analytics-stats">
    <StatCard
      title="Current Month Budget"
        value={summary?.currentMonthBudget !== null && summary?.currentMonthBudget !== undefined ? formatCurrency(summary.currentMonthBudget) : null}
      icon="📈"
      color="#10B981"
    />
    <StatCard
      title="Total Expenses"
      value={summary?.totalExpenses !== null && summary?.totalExpenses !== undefined ? formatCurrency(summary.totalExpenses) : null}
      icon="📉"
      color="#EF4444"
    />
  </Box>
);

export default AnalyticsStatsRow;
