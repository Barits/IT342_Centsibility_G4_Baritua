import React from 'react';
import { Alert, Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AmountInput from './AmountInput';
import ExpenseDetailsFields from './ExpenseDetailsFields';
import CategorySelector from '../CategorySelector';
import Header from '../Header';
import Sidebar from '../Sidebar';

const AddTransactionExpenseScreen = ({ form, onBack }) => (
  <Box className="add-transaction-root">
    <Sidebar />
    <Box className="add-transaction-main">
      <Header title="Add Transaction" showAvatar={false} />

      <Box className="add-transaction-header">
        <Button
          onClick={onBack}
          className="add-transaction-back-btn"
          startIcon={<ArrowBackIcon />}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h6" className="add-transaction-title">
          New Entry
        </Typography>
        <Box className="add-transaction-header-spacer" />
      </Box>

      <Box className="add-transaction-content">
        {form.error && <Alert severity="error">{form.error}</Alert>}
        <Box className="add-transaction-grid">
          <Box className="form-column left-column">
            <AmountInput value={form.amount} onChange={form.setAmount} />

            <CategorySelector
              selectedCategory={form.category}
              onSelect={form.setCategory}
              categories={form.expenseCategories}
              className="add-transaction-category-selector"
            />
          </Box>

          <Box className="form-column right-column">
            <ExpenseDetailsFields
              description={form.description}
              notes={form.notes}
              date={form.date}
              onDescriptionChange={form.setDescription}
              onNotesChange={form.setNotes}
              onDateChange={form.setDate}
            />

            <Button
              fullWidth
              variant="outlined"
              className="attach-receipt-btn"
              startIcon={<AttachFileIcon />}
            >
              Attach receipt
            </Button>
          </Box>
        </Box>

        <Box className="save-bar">
          <Button
            fullWidth
            variant="contained"
            className="save-transaction-btn"
            onClick={form.submitExpense}
            disabled={form.saving || !form.hasCurrentMonthBudget}
          >
            {form.saving ? 'Saving...' : 'Save Transaction'}
          </Button>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default AddTransactionExpenseScreen;
