import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const RegisterWelcomePanel = ({ onSignIn }) => (
  <Box className="register-welcome-panel">
    <Box className="register-welcome-content">
      <Typography component="h2" variant="h3" className="register-welcome-title">
        Welcome Back!
      </Typography>
      <Typography variant="body1" className="register-welcome-text">
        To keep connected with us please login with your personal info
      </Typography>
      <Button
        variant="outlined"
        className="register-welcome-button"
        onClick={onSignIn}
      >
        SIGN IN
      </Button>
    </Box>
  </Box>
);

export default RegisterWelcomePanel;
