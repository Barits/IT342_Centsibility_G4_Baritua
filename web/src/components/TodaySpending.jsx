import React from 'react';
import { Box, Typography, LinearProgress, Paper } from '@mui/material';
import '../css/components/TodaySpending.css';

const TodaySpending = ({ spent = 395, dailyAverage = 1128 }) => {
  const percentage = Math.min((spent / dailyAverage) * 100, 100);
  
  const formatCurrency = (amount) => {
    return `₱${amount.toLocaleString('en-PH')}`;
  };

  return (
    <Paper elevation={0} className="today-spending-card">
      <Box className="today-spending-header">
        <Typography variant="body2" className="today-spending-title">
          Today's Spending
        </Typography>
        <Typography variant="h6" className="today-spending-amount">
          {formatCurrency(spent)}
        </Typography>
      </Box>
      
      <LinearProgress 
        variant="determinate" 
        value={percentage} 
        className="today-spending-progress"
      />
      
      <Typography variant="caption" className="today-spending-caption">
        {percentage.toFixed(0)}% of daily average (₱{dailyAverage.toLocaleString('en-PH')})
      </Typography>
    </Paper>
  );
};

export default TodaySpending;
