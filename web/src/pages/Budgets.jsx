import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, MenuItem, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import BudgetOverviewCard from '../components/budgets/BudgetOverviewCard';
import useBudgetData from '../hooks/useBudgetData';
import { getBudgetPlans } from '../services/appDataService';
import {
  formatCurrency,
  getPercentage,
  getProgressTone,
  getBudgetMonthOptions,
  isMonthWithinAllowedRange,
  toMonthValue,
  formatMonthLabelFromValue
} from '../utils/financeHelpers';
import '../css/Budgets.css';

const Budgets = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentMonthValue = toMonthValue(new Date());
  const [selectedMonth, setSelectedMonth] = useState(() => location.state?.selectedMonth || currentMonthValue);
  const [monthPlans, setMonthPlans] = useState([]);
  const {
    budgetData
  } = useBudgetData(selectedMonth);

  const monthOptions = useMemo(() => getBudgetMonthOptions(), []);
  const selectedPlan = monthPlans.find((plan) => plan.month === selectedMonth);
  const totalBudget = (Number(budgetData.summary?.budgeted) || 0) || (Number(selectedPlan?.amount) || 0);
  const totalSpent = Number(budgetData.summary?.spent) || 0;

  const remainingAmount = totalBudget - totalSpent;
  const spentPercentage = getPercentage(totalSpent, totalBudget);

  const sortedMonthPlans = [...monthPlans].sort((a, b) => a.month.localeCompare(b.month));

  useEffect(() => {
    const nextSelectedMonth = location.state?.selectedMonth;
    if (nextSelectedMonth) {
      setSelectedMonth(nextSelectedMonth);
    }
  }, [location.state]);

  useEffect(() => {
    let isMounted = true;

    const loadMonthPlans = async () => {
      const plans = await getBudgetPlans();

      if (!isMounted) {
        return;
      }

      setMonthPlans(Array.isArray(plans) ? plans : []);
    };

    loadMonthPlans();

    const handleBudgetOrTransactionUpdate = () => {
      loadMonthPlans();
    };

    window.addEventListener('budgets:updated', handleBudgetOrTransactionUpdate);
    window.addEventListener('transactions:updated', handleBudgetOrTransactionUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener('budgets:updated', handleBudgetOrTransactionUpdate);
      window.removeEventListener('transactions:updated', handleBudgetOrTransactionUpdate);
    };
  }, [location.state?.refreshTs]);

  const handleCreateBudget = () => {
    navigate('/add-budget');
  };

  return (
    <Box className="budgets-root">
      <Sidebar />
      <Box className="budgets-main">
        <Header 
          title="Budgets" 
          showAvatar={false}
        />

      <Box className="budgets-month-filter-row">
        <TextField
          select
          value={selectedMonth}
          onChange={(event) => setSelectedMonth(event.target.value)}
          className="budgets-month-select"
        >
          {monthOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" className="new-budget-btn" onClick={handleCreateBudget}>
          Add Budget
        </Button>
      </Box>

      <Box className="budgets-content">
        <Box className="budget-overview-row">
          <BudgetOverviewCard
            cardClass="total"
            label="Total Budget"
            value={formatCurrency(totalBudget)}
            meta="Planned limit for this month"
          />

          <BudgetOverviewCard
            cardClass="spent"
            label="Spent"
            value={formatCurrency(totalSpent)}
            progressValue={spentPercentage}
            progressTone={getProgressTone(spentPercentage)}
            meta={`${Math.round(spentPercentage)}% used`}
          />

          <BudgetOverviewCard
            cardClass="remaining"
            label="Safe to Spend"
            value={formatCurrency(remainingAmount)}
            valueClass={remainingAmount < 0 ? 'negative' : 'positive'}
            meta={remainingAmount < 0 ? 'Over budget for the month' : 'Available before hitting limits'}
          />
        </Box>

        <Box className="budgets-management-layout monthly-layout">
          <Box className="budgets-management-main">
            <Box className="budgets-section-header-row">
              <Typography variant="h6" className="budgets-section-title">
                Monthly Budgets
              </Typography>
            </Box>

            {sortedMonthPlans.length === 0 ? (
              <Paper elevation={0} className="budget-empty-active">
                <AddCircleOutlineIcon className="budget-empty-icon" />
                <Typography variant="h6" className="budget-empty-title">
                  No monthly budgets yet
                </Typography>
                <Typography variant="body2" className="budget-empty-description">
                  Add a monthly budget for this month or up to 2 months in advance.
                </Typography>
                <Button variant="contained" className="budget-empty-action" onClick={handleCreateBudget}>
                  Add First Monthly Budget
                </Button>
              </Paper>
            ) : (
              <Paper elevation={0} className="monthly-budget-list-card">
                {sortedMonthPlans.map((plan) => (
                  <Box key={plan.month} className="monthly-budget-row">
                    <Box>
                      <Typography variant="body1" className="monthly-budget-month">
                        {formatMonthLabelFromValue(plan.month)}
                      </Typography>
                      <Typography variant="caption" className="monthly-budget-updated-at">
                        Last updated: {new Date(plan.updatedAt || Date.now()).toLocaleDateString('en-PH')}
                      </Typography>
                    </Box>

                    <Box className="monthly-budget-row-actions">
                      <Typography variant="h6" className="monthly-budget-amount">
                        {formatCurrency(Number(plan.amount) || 0)}
                      </Typography>
                      {isMonthWithinAllowedRange(plan.month) && (
                        <Button
                          variant="outlined"
                          size="small"
                          className="edit-budget-inline-btn"
                          onClick={() => navigate('/edit-budget', {
                            state: {
                              month: plan.month,
                              amount: plan.amount
                            }
                          })}
                        >
                          Edit Budget
                        </Button>
                      )}
                    </Box>
                  </Box>
                ))}
              </Paper>
            )}
          </Box>
        </Box>
      </Box>
      </Box>
    </Box>
  );
};

export default Budgets;
