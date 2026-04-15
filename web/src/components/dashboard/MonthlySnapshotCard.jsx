import React from 'react';
import { Box, Button, LinearProgress, Paper, Typography } from '@mui/material';
import { getProgressTone } from '../../utils/financeHelpers';

const MonthlySnapshotCard = ({
  totalBudget,
  totalSpent,
  spentPercentage,
  formatCurrency,
  onOpenBudgets
}) => (
  <Paper elevation={0} className="dashboard-budget-focus-card">
    <Box className="dashboard-budget-focus-header">
      <Typography variant="h6" className="dashboard-budget-focus-title">
        Monthly Snapshot
      </Typography>
      <Button className="dashboard-budget-focus-btn" onClick={onOpenBudgets}>
        Open Budgets
      </Button>
    </Box>

    <Box className="dashboard-budget-stats two-columns">
      <Box className="dashboard-budget-stat">
        <Typography variant="caption" className="dashboard-budget-stat-label">
          Monthly Budget
        </Typography>
        <Typography variant="h5" className="dashboard-budget-stat-value">
          {formatCurrency(totalBudget)}
        </Typography>
      </Box>

      <Box className="dashboard-budget-stat">
        <Typography variant="caption" className="dashboard-budget-stat-label">
          Spent So Far
        </Typography>
        <Typography variant="h5" className="dashboard-budget-stat-value">
          {formatCurrency(totalSpent)}
        </Typography>
      </Box>
    </Box>

    <LinearProgress
      variant="determinate"
      value={spentPercentage}
      className={`dashboard-budget-progress progress-${getProgressTone(spentPercentage)}`}
    />
    <Typography variant="body2" className="dashboard-budget-progress-copy">
      {Math.round(spentPercentage)}% of your monthly budget used
    </Typography>
  </Paper>
);

export default MonthlySnapshotCard;
