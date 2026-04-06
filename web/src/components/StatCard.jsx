import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import '../css/components/StatCard.css';

const StatCard = ({ title, value, change, icon, color = '#10B981' }) => {
  const displayValue = value === null || value === undefined ? '—' : value;
  const isPositive = change >= 0;
  const colorClassByHex = {
    '#10B981': 'stat-card-green',
    '#EF4444': 'stat-card-red',
    '#3B82F6': 'stat-card-blue',
    '#8B5CF6': 'stat-card-violet'
  };
  
  return (
    <Paper elevation={0} className="stat-card">
      <Box className="stat-card-header">
        <Box className={`stat-card-icon ${colorClassByHex[color] || 'stat-card-default'}`}>
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
        {displayValue}
      </Typography>
    </Paper>
  );
};

export default StatCard;
