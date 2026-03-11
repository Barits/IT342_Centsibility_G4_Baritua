import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import StatCard from '../components/StatCard';
import QuickActions from '../components/QuickActions';
import TodaySpending from '../components/TodaySpending';
import BudgetOverview from '../components/BudgetOverview';
import RecentTransactions from '../components/RecentTransactions';
import Sidebar from '../components/Sidebar';
import authService from '../services/authService';
import '../css/Dashboard.css';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = authService.getCurrentUser();
  
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getUserFirstName = () => {
    if (user?.firstName) {
      return user.firstName;
    }
    return 'Alex';
  };

  const formatCurrency = (amount) => {
    return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const handleAddIncome = () => {
    console.log('Add Income');
  };

  const handleAddExpense = () => {
    console.log('Add Expense');
  };

  const handleTransfer = () => {
    console.log('Transfer');
  };

  return (
    <Box className="dashboard-root">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box className="dashboard-main">
        <Header 
          title="Centsibility" 
          showAvatar={true}
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <Box className="dashboard-content">
          {/* Welcome Message */}
          <Box className="dashboard-welcome">
            <Typography variant="caption" className="dashboard-date">
              {getCurrentDate()}
            </Typography>
            <Typography variant="h5" className="dashboard-greeting">
              Welcome back, {getUserFirstName()} 👋
            </Typography>
          </Box>

          {/* Balance Card */}
          <BalanceCard 
            balance={15234.56}
            monthChange={2340}
          />

          {/* Stats Grid */}
          <Box className="dashboard-stats">
            <StatCard 
              title="Income"
              value={formatCurrency(8500)}
              change={12}
              icon="📈"
              color="#10B981"
            />
            <StatCard 
              title="Expenses"
              value={formatCurrency(3200)}
              change={-5}
              icon="📉"
              color="#EF4444"
            />
            <StatCard 
              title="Savings"
              value={formatCurrency(5300)}
              icon="💰"
              color="#3B82F6"
            />
          </Box>

          {/* Quick Actions */}
          <QuickActions 
            onIncome={handleAddIncome}
            onExpense={handleAddExpense}
            onTransfer={handleTransfer}
          />

          {/* Recent Transactions */}
          <RecentTransactions />

          {/* Today's Spending */}
          <TodaySpending 
            spent={395}
            dailyAverage={1128}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
