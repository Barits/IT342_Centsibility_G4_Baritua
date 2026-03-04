import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authService from '../services/authService';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import '../css/Login.css';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      
      try {
        const response = await authService.login({
          email: values.email,
          password: values.password
        });
        
        // Store user data and token
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('accessToken', response.token);
        
        // Redirect to dashboard
        navigate('/dashboard');
        
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('Invalid email or password');
        } else {
          setError('Login failed. Please try again.');
        }
        console.error('Login error:', error);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box className="login-container">
        <Paper elevation={0} className="login-paper">
          <Box className="login-header">
            <Typography component="h1" variant="h4" className="login-title">
              Welcome Back
            </Typography>
            <Typography variant="body1" className="login-subtitle">
              Sign in to continue
            </Typography>
          </Box>
          
          {error && (
            <Alert severity="error" className="login-alert">
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email className="login-icon" />
                  </InputAdornment>
                )
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className="login-icon" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            <Box className="login-forgot-password-container">
              <Typography variant="body2" className="login-forgot-password">
                Forgot Password?
              </Typography>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="login-submit-button"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
            
            <Box className="login-signup-container">
              <Typography variant="body2" className="login-signup-text">
                Don't have an account?{' '}
                <Link to="/register" className="login-signup-link">
                  <Typography component="span" variant="body2" className="login-signup-link-text">
                    Sign Up
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
