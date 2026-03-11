import React, { useState } from 'react';
import { Box, Typography, Avatar, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import GetAppIcon from '@mui/icons-material/GetApp';
import HelpIcon from '@mui/icons-material/Help';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ProfileMenuItem from '../components/ProfileMenuItem';
import '../css/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return 'A';
  };

  const getUserName = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return 'Alex Johnson';
  };

  const getUserEmail = () => {
    return user?.email || 'alex@email.com';
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <Box className="profile-root">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box className="profile-main">
        <Header 
          title="Profile" 
          showAvatar={false}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <Box className="profile-content">
          {/* User Info Card */}
          <Paper elevation={0} className="profile-user-card">
            <Avatar className="profile-avatar">
              {getInitials()}
            </Avatar>
            
            <Typography variant="h5" className="profile-user-name">
              {getUserName()}
            </Typography>
            <Typography variant="body2" className="profile-user-email">
              {getUserEmail()}
            </Typography>
            <Typography variant="caption" className="profile-member-since">
              Member since Jan 2026
            </Typography>
          </Paper>

          {/* Menu Items */}
          <Box className="profile-menu-section">
            <ProfileMenuItem 
              icon={<PersonIcon />}
              label="Personal Information"
              onClick={() => console.log('Personal Information')}
            />
            <ProfileMenuItem 
              icon={<SecurityIcon />}
              label="Account Security"
              onClick={() => console.log('Account Security')}
            />
            <ProfileMenuItem 
              icon={<NotificationsIcon />}
              label="Notification Preferences"
              onClick={() => console.log('Notification Preferences')}
            />
            <ProfileMenuItem 
              icon={<AttachMoneyIcon />}
              label="Currency Settings"
              onClick={() => console.log('Currency Settings')}
            />
            <ProfileMenuItem 
              icon={<CategoryIcon />}
              label="Category Management"
              onClick={() => console.log('Category Management')}
            />
            <ProfileMenuItem 
              icon={<GetAppIcon />}
              label="Export Data"
              onClick={() => console.log('Export Data')}
            />
            <ProfileMenuItem 
              icon={<HelpIcon />}
              label="Help & Support"
              onClick={() => console.log('Help & Support')}
            />
            <ProfileMenuItem 
              icon={<DescriptionIcon />}
              label="Terms & Privacy"
              onClick={() => console.log('Terms & Privacy')}
            />
          </Box>

          {/* Logout Button */}
          <Button
            fullWidth
            variant="contained"
            className="profile-logout-button"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Log Out
          </Button>

          {/* App Version */}
          <Box className="profile-footer">
            <Typography variant="caption" className="profile-transactions-count">
              142 total transactions
            </Typography>
            <Typography variant="caption" className="profile-version">
              Centsibility v1.0.0
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
