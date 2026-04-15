import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import useAddBudgetForm from '../hooks/useAddBudgetForm';
import '../css/AddBudget.css';

const EditBudget = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialMonth = location.state?.month;
  const initialAmount = location.state?.amount;

  const {
    amount,
    setAmount,
    month,
    setMonth,
    monthOptions,
    error,
    saving,
    submitBudget
  } = useAddBudgetForm((savedBudget) => navigate('/budgets', {
    state: {
      refreshTs: Date.now(),
      selectedMonth: savedBudget?.month
    }
  }), {
    initialAmount,
    initialMonth,
  });

  return (
    <Box className="add-budget-root">
      <Sidebar />
      <Box className="add-budget-main">
        <Header title="Edit Budget" showAvatar={false} />

        <Box className="add-budget-header-row">
          <Button
            className="add-budget-back-btn"
            onClick={() => navigate('/budgets')}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
        </Box>

        <Paper elevation={0} className="add-budget-card">
          <Typography variant="h5" className="add-budget-title">
            Update Monthly Budget
          </Typography>
          <Typography variant="body2" className="add-budget-subtitle">
            Adjust a budget you already saved. Select the month and update its amount.
          </Typography>

          <Box className="add-budget-form-grid">
            <Box className="add-budget-field">
              <Typography className="add-budget-label">Budget Amount (PHP)</Typography>
              <TextField
                fullWidth
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0.00"
                inputProps={{ min: 0, step: '0.01' }}
              />
            </Box>

            <Box className="add-budget-field">
              <Typography className="add-budget-label">Month</Typography>
              <TextField
                fullWidth
                select
                value={month}
                onChange={(event) => setMonth(event.target.value)}
              >
                {monthOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" className="add-budget-error-alert">
              {error}
            </Alert>
          )}

          <Box className="add-budget-actions">
            <Button variant="outlined" onClick={() => navigate('/budgets')}>
              Cancel
            </Button>
            <Button variant="contained" onClick={submitBudget} disabled={saving}>
              {saving ? 'Saving...' : 'Update Budget'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default EditBudget;