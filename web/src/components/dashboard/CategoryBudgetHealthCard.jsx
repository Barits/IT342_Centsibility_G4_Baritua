import React from 'react';
import { Box, Button, LinearProgress, Paper, Typography } from '@mui/material';
import { getPercentage, getProgressTone } from '../../utils/financeHelpers';

const CategoryBudgetHealthCard = ({ budgetHealthItems, overThresholdItems, formatCurrency, onCreateBudget }) => (
  <Paper elevation={0} className="dashboard-budget-health-card">
    <Typography variant="h6" className="dashboard-section-title">
      Category Budget Health
    </Typography>

    {overThresholdItems.length > 0 && (
      <Box className="dashboard-alert-tags">
        {overThresholdItems.map((item) => (
          <Box key={item.id} className="dashboard-alert-tag">
            {item.name} is at {Math.round(getPercentage(Number(item.spent), Number(item.limit)))}%
          </Box>
        ))}
      </Box>
    )}

    {budgetHealthItems.length === 0 ? (
      <Box className="dashboard-empty-inline">
        <Typography variant="body2" className="dashboard-empty-copy">
          No category budgets yet. Set your first monthly budget to start tracking progress.
        </Typography>
        <Button variant="contained" className="dashboard-primary-btn" onClick={onCreateBudget}>
          Create First Budget
        </Button>
      </Box>
    ) : (
      <Box className="dashboard-health-list">
        {budgetHealthItems.map((item) => {
          const percentage = getPercentage(Number(item.spent), Number(item.limit));
          const progressTone = getProgressTone(percentage);

          return (
            <Box key={item.id} className="dashboard-health-item">
              <Box className="dashboard-health-item-header">
                <Typography variant="body1" className="dashboard-health-name">
                  {item.name}
                </Typography>
                <Typography variant="body2" className="dashboard-health-values">
                  {formatCurrency(item.spent)} / {formatCurrency(item.limit)}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={percentage}
                className={`dashboard-health-progress progress-${progressTone}`}
              />
            </Box>
          );
        })}
      </Box>
    )}
  </Paper>
);

export default CategoryBudgetHealthCard;
