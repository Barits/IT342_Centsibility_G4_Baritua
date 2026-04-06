import React from 'react';
import { Paper, Typography } from '@mui/material';

const SafeToSpendCard = ({ remainingAmount, formatCurrency }) => (
  <Paper elevation={0} className="dashboard-safe-card">
    <Typography variant="caption" className="dashboard-safe-label">
      SAFE TO SPEND
    </Typography>
    <Typography variant="h3" className={`dashboard-safe-value ${remainingAmount < 0 ? 'negative' : 'positive'}`}>
      {formatCurrency(remainingAmount)}
    </Typography>
    <Typography variant="body2" className="dashboard-safe-caption">
      {remainingAmount < 0
        ? 'You are above budget. Review high-spend categories today.'
        : 'Amount available before reaching your monthly budget limits.'}
    </Typography>
  </Paper>
);

export default SafeToSpendCard;
