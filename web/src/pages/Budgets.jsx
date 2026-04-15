import React, { useState } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import BudgetOverviewCard from '../components/budgets/BudgetOverviewCard';
import CategoryBudgetCard from '../components/budgets/CategoryBudgetCard';
import CategoriesWithoutBudgetsPanel from '../components/budgets/CategoriesWithoutBudgetsPanel';
import MonthSelector from '../components/budgets/MonthSelector';
import SuggestedBudgetList from '../components/budgets/SuggestedBudgetList';
import useBudgetData from '../hooks/useBudgetData';
import { formatCurrency, getPercentage, getProgressTone } from '../utils/financeHelpers';
import '../css/Budgets.css';

const SUGGESTED_BUDGETS = [
  { id: 'food', name: 'Food', icon: '🍔', amount: 6000 },
  { id: 'rent', name: 'Rent', icon: '🏠', amount: 12000 },
  { id: 'bills', name: 'Bills', icon: '💡', amount: 3500 }
];

const EXCLUDED_UNCATEGORIZED = ['income', 'salary', 'general income'];

const Budgets = () => {
  const [currentMonth] = useState('Current month');
  const [editingBudgetId, setEditingBudgetId] = useState(null);
  const [editingLimit, setEditingLimit] = useState('');
  const [showUnusedCategories, setShowUnusedCategories] = useState(true);
  const {
    budgetData,
    managedBudgets,
    setManagedBudgets,
    lastMonthSpentByCategory,
    persistBudgetData
  } = useBudgetData();

  const totalBudget = budgetData.summary?.budgeted
    ?? managedBudgets.reduce((sum, item) => sum + (Number(item.limit) || 0), 0);
  const totalSpent = budgetData.summary?.spent
    ?? managedBudgets.reduce((sum, item) => sum + (Number(item.spent) || 0), 0);
  const remainingAmount = budgetData.summary?.remaining ?? (totalBudget - totalSpent);
  const spentPercentage = budgetData.summary?.percentage ?? getPercentage(totalSpent, totalBudget);
  const uncategorizedExpenseCategories = (budgetData.uncategorized || []).filter((category) => {
    const normalizedName = String(category.name || '').trim().toLowerCase();
    return !EXCLUDED_UNCATEGORIZED.includes(normalizedName);
  });

  const handleCreateBudget = () => {};

  const handleSetBudget = (categoryName) => {
    void categoryName;
  };

  const startEditBudget = (budget) => {
    setEditingBudgetId(budget.id);
    setEditingLimit(String(budget.limit ?? ''));
  };

  const cancelEditBudget = () => {
    setEditingBudgetId(null);
    setEditingLimit('');
  };

  const saveBudgetLimit = (budgetId) => {
    const parsedLimit = Number(editingLimit);
    if (!Number.isFinite(parsedLimit) || parsedLimit < 0) {
      return;
    }

    const updatedBudgets = managedBudgets.map((item) => (
      item.id === budgetId
        ? { ...item, limit: parsedLimit }
        : item
    ));

    setManagedBudgets(updatedBudgets);

    const nextData = { ...budgetData, categoryBudgets: updatedBudgets };
    persistBudgetData(nextData);

    cancelEditBudget();
  };

  return (
    <Box className="budgets-root">
      <Sidebar />
      <Box className="budgets-main">
        <Header 
          title="Budgets" 
          showAvatar={false}
        />

      <MonthSelector currentMonth={currentMonth} />

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

        <Box className="budgets-management-layout">
          <Box className="budgets-management-main">
            <Box className="budgets-section-header-row">
              <Typography variant="h6" className="budgets-section-title">
                Category Budgets
              </Typography>
              <Button variant="contained" className="new-budget-btn" onClick={handleCreateBudget}>
                New Budget
              </Button>
            </Box>

          {managedBudgets.length === 0 ? (
            <Paper elevation={0} className="budget-empty-active">
              <AddCircleOutlineIcon className="budget-empty-icon" />
              <Typography variant="h6" className="budget-empty-title">
                Create your first budget
              </Typography>
              <Typography variant="body2" className="budget-empty-description">
                Set a monthly limit for at least one category to start tracking spending health.
              </Typography>
              <Button variant="contained" className="budget-empty-action" onClick={handleCreateBudget}>
                Create First Budget
              </Button>

              <Box className="suggested-budgets-header">
                <AutoAwesomeIcon className="suggested-budgets-icon" />
                <Typography variant="subtitle2" className="suggested-budgets-title">
                  Suggested Budgets
                </Typography>
              </Box>

              <SuggestedBudgetList
                budgets={SUGGESTED_BUDGETS}
                formatCurrency={formatCurrency}
                onSetBudget={handleSetBudget}
              />
            </Paper>
          ) : (
            <>
              <Box className="category-budgets-list">
                {managedBudgets.map((budget) => {
                  const normalizedName = String(budget.name || '').trim().toLowerCase();
                  const lastMonthSpent = lastMonthSpentByCategory[normalizedName] || 0;

                  return (
                    <CategoryBudgetCard
                      key={budget.id}
                      budget={budget}
                      lastMonthSpent={lastMonthSpent}
                      editingBudgetId={editingBudgetId}
                      editingLimit={editingLimit}
                      onEditingLimitChange={setEditingLimit}
                      onSave={saveBudgetLimit}
                      onCancel={cancelEditBudget}
                      onStartEdit={startEditBudget}
                      formatCurrency={formatCurrency}
                    />
                  );
                })}
              </Box>
              <Paper elevation={0} className="budget-totals-footer">
                <Typography variant="body2" className="budget-totals-item">
                  Total Planned: <strong>{formatCurrency(managedBudgets.reduce((sum, item) => sum + (Number(item.limit) || 0), 0))}</strong>
                </Typography>
                <Typography variant="body2" className="budget-totals-item">
                  Total Actual: <strong>{formatCurrency(managedBudgets.reduce((sum, item) => sum + (Number(item.spent) || 0), 0))}</strong>
                </Typography>
              </Paper>
            </>
          )}
          </Box>

            <CategoriesWithoutBudgetsPanel
              categories={uncategorizedExpenseCategories}
              showUnusedCategories={showUnusedCategories}
              onToggle={() => setShowUnusedCategories((prev) => !prev)}
              onSetBudget={handleSetBudget}
            />
        </Box>
      </Box>
      </Box>
    </Box>
  );
};

export default Budgets;
