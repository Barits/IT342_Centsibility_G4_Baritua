import React, { useState } from 'react';
import { Box, TextField, InputAdornment, Chip, Typography, Fab } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../css/Transactions.css';

const Transactions = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Income', 'Expenses'];

  const transactionsByPeriod = {
    'TODAY': [
      { id: 1, name: 'Grocery Store', category: 'Food', icon: '🍔', amount: -245, time: '10:30 AM', color: '#EF4444' },
      { id: 2, name: 'Grab Ride', category: 'Transport', icon: '🚗', amount: -150, time: '9:15 AM', color: '#3B82F6' }
    ],
    'YESTERDAY': [
      { id: 3, name: 'Part-time Salary', category: 'Salary', icon: '💰', amount: 8500, time: '6:00 PM', color: '#10B981' },
      { id: 4, name: 'Spotify Premium', category: 'Subscriptions', icon: '🎵', amount: -499, time: '12:00 AM', color: '#8B5CF6' }
    ],
    'FEB 28': [
      { id: 5, name: 'Movie Tickets', category: 'Entertainment', icon: '🎬', amount: -350, time: '7:30 PM', color: '#8B5CF6' },
      { id: 6, name: 'Coffee Shop', category: 'Food', icon: '☕', amount: -120, time: '3:00 PM', color: '#EF4444' }
    ],
    'FEB 27': [
      { id: 7, name: 'New Headphones', category: 'Shopping', icon: '🎧', amount: -1200, time: '2:00 PM', color: '#EC4899' },
      { id: 8, name: 'Freelance Project', category: 'Salary', icon: '💼', amount: 2000, time: '10:00 AM', color: '#10B981' }
    ],
    'FEB 26': [
      { id: 9, name: 'Electric Bill', category: 'Bills', icon: '💡', amount: -800, time: '9:00 AM', color: '#F59E0B' }
    ],
    'FEB 25': [
      { id: 10, name: 'Pharmacy', category: 'Health', icon: '💊', amount: -450, time: '4:00 PM', color: '#EF4444' }
    ]
  };

  const formatCurrency = (amount) => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}₱${Math.abs(amount).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <Box className="transactions-root">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box className="transactions-main">
        <Box className="transactions-header-container">
          <Header 
            title="Transactions" 
            showAvatar={false}
            onMenuClick={() => setSidebarOpen(true)}
          />
          <FilterListIcon className="transactions-filter-icon" />
        </Box>

      <Box className="transactions-search-container">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="transactions-search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#9CA3AF' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box className="transactions-filters">
        {filters.map((filter) => (
          <Chip
            key={filter}
            label={filter}
            onClick={() => setActiveFilter(filter)}
            className={`transaction-filter-chip ${activeFilter === filter ? 'active' : ''}`}
          />
        ))}
      </Box>

      <Box className="transactions-content">
        {Object.entries(transactionsByPeriod).map(([period, transactions]) => (
          <Box key={period} className="transaction-period">
            <Typography variant="caption" className="transaction-period-label">
              {period.toUpperCase()}
            </Typography>
            <Box className="transaction-period-list">
              {transactions.map((transaction) => (
                <Box key={transaction.id} className="transaction-item">
                  <Box 
                    className="transaction-icon"
                    sx={{ backgroundColor: `${transaction.color}15` }}
                  >
                    <span>{transaction.icon}</span>
                  </Box>

                  <Box className="transaction-details">
                    <Typography variant="body1" className="transaction-name">
                      {transaction.name}
                    </Typography>
                    <Typography variant="caption" className="transaction-category">
                      {transaction.category}
                    </Typography>
                  </Box>

                  <Box className="transaction-amount-container">
                    <Typography 
                      variant="body1" 
                      className={`transaction-amount ${transaction.amount >= 0 ? 'positive' : 'negative'}`}
                    >
                      {formatCurrency(transaction.amount)}
                    </Typography>
                    <Typography variant="caption" className="transaction-time">
                      {transaction.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Floating Action Button */}
      <Fab 
        className="transactions-fab" 
        color="primary"
        onClick={() => console.log('Add Transaction')}
      >
        <AddIcon />
      </Fab>
      </Box>
    </Box>
  );
};

export default Transactions;
