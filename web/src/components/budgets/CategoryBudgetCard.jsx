import React from 'react';
import { Box, Button, LinearProgress, Paper, TextField, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import { getPercentage, getProgressTone } from '../../utils/financeHelpers';

const getStatusIcon = (status) => {
  switch (status) {
    case 'good':
      return <CheckCircleIcon className="budget-status-icon good" />;
    case 'warning':
      return <WarningIcon className="budget-status-icon warning" />;
    case 'exceeded':
      return <ErrorIcon className="budget-status-icon exceeded" />;
    default:
      return null;
  }
};

const CategoryBudgetCard = ({
  budget,
  lastMonthSpent,
  editingBudgetId,
  editingLimit,
  onEditingLimitChange,
  onSave,
  onCancel,
  onStartEdit,
  formatCurrency
}) => {
  const percentage = getPercentage(budget.spent, budget.limit);
  const exceeded = budget.spent > budget.limit;
  const progressTone = getProgressTone(percentage);

  return (
    <Paper elevation={0} className="category-budget-card">
      <Box className="category-budget-header">
        <Box className="category-budget-info">
          <Box className="category-budget-icon">{budget.icon}</Box>
          <Box>
            <Typography variant="body1" className="category-budget-name">
              {budget.name}
            </Typography>
            <Typography variant="caption" className="category-budget-limit">
              {formatCurrency(budget.limit)} budgeted
            </Typography>
          </Box>
        </Box>

        {editingBudgetId === budget.id ? (
          <Box className="category-budget-edit-controls" onClick={(event) => event.stopPropagation()}>
            <TextField
              value={editingLimit}
              onChange={(event) => onEditingLimitChange(event.target.value)}
              size="small"
              type="number"
              className="budget-limit-input"
              inputProps={{ min: 0, step: '0.01' }}
            />
            <Button size="small" className="budget-edit-save" onClick={() => onSave(budget.id)}>
              Save
            </Button>
            <Button size="small" className="budget-edit-cancel" onClick={onCancel}>
              Cancel
            </Button>
          </Box>
        ) : (
          <Box className="category-budget-amount-container">
            <Typography variant="h6" className={`category-budget-amount ${exceeded ? 'exceeded' : ''}`}>
              {formatCurrency(budget.spent)}
            </Typography>
            {getStatusIcon(budget.status)}
          </Box>
        )}
      </Box>

      <Box className="category-budget-comparison-row">
        <Typography variant="caption" className="category-budget-comparison-text">
          Current: {formatCurrency(budget.spent)}
        </Typography>
        <Typography variant="caption" className="category-budget-comparison-text">
          Last month: {formatCurrency(lastMonthSpent)}
        </Typography>
      </Box>

      {exceeded && (
        <Typography variant="caption" className="category-budget-exceeded-text">
          Exceeded by {formatCurrency(budget.spent - budget.limit)}
        </Typography>
      )}

      <Box className="category-budget-progress">
        <LinearProgress
          variant="determinate"
          value={percentage}
          className={`category-progress-bar progress-${progressTone}`}
        />
        <Typography variant="caption" className="category-budget-percentage">
          {Math.round(percentage)}%
        </Typography>
      </Box>

      <Button variant="text" className="edit-budget-inline-btn" onClick={() => onStartEdit(budget)}>
        Edit Limit
      </Button>
    </Paper>
  );
};

export default CategoryBudgetCard;
