import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmptyState from './EmptyState';
import '../css/components/BalanceCard.css';

const BalanceCard = ({ balance, monthChange }) => {
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

      {balance === null || balance === undefined ? (
        <EmptyState
          title="No balance data yet"
          description="Connect your transaction summary endpoint to display the live account balance here."
        />
      ) : (
        <>
          <Typography variant="h3" className="balance-card-amount">
            {showBalance ? formatCurrency(balance) : '₱•••••••'}
          </Typography>

          <Box className="balance-card-change">
            <Typography variant="body2" className="balance-change-text">
              <span className="up-arrow">↗</span>
              {monthChange === null || monthChange === undefined
                ? 'No monthly change available'
                : `+${formatCurrency(monthChange)} this month`}
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default BalanceCard;
