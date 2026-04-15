import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const SuggestedBudgetList = ({ budgets, formatCurrency, onSetBudget }) => (
  <Box className="suggested-budgets-list">
    {budgets.map((budget) => (
      <Box key={budget.id} className="suggested-budget-item">
        <Box className="suggested-budget-main">
          <Box className="suggested-budget-icon">{budget.icon}</Box>
          <Box>
            <Typography variant="body1" className="suggested-budget-name">
              {budget.name}
            </Typography>
            <Typography variant="caption" className="suggested-budget-meta">
              Suggested: {formatCurrency(budget.amount)}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="outlined"
          className="suggested-budget-action"
          onClick={() => onSetBudget(budget.name)}
        >
          Use
        </Button>
      </Box>
    ))}
  </Box>
);

export default SuggestedBudgetList;
