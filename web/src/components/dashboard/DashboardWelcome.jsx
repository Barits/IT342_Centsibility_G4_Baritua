import React from 'react';
import { Box, Typography } from '@mui/material';

const DashboardWelcome = ({ dateLabel, firstName }) => (
  <Box className="dashboard-welcome">
    <Typography variant="caption" className="dashboard-date">
      {dateLabel}
    </Typography>
    <Typography variant="h5" className="dashboard-greeting">
      Welcome back, {firstName}!
    </Typography>
  </Box>
);

export default DashboardWelcome;
