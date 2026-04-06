import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const LoginWelcomePanel = ({ onRegister }) => (
  <Box className="login-welcome-panel">
    <Box className="login-welcome-content">
      <Typography component="h2" variant="h3" className="login-welcome-title">
        Hello, Friend!
      </Typography>
      <Typography variant="body1" className="login-welcome-text">
        Enter your personal details and start your journey with us
      </Typography>
      <Button
        variant="outlined"
        className="login-welcome-button"
        onClick={onRegister}
      >
        SIGN UP
      </Button>
    </Box>
  </Box>
);

export default LoginWelcomePanel;
