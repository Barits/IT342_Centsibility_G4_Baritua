import React from 'react';
import { Box } from '@mui/material';
import AnalyticsCategoryBreakdownCard from '../components/analytics/AnalyticsCategoryBreakdownCard';
import AnalyticsMonthlyTrendCard from '../components/analytics/AnalyticsMonthlyTrendCard';
import AnalyticsSpendingByCategoryCard from '../components/analytics/AnalyticsSpendingByCategoryCard';
import AnalyticsStatsRow from '../components/analytics/AnalyticsStatsRow';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import useAnalyticsData from '../hooks/useAnalyticsData';
import '../css/Analytics.css';

const Analytics = () => {
  const { analytics } = useAnalyticsData();

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) {
      return '—';
    }
    return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <Box className="analytics-root">
      <Sidebar />
      <Box className="analytics-main">
        <Header 
          title="Analytics" 
          showAvatar={false}
        />

        <Box className="analytics-content">
          <AnalyticsStatsRow summary={analytics.summary} formatCurrency={formatCurrency} />

          <AnalyticsSpendingByCategoryCard
            items={analytics.spendingByCategory}
            formatCurrency={formatCurrency}
          />

          <AnalyticsMonthlyTrendCard
            items={analytics.monthlyTrend}
            formatCurrency={formatCurrency}
          />

          <AnalyticsCategoryBreakdownCard
            items={analytics.categoryBreakdown}
            formatCurrency={formatCurrency}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Analytics;
