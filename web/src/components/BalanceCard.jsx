import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../css/components/BalanceCard.css';

const BalanceCard = ({ balance = 15234.56, monthChange = 2340 }) => {
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (amount) => {
    return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <Paper elevation={0} className="balance-card">
      <Box className="balance-card-header">
        <Typography variant="body2" className="balance-card-label">
          Total Balance
        </Typography>
        <IconButton 
          size="small" 
          onClick={() => setShowBalance(!showBalance)}
          className="balance-visibility-btn"
        >
          {showBalance ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </Box>
      
      <Typography variant="h3" className="balance-card-amount">
        {showBalance ? formatCurrency(balance) : '₱•••••••'}
      </Typography>

      <Box className="balance-card-change">
        <Typography variant="body2" className="balance-change-text">
          <span className="up-arrow">↗</span>
          +{formatCurrency(monthChange)} this month
        </Typography>
      </Box>
    </Paper>
  );
};

export default BalanceCard;
