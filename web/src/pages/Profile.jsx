import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { getCurrentUser } from '../services/appDataService';
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
import '../css/Profile.css';

const PROFILE_TABS = {
  PERSONAL: 'personal',
  SECURITY: 'security',
  PREFERENCES: 'preferences'
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(authService.getCurrentUser());
  const [activeTab, setActiveTab] = useState(PROFILE_TABS.PERSONAL);

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      const currentUser = await getCurrentUser();
      if (isMounted && currentUser) {
        setUser(currentUser);
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

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

  const profileSections = {
    [PROFILE_TABS.PERSONAL]: {
      title: 'Personal Info',
      description: 'Manage your identity details and profile preferences.',
      items: [
        {
          icon: <PersonIcon />,
          label: 'Personal Information',
          description: 'Update your full name and display information.',
          onClick: () => console.log('Personal Information')
        },
        {
          icon: <CategoryIcon />,
          label: 'Category Management',
          description: 'Create and organize categories used in transactions.',
          onClick: () => console.log('Category Management')
        }
      ]
    },
    [PROFILE_TABS.SECURITY]: {
      title: 'Security',
      description: 'Control login protection and account access.',
      items: [
        {
          icon: <SecurityIcon />,
          label: 'Account Security',
          description: 'Change password and review account protection.',
          onClick: () => console.log('Account Security')
        },
        {
          icon: <DescriptionIcon />,
          label: 'Terms & Privacy',
          description: 'Review privacy practices and account terms.',
          onClick: () => console.log('Terms & Privacy')
        }
      ]
    },
    [PROFILE_TABS.PREFERENCES]: {
      title: 'Preferences',
      description: 'Set default behavior for your dashboard and transactions.',
      items: [
        {
          icon: <NotificationsIcon />,
          label: 'Notification Preferences',
          description: 'Choose which account activity notifications you receive.',
          onClick: () => console.log('Notification Preferences')
        },
        {
          icon: <AttachMoneyIcon />,
          label: 'Currency Settings',
          description: 'Set your default currency for all transactions.',
          onClick: () => console.log('Currency Settings')
        },
        {
          icon: <GetAppIcon />,
          label: 'Export Data',
          description: 'Download your transaction and account data.',
          onClick: () => console.log('Export Data')
        },
        {
          icon: <HelpIcon />,
          label: 'Help & Support',
          description: 'Contact support and read troubleshooting guides.',
          onClick: () => console.log('Help & Support')
        }
      ]
    }
  };

  const activeSection = profileSections[activeTab];

  return (
    <Box className="profile-root">
      <Sidebar />
      <Box className="profile-main">
        <Header 
          title="Profile" 
          showAvatar={false}
          user={user}
        />

        <Box className="profile-content">
          <Paper elevation={0} className="profile-card-shell">
            <Box className="profile-card-header">
              <Avatar className="profile-avatar">
                {getInitials()}
              </Avatar>
              <Box className="profile-header-text">
                <Typography variant="h5" className="profile-user-name">
                  {getUserName()}
                </Typography>
                <Typography variant="body2" className="profile-user-email">
                  {getUserEmail()}
                </Typography>
                <Typography variant="caption" className="profile-member-since">
                  {user?.role ? `Role: ${user.role}` : 'Profile data will load from the backend'}
                </Typography>
              </Box>
            </Box>

            <Box className="profile-dashboard-layout">
              <Box className="profile-settings-sidebar">
                <Typography variant="overline" className="profile-nav-title">
                  Settings
                </Typography>

                <Button
                  className={`profile-nav-btn ${activeTab === PROFILE_TABS.PERSONAL ? 'active' : ''}`}
                  onClick={() => setActiveTab(PROFILE_TABS.PERSONAL)}
                >
                  Personal Info
                </Button>
                <Button
                  className={`profile-nav-btn ${activeTab === PROFILE_TABS.SECURITY ? 'active' : ''}`}
                  onClick={() => setActiveTab(PROFILE_TABS.SECURITY)}
                >
                  Security
                </Button>
                <Button
                  className={`profile-nav-btn ${activeTab === PROFILE_TABS.PREFERENCES ? 'active' : ''}`}
                  onClick={() => setActiveTab(PROFILE_TABS.PREFERENCES)}
                >
                  Preferences
                </Button>

                <Button
                  className="profile-sidebar-logout"
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                >
                  Log Out
                </Button>
              </Box>

              <Box className="profile-settings-content">
                <Typography variant="h6" className="profile-section-title">
                  {activeSection.title}
                </Typography>
                <Typography variant="body2" className="profile-section-description">
                  {activeSection.description}
                </Typography>

                <Box className="profile-settings-grid">
                  {activeSection.items.map((item) => (
                    <Box
                      key={item.label}
                      className="profile-setting-row"
                      onClick={item.onClick}
                    >
                      <Box className="profile-setting-icon">{item.icon}</Box>
                      <Box className="profile-setting-copy">
                        <Typography variant="body1" className="profile-setting-label">
                          {item.label}
                        </Typography>
                        <Typography variant="body2" className="profile-setting-description">
                          {item.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Paper>

          <Box className="profile-footer">
            <Typography variant="caption" className="profile-transactions-count">
              Transaction count will appear once the backend exposes it
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
