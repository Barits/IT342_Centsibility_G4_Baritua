import React from 'react';
import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const TransactionsSearchBar = ({ value, onChange }) => (
  <Box className="transactions-search-container">
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search transactions..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="transactions-search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon className="transactions-search-icon" />
          </InputAdornment>
        )
      }}
    />
  </Box>
);

export default TransactionsSearchBar;
