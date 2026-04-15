import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';

const NeedsBudgetSetupCard = ({ uncategorizedExpenseItems, tipOfTheDay, onSetCategoryBudgets }) => (
  <Paper elevation={0} className="dashboard-budget-health-card dashboard-setup-card">
    <Typography variant="h6" className="dashboard-section-title">
      Needs Budget Setup
    </Typography>

    {uncategorizedExpenseItems.length === 0 ? (
      <Typography variant="body2" className="dashboard-empty-copy">
        {tipOfTheDay}
      </Typography>
    ) : (
      <>
        <Box className="dashboard-uncategorized-list">
          {uncategorizedExpenseItems.slice(0, 6).map((item) => (
            <Box key={item.id} className="dashboard-uncategorized-pill">
              <span>{item.icon}</span>
              <Typography variant="body2">{item.name}</Typography>
            </Box>
          ))}
        </Box>
        <Button variant="contained" className="dashboard-primary-btn" onClick={onSetCategoryBudgets}>
          Set Category Budgets
        </Button>
      </>
    )}
  </Paper>
);

export default NeedsBudgetSetupCard;
