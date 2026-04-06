import React from 'react';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';

const AmountInput = ({ value, onChange }) => (
  <Box className="amount-input-section">
    <Typography variant="body2" className="input-label">
      Amount
    </Typography>
    <TextField
      fullWidth
      variant="standard"
      placeholder="0.00"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      type="number"
      className="amount-input"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Typography variant="h4" className="currency-symbol">
              ₱
            </Typography>
          </InputAdornment>
        ),
        disableUnderline: true
      }}
      inputProps={{ className: 'amount-input-text' }}
    />
  </Box>
);

export default AmountInput;
