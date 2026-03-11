import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../css/components/BudgetOverview.css';

const BudgetOverview = ({ budgets = [] }) => {
  const navigate = useNavigate();

  const defaultBudgets = [
    {
      id: 1,
      category: 'Food',
      icon: '🍔',
      spent: 3200,
      limit: 5000,
      color: '#10B981'
    },
    {
      id: 2,
      category: 'Transport',
      icon: '🚗',
      spent: 2800,
      limit: 3000,
      color: '#FBBF24'
    },
    {
      id: 3,
      category: 'Entertainment',
      icon: '🎬',
      spent: 1849,
      limit: 2000,
      color: '#F59E0B'
    }
  ];

  const budgetData = budgets.length > 0 ? budgets : defaultBudgets;

  const formatCurrency = (amount) => {
    return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getPercentage = (spent, limit) => {
    return Math.min((spent / limit) * 100, 100);
  };

  return (
    <Box className="budget-overview">
      <Box className="budget-overview-header">
        <Typography variant="h6" className="budget-overview-title">
          Budget Overview
        </Typography>
        <Typography 
          variant="body2" 
          className="budget-overview-see-all"
          onClick={() => navigate('/budgets')}
        >
          See All
        </Typography>
      </Box>

      <Box className="budget-list">
        {budgetData.map((budget) => {
          const percentage = getPercentage(budget.spent, budget.limit);
          return (
            <Box key={budget.id} className="budget-item">
              <Box className="budget-item-header">
                <Box className="budget-item-info">
                  <Box className="budget-item-icon">{budget.icon}</Box>
                  <Typography variant="body1" className="budget-item-category">
                    {budget.category}
                  </Typography>
                </Box>
                <Box className="budget-item-amounts">
                  <Typography variant="body2" className="budget-item-spent">
                    {formatCurrency(budget.spent)}/{formatCurrency(budget.limit)}
                  </Typography>
                </Box>
              </Box>
              
              <Box className="budget-progress-container">
                <LinearProgress 
                  variant="determinate" 
                  value={percentage}
                  className="budget-progress"
                  sx={{
                    backgroundColor: '#E5E7EB',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: budget.color,
                    }
                  }}
                />
                <Typography variant="caption" className="budget-percentage">
                  {Math.round(percentage)}%
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default BudgetOverview;
