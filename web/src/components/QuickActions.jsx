import React from 'react';
import { Box, Button } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import '../css/components/QuickActions.css';

const QuickActions = ({ onIncome, onExpense, onTransfer }) => {
  return (
    <Box className="quick-actions">
      <Button 
        variant="contained" 
        className="quick-action-btn income-btn"
        startIcon={<TrendingUpIcon />}
        onClick={onIncome}
      >
        Income
      </Button>
      <Button 
        variant="contained" 
        className="quick-action-btn expense-btn"
        startIcon={<TrendingDownIcon />}
        onClick={onExpense}
      >
        Expense
      </Button>
      <Button 
        variant="contained" 
        className="quick-action-btn transfer-btn"
        startIcon={<SwapHorizIcon />}
        onClick={onTransfer}
      >
        Transfer
      </Button>
    </Box>
  );
};

export default QuickActions;
