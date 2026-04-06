import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import CategoryBudgetHealthCard from '../components/dashboard/CategoryBudgetHealthCard';
import DashboardWelcome from '../components/dashboard/DashboardWelcome';
import MonthlySnapshotCard from '../components/dashboard/MonthlySnapshotCard';
import NeedsBudgetSetupCard from '../components/dashboard/NeedsBudgetSetupCard';
import RecentTransactionsCard from '../components/dashboard/RecentTransactionsCard';
import SafeToSpendCard from '../components/dashboard/SafeToSpendCard';
import useDashboardData from '../hooks/useDashboardData';
import { getPercentage } from '../utils/financeHelpers';
import '../css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, budgetData, recentTransactions } = useDashboardData();

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getUserFirstName = () => {
    if (user?.firstName) {
      return user.firstName;
    }
    return 'Alex';
  };

  const formatCurrency = (amount) => {
    return `₱${Number(amount || 0).toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const formatCurrencyCompact = (amount) => {
    return `₱${Number(amount || 0).toLocaleString('en-PH', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  const formatTransactionTime = (transaction) => {
    if (transaction.time) {
      return transaction.time;
    }

    if (transaction.date) {
      const dateValue = new Date(transaction.date);
      if (!Number.isNaN(dateValue.getTime())) {
        return dateValue.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short'
        });
      }
    }

    return 'Recent';
  };

  const totalBudget = budgetData.summary?.budgeted
    ?? budgetData.categoryBudgets.reduce((sum, item) => sum + (Number(item.limit) || 0), 0);
  const totalSpent = budgetData.summary?.spent
    ?? budgetData.categoryBudgets.reduce((sum, item) => sum + (Number(item.spent) || 0), 0);
  const remainingAmount = budgetData.summary?.remaining ?? (totalBudget - totalSpent);
  const spentPercentage = budgetData.summary?.percentage ?? getPercentage(totalSpent, totalBudget);

  const overThresholdItems = [...budgetData.categoryBudgets]
    .filter((item) => getPercentage(Number(item.spent), Number(item.limit)) >= 80)
    .sort((a, b) => getPercentage(Number(b.spent), Number(b.limit)) - getPercentage(Number(a.spent), Number(a.limit)))
    .slice(0, 3);

  const budgetHealthItems = [...budgetData.categoryBudgets]
    .sort((a, b) => getPercentage(Number(b.spent), Number(b.limit)) - getPercentage(Number(a.spent), Number(a.limit)))
    .slice(0, 5);

  const uncategorizedExpenseItems = budgetData.uncategorized.filter((item) => {
    const normalizedName = String(item.name || '').trim().toLowerCase();
    return !['income', 'salary', 'general income'].includes(normalizedName);
  });

  const tipOfTheDay = "Tip: Add a monthly cap for Food first. It is the easiest budget to control week by week.";

  return (
    <Box className="dashboard-root">
      <Sidebar />
      <Box className="dashboard-main">
        <Header
          title="Centsibility"
          showAvatar={true}
          user={user}
        />

        <Box className="dashboard-content">
          <DashboardWelcome dateLabel={getCurrentDate()} firstName={getUserFirstName()} />

          <SafeToSpendCard
            remainingAmount={remainingAmount}
            formatCurrency={formatCurrency}
          />

          <MonthlySnapshotCard
            totalBudget={totalBudget}
            totalSpent={totalSpent}
            spentPercentage={spentPercentage}
            formatCurrency={formatCurrency}
            onOpenBudgets={() => navigate('/budgets')}
          />

          <CategoryBudgetHealthCard
            budgetHealthItems={budgetHealthItems}
            overThresholdItems={overThresholdItems}
            formatCurrency={formatCurrency}
            onCreateBudget={() => navigate('/budgets')}
          />

          <RecentTransactionsCard
            recentTransactions={recentTransactions}
            formatCurrencyCompact={formatCurrencyCompact}
            formatTransactionTime={formatTransactionTime}
          />

          <NeedsBudgetSetupCard
            uncategorizedExpenseItems={uncategorizedExpenseItems}
            tipOfTheDay={tipOfTheDay}
            onSetCategoryBudgets={() => navigate('/budgets')}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
