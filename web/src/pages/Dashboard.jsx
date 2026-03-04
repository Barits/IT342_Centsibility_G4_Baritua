import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  AppBar,
  Toolbar
} from '@mui/material';
import '../css/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <Box className="dashboard-root">
      <AppBar position="static" elevation={0} className="dashboard-appbar">
        <Toolbar>
          <Typography variant="h6" component="div" className="dashboard-title">
            Centsibility
          </Typography>
          <Button onClick={handleLogout} className="dashboard-logout-button">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container component="main" maxWidth="md">
        <Box className="dashboard-content">
          <Typography component="h1" variant="h4" className="dashboard-welcome-title">
            Welcome to Centsibility!
          </Typography>
          <Typography variant="body1" className="dashboard-welcome-subtitle">
            Your personal finance management dashboard
          </Typography>

          {user && (
            <Paper elevation={0} className="dashboard-user-info-card">
              <Typography variant="h6" className="dashboard-section-title">
                User Information
              </Typography>
              <Box className="dashboard-info-list">
                <Box className="dashboard-info-row">
                  <Typography variant="body1" className="dashboard-info-label">
                    Name:
                  </Typography>
                  <Typography variant="body1" className="dashboard-info-value">
                    {user.firstName} {user.lastName}
                  </Typography>
                </Box>
                <Box className="dashboard-info-row">
                  <Typography variant="body1" className="dashboard-info-label">
                    Email:
                  </Typography>
                  <Typography variant="body1" className="dashboard-info-value">
                    {user.email}
                  </Typography>
                </Box>
                <Box className="dashboard-info-row">
                  <Typography variant="body1" className="dashboard-info-label">
                    Role:
                  </Typography>
                  <Typography variant="body1" className="dashboard-info-value">
                    {user.role}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          )}
          
          <Paper elevation={0} className="dashboard-placeholder-card">
            <Typography variant="body1" className="dashboard-placeholder-text">
              Additional features will be added in future phases
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
