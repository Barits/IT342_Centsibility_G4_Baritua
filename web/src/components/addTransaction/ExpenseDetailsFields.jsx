import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

const ExpenseDetailsFields = ({ description, notes, date, onDescriptionChange, onNotesChange, onDateChange }) => (
  <>
    <Box className="input-field">
      <Typography variant="body2" className="input-label">
        Description
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="e.g., Lunch at restaurant"
        value={description}
        onChange={(event) => onDescriptionChange(event.target.value)}
        className="description-input"
      />
    </Box>

    <Box className="input-field">
      <Typography variant="body2" className="input-label">
        Date
      </Typography>
      <TextField
        fullWidth
        type="date"
        variant="outlined"
        value={date}
        onChange={(event) => onDateChange(event.target.value)}
        className="date-input"
      />
    </Box>

    <Box className="input-field">
      <Typography variant="body2" className="input-label">
        Notes (optional)
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        placeholder="Add a note..."
        value={notes}
        onChange={(event) => onNotesChange(event.target.value)}
        className="notes-input"
      />
    </Box>
  </>
);

export default ExpenseDetailsFields;
