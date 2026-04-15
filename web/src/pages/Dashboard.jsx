import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DashboardWelcome from '../components/dashboard/DashboardWelcome';
import MonthlySnapshotCard from '../components/dashboard/MonthlySnapshotCard';
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

  const totalBudget = Number(budgetData.summary?.budgeted) || 0;
  const totalSpent = Number(budgetData.summary?.spent) || 0;
  const remainingAmount = Number(budgetData.summary?.remaining ?? (totalBudget - totalSpent));
  const spentPercentage = Number(budgetData.summary?.percentage ?? getPercentage(totalSpent, totalBudget));

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

          <RecentTransactionsCard
            recentTransactions={recentTransactions}
            formatCurrencyCompact={formatCurrencyCompact}
            formatTransactionTime={formatTransactionTime}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
