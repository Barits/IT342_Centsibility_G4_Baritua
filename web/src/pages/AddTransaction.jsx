import React, { useState } from 'react';
import { Box, Typography, TextField, Button, ToggleButton, ToggleButtonGroup, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CategorySelector from '../components/CategorySelector';
import '../css/AddTransaction.css';

const AddTransaction = () => {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleTypeChange = (event, newType) => {
    if (newType !== null) {
      setTransactionType(newType);
    }
  };

  const handleSubmit = () => {
    // TODO: Implement save transaction
    console.log('Save transaction:', {
      type: transactionType,
      amount,
      category,
      description,
      date,
      notes
    });
    navigate('/transactions');
  };

  return (
    <Box className="add-transaction-root">
      <Box className="add-transaction-header">
        <Button 
          onClick={() => navigate(-1)}
          className="add-transaction-back-btn"
          startIcon={<ArrowBackIcon />}
        >
        </Button>
        <Typography variant="h6" className="add-transaction-title">
          Add Transaction
        </Typography>
        <Box sx={{ width: 40 }} />
      </Box>

      <Box className="add-transaction-content">
        {/* Type Toggle */}
        <ToggleButtonGroup
          value={transactionType}
          exclusive
          onChange={handleTypeChange}
          className="transaction-type-toggle"
        >
          <ToggleButton value="income" className="toggle-btn income-toggle">
            Income
          </ToggleButton>
          <ToggleButton value="expense" className="toggle-btn expense-toggle">
            Expense
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Amount Input */}
        <Box className="amount-input-section">
          <Typography variant="body2" className="input-label">
            Amount
          </Typography>
          <TextField
            fullWidth
            variant="standard"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
            inputProps={{
              style: { fontSize: 48, fontWeight: 700, textAlign: 'left' }
            }}
          />
        </Box>

        {/* Category Selector */}
        <CategorySelector 
          selectedCategory={category}
          onSelect={setCategory}
        />

        {/* Description */}
        <Box className="input-field">
          <Typography variant="body2" className="input-label">
            Description
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="e.g., Lunch at restaurant"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description-input"
          />
        </Box>

        {/* Date */}
        <Box className="input-field">
          <Typography variant="body2" className="input-label">
            Date
          </Typography>
          <TextField
            fullWidth
            type="date"
            variant="outlined"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-input"
          />
        </Box>

        {/* Notes */}
        <Box className="input-field">
          <Typography variant="body2" className="input-label">
            Notes (optional)
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Add a note..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="notes-input"
          />
        </Box>

        {/* Attach Receipt */}
        <Button
          fullWidth
          variant="outlined"
          className="attach-receipt-btn"
          startIcon={<AttachFileIcon />}
        >
          Attach receipt
        </Button>

        {/* Save Button */}
        <Button
          fullWidth
          variant="contained"
          className="save-transaction-btn"
          onClick={handleSubmit}
        >
          Save Transaction
        </Button>
      </Box>
    </Box>
  );
};

export default AddTransaction;
