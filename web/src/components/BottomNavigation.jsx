import React from 'react';
import { Box, IconButton, Typography, Fab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import '../css/components/BottomNavigation.css';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { label: 'Transactions', icon: <SwapHorizIcon />, path: '/transactions' },
    { label: 'Analytics', icon: <BarChartIcon />, path: '/analytics' },
    { label: 'Budget', icon: <AccountBalanceWalletIcon />, path: '/budgets' },
    { label: 'Profile', icon: <PersonIcon />, path: '/profile' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleAddTransaction = () => {
    navigate('/add-transaction');
  };

  return (
    <Box className="bottom-navigation">
      <Box className="bottom-nav-items">
        {navItems.map((item, index) => (
          <Box
            key={item.path}
            className={`bottom-nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <IconButton className="bottom-nav-icon">
              {item.icon}
            </IconButton>
            <Typography variant="caption" className="bottom-nav-label">
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>

      <Fab 
        className="bottom-nav-fab" 
        color="primary"
        onClick={handleAddTransaction}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default BottomNavigation;
