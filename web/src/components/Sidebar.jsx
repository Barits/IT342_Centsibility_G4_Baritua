import React from 'react';
import { Box, Typography, Fab, Drawer, IconButton, useMediaQuery } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import '../css/components/Sidebar.css';

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDesktop = useMediaQuery('(min-width:1024px)');

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
    if (!isDesktop) onClose();
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (!isDesktop) onClose();
  };

  const sidebarContent = (
    <Box className="sidebar-content">
      <Box className="sidebar-header">
        <Typography variant="h6" className="sidebar-logo">
          Centsibility
        </Typography>
        {!isDesktop && (
          <IconButton onClick={onClose} className="sidebar-close-btn">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Box className="sidebar-nav-items">
        {navItems.map((item) => (
          <Box
            key={item.path}
            className={`sidebar-nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => handleNavigation(item.path)}
          >
            <Box className="sidebar-nav-icon">
              {item.icon}
            </Box>
            <Typography variant="body1" className="sidebar-nav-label">
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>

      <Fab 
        className="sidebar-fab" 
        color="primary"
        onClick={handleAddTransaction}
      >
        <AddIcon />
      </Fab>
    </Box>
  );

  // Desktop: Persistent sidebar
  if (isDesktop) {
    return (
      <Box className="sidebar-permanent">
        {sidebarContent}
      </Box>
    );
  }

  // Mobile: Drawer sidebar
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      className="sidebar-drawer"
    >
      {sidebarContent}
    </Drawer>
  );
};

export default Sidebar;
