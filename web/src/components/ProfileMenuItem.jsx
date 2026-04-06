import React from 'react';
import { Box, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import '../css/components/ProfileMenuItem.css';

const ProfileMenuItem = ({ icon, label, onClick }) => {
  return (
    <Box className="profile-menu-item" onClick={onClick}>
      <Box className="profile-menu-item-left">
        <Box className="profile-menu-icon">
          {icon}
        </Box>
        <Typography variant="body1" className="profile-menu-label">
          {label}
        </Typography>
      </Box>
      <ChevronRightIcon className="profile-menu-chevron" />
    </Box>
  );
};

export default ProfileMenuItem;
