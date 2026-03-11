import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import '../css/Analytics.css';

const Analytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const formatCurrency = (amount) => {
    return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const spendingByCategory = [
    { category: 'Food', percentage: 41, amount: 2800, color: '#EF4444' },
    { category: 'Transport', percentage: 22, amount: 1500, color: '#3B82F6' },
    { category: 'Shopping', percentage: 17, amount: 1200, color: '#EC4899' },
    { category: 'Bills', percentage: 12, amount: 800, color: '#F59E0B' },
    { category: 'Entertainment', percentage: 9, amount: 600, color: '#8B5CF6' }
  ];

  const monthlyTrend = [
    { month: 'Oct', income: 7500, expenses: 5000 },
    { month: 'Nov', income: 8200, expenses: 5500 },
    { month: 'Dec', income: 9500, expenses: 6000 },
    { month: 'Jan', income: 8000, expenses: 5500 },
    { month: 'Feb', income: 8500, expenses: 5000 },
    { month: 'Mar', income: 9000, expenses: 4500 }
  ];

  const categoryBreakdown = [
    { category: 'Food', amount: 2800, color: '#EF4444' },
    { category: 'Transport', amount: 1500, color: '#3B82F6' },
    { category: 'Shopping', amount: 1200, color: '#EC4899' },
    { category: 'Bills', amount: 800, color: '#F59E0B' },
    { category: 'Entertainment', amount: 600, color: '#8B5CF6' }
  ];

  const maxAmount = Math.max(...categoryBreakdown.map(c => c.amount));

  return (
    <Box className="analytics-root">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box className="analytics-main">
        <Header 
          title="Analytics" 
          showAvatar={false}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <Box className="analytics-content">
          {/* Top Stats */}
          <Box className="analytics-stats">
            <StatCard 
              title="Total Income"
              value={formatCurrency(8500)}
              icon="📈"
              color="#10B981"
            />
            <StatCard 
              title="Total Expenses"
              value={formatCurrency(6900)}
              icon="📉"
              color="#EF4444"
            />
            <StatCard 
              title="Savings Rate"
              value="62%"
              icon="💰"
              color="#3B82F6"
            />
          </Box>

          {/* Spending by Category */}
          <Paper elevation={0} className="analytics-card">
            <Typography variant="h6" className="analytics-card-title">
              Spending by Category
            </Typography>
            <Box className="pie-chart-container">
              <Box className="pie-chart">
                {spendingByCategory.map((item, index) => {
                  const cumulativePercentage = spendingByCategory
                    .slice(0, index)
                    .reduce((sum, cat) => sum + cat.percentage, 0);
                  
                  return (
                    <Box
                      key={item.category}
                      className="pie-slice"
                      sx={{
                        '--percentage': item.percentage,
                        '--start': cumulativePercentage,
                        backgroundColor: item.color
                      }}
                    />
                  );
                })}
                <Box className="pie-center" />
              </Box>
              <Box className="category-legend">
                {spendingByCategory.map((item) => (
                  <Box key={item.category} className="legend-item">
                    <Box 
                      className="legend-color"
                      sx={{ backgroundColor: item.color }}
                    />
                    <Typography variant="body2" className="legend-label">
                      {item.category}
                    </Typography>
                    <Typography variant="body2" className="legend-percentage">
                      {item.percentage}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>

          {/* Monthly Trend */}
          <Paper elevation={0} className="analytics-card">
            <Typography variant="h6" className="analytics-card-title">
              Monthly Trend
            </Typography>
            <Box className="bar-chart">
              {monthlyTrend.map((data) => {
                const maxValue = Math.max(
                  ...monthlyTrend.map(d => Math.max(d.income, d.expenses))
                );
                return (
                  <Box key={data.month} className="bar-group">
                    <Box className="bars">
                      <Box 
                        className="bar income-bar"
                        sx={{ 
                          height: `${(data.income / maxValue) * 100}%` 
                        }}
                      />
                      <Box 
                        className="bar expense-bar"
                        sx={{ 
                          height: `${(data.expenses / maxValue) * 100}%` 
                        }}
                      />
                    </Box>
                    <Typography variant="caption" className="bar-label">
                      {data.month}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
            <Box className="chart-legend">
              <Box className="chart-legend-item">
                <Box className="legend-dot income-dot" />
                <Typography variant="caption">Income</Typography>
              </Box>
              <Box className="chart-legend-item">
                <Box className="legend-dot expense-dot" />
                <Typography variant="caption">Expenses</Typography>
              </Box>
            </Box>
          </Paper>

          {/* Category Breakdown */}
          <Paper elevation={0} className="analytics-card">
            <Typography variant="h6" className="analytics-card-title">
              Category Breakdown
            </Typography>
            <Box className="category-breakdown">
              {categoryBreakdown.map((item) => (
                <Box key={item.category} className="breakdown-item">
                  <Box className="breakdown-header">
                    <Typography variant="body2" className="breakdown-category">
                      {item.category}
                    </Typography>
                    <Typography variant="body2" className="breakdown-amount">
                      {formatCurrency(item.amount)}
                    </Typography>
                  </Box>
                  <Box className="breakdown-bar-bg">
                    <Box 
                      className="breakdown-bar"
                      sx={{ 
                        width: `${(item.amount / maxAmount) * 100}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Analytics;
