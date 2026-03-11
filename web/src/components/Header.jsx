import React from 'react';
import { Box, Typography, Avatar, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../css/components/Header.css';

const Header = ({ title, showAvatar = true, onMenuClick }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isDesktop = useMediaQuery('(min-width:1024px)');
  
  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return 'JD';
  };

  return (
    <Box className="header-container">
      <Box className="header-left">
        {onMenuClick && !isDesktop && (
          <IconButton 
            className="header-menu-button" 
            onClick={onMenuClick}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        )}
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
