import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import '../css/components/Header.css';

const Header = ({ title, showAvatar = true, user: currentUser }) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const user = currentUser || storedUser;
  
  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return 'JD';
  };

  return (
    <Box className="header-container">
      <Box className="header-left">
        <Typography variant="h5" className="header-title">
          {title || 'Centsibility'}
        </Typography>
      </Box>
      {showAvatar && (
        <Avatar className="header-avatar">
          {getInitials()}
        </Avatar>
      )}
    </Box>
  );
};

export default Header;
