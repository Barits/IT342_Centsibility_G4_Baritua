import React from 'react';
import { Box, Typography } from '@mui/material';

const TransactionsSummaryCard = ({ totalSpent }) => (
  <Box className="transactions-summary-card">
    <Typography variant="caption" className="transactions-summary-label">
      TOTAL SPENT (EXPENSES ONLY)
    </Typography>
    <Typography variant="h5" className="transactions-summary-value">
      ₱{totalSpent.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </Typography>
  </Box>
);

export default TransactionsSummaryCard;
