import React, { useState } from 'react';
import { Box, Typography, Paper, Button, LinearProgress, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../css/Budgets.css';

const Budgets = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('March 2026');

  const budgetSummary = {
    budgeted: 25000.00,
    spent: 18449.00,
    remaining: 6551.00,
    percentage: 74
  };

  const categoryBudgets = [
    { id: 1, name: 'Food', icon: '🍔', spent: 3200, limit: 5000, color: '#10B981', status: 'good' },
    { id: 2, name: 'Transport', icon: '🚗', spent: 2800, limit: 3000, color: '#FBBF24', status: 'warning' },
    { id: 3, name: 'Entertainment', icon: '🎬', spent: 1849, limit: 2000, color: '#F59E0B', status: 'warning' },
    { id: 4, name: 'Shopping', icon: '🛍️', spent: 4800, limit: 4000, color: '#EF4444', status: 'exceeded' },
    { id: 5, name: 'Utilities', icon: '💡', spent: 2200, limit: 3000, color: '#10B981', status: 'good' },
    { id: 6, name: 'Healthcare', icon: '💊', spent: 450, limit: 2000, color: '#10B981', status: 'good' },
    { id: 7, name: 'Education', icon: '📚', spent: 1200, limit: 3000, color: '#10B981', status: 'good' },
    { id: 8, name: 'Other', icon: '📦', spent: 1950, limit: 3000, color: '#10B981', status: 'good' }
  ];

  const categoriesWithoutBudget = [
    { id: 1, name: 'Savings', icon: '💰' },
    { id: 2, name: 'Insurance', icon: '💎' }
  ];

  const formatCurrency = (amount) => {
    return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getPercentage = (spent, limit) => {
    return Math.min((spent / limit) * 100, 100);
  };

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

  return (
    <Box className="budgets-root">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box className="budgets-main">
        <Header 
          title="Budgets" 
          showAvatar={false}
          onMenuClick={() => setSidebarOpen(true)}
        />

      <Box className="budgets-month-selector">
        <IconButton size="small">
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="body1" className="budgets-current-month">
          {currentMonth}
        </Typography>
        <IconButton size="small">
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Box className="budgets-content">
        {/* Monthly Summary */}
        <Paper elevation={0} className="budget-summary-card">
          <Typography variant="caption" className="budget-summary-label">
            MONTHLY SUMMARY
          </Typography>
          
          <Box className="budget-summary-amounts">
            <Box className="budget-summary-item">
              <Typography variant="caption" className="budget-summary-item-label">
                Budgeted
              </Typography>
              <Typography variant="h5" className="budget-summary-item-value">
                {formatCurrency(budgetSummary.budgeted)}
              </Typography>
            </Box>
            
            <Box className="budget-summary-item">
              <Typography variant="caption" className="budget-summary-item-label">
                Spent
              </Typography>
              <Typography variant="h5" className="budget-summary-item-value spent">
                {formatCurrency(budgetSummary.spent)}
              </Typography>
            </Box>
          </Box>

          <Box className="budget-summary-progress">
            <LinearProgress 
              variant="determinate" 
              value={budgetSummary.percentage}
              className="budget-summary-progress-bar"
            />
            <Typography variant="caption" className="budget-summary-progress-text">
              {budgetSummary.percentage}% of budget used
            </Typography>
            <Typography variant="body2" className="budget-summary-remaining">
              {formatCurrency(budgetSummary.remaining)} left
            </Typography>
          </Box>
        </Paper>

        {/* Category Budgets */}
        <Typography variant="h6" className="budgets-section-title">
          Category Budgets
        </Typography>

        <Box className="category-budgets-list">
          {categoryBudgets.map((budget) => {
            const percentage = getPercentage(budget.spent, budget.limit);
            const exceeded = budget.spent > budget.limit;
            
            return (
              <Paper key={budget.id} elevation={0} className="category-budget-card">
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
                  
                  <Box className="category-budget-amount-container">
                    <Typography 
                      variant="h6" 
                      className={`category-budget-amount ${exceeded ? 'exceeded' : ''}`}
                    >
                      {formatCurrency(budget.spent)}
                    </Typography>
                    {getStatusIcon(budget.status)}
                  </Box>
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
                    className="category-progress-bar"
                    sx={{
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: exceeded ? '#EF4444' : budget.color,
                      }
                    }}
                  />
                  <Typography variant="caption" className="category-budget-percentage">
                    {Math.round(percentage)}%
                  </Typography>
                </Box>
              </Paper>
            );
          })}
        </Box>

        {/* Categories Without Budget */}
        <Typography variant="h6" className="budgets-section-title">
          Categories without budgets
        </Typography>
        <Typography variant="body2" className="budgets-section-subtitle">
          Set budgets for other categories
        </Typography>

        <Box className="categories-without-budget">
          {categoriesWithoutBudget.map((category) => (
            <Box key={category.id} className="category-without-budget-item">
              <Box className="category-without-budget-info">
                <Box className="category-budget-icon">{category.icon}</Box>
                <Typography variant="body1" className="category-without-budget-name">
                  {category.name}
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small" 
                className="set-budget-button"
              >
                Set Budget
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
      </Box>
    </Box>
  );
};

export default Budgets;
