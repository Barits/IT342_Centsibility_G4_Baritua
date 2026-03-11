import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import '../css/components/StatCard.css';

const StatCard = ({ title, value, change, icon, color = '#10B981' }) => {
  const isPositive = change >= 0;
  
  return (
    <Paper elevation={0} className="stat-card">
      <Box className="stat-card-header">
        <Box 
          className="stat-card-icon" 
          sx={{ backgroundColor: `${color}15` }}
        >
          {icon}
        </Box>
        {change !== undefined && (
          <Box className={`stat-card-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
            <Typography variant="caption">
              {isPositive ? '+' : ''}{change}%
            </Typography>
          </Box>
        )}
      </Box>
      
      <Typography variant="caption" className="stat-card-title">
        {title}
      </Typography>
      
      <Typography variant="h5" className="stat-card-value">
        {value}
      </Typography>
    </Paper>
  );
};

export default StatCard;
