import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const MonthSelector = ({ currentMonth }) => (
  <Box className="budgets-month-selector">
    <IconButton className="budgets-month-arrow" size="large">
      <ChevronLeftIcon />
    </IconButton>
    <Box className="budgets-month-pill">
      <CalendarMonthIcon className="budgets-month-calendar" />
      <Typography variant="body1" className="budgets-current-month">
        {currentMonth}
      </Typography>
    </Box>
    <IconButton className="budgets-month-arrow" size="large">
      <ChevronRightIcon />
    </IconButton>
  </Box>
);

export default MonthSelector;
