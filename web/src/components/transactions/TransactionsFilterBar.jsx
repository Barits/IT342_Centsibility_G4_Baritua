import React from 'react';
import { Box, Chip } from '@mui/material';

const TransactionsFilterBar = ({ filters, activeFilter, onFilterChange }) => (
  <Box className="transactions-filters">
    {filters.map((filter) => (
      <Chip
        key={filter}
        label={filter}
        onClick={() => onFilterChange(filter)}
        className={`transaction-filter-chip ${activeFilter === filter ? 'active' : ''}`}
      />
    ))}
  </Box>
);

export default TransactionsFilterBar;
