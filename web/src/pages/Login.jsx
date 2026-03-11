import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GoogleLogin } from '@react-oauth/google';
import authService from '../services/authService';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Divider
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

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await authService.googleLogin(credentialResponse.credential);
      
      // Store user data and token
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('accessToken', response.token);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      setError('Google sign-in failed. Please try again.');
      console.error('Google login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google sign-in failed. Please try again.');
  };

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
    <Box className="login-wrapper">
      {/* Left Panel - Sign In Form */}
      <Box className="login-form-panel">
        <Box className="login-form-container">
          <Box className="login-header">
            <Typography component="h1" variant="h4" className="login-title">
              Sign In
            </Typography>
            <Typography variant="body1" className="login-subtitle">
              Use your account credentials
            </Typography>
          </Box>
          
          {error && (
            <Alert severity="error" className="login-alert">
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={formik.handleSubmit} noValidate className="login-form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              disabled={loading}
              variant="outlined"
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
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              disabled={loading}
              variant="outlined"
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
                Forgot your password?
              </Typography>
            </Box>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="login-submit-button"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'SIGN IN'}
            </Button>
            
            <Box sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
              <Divider sx={{ flex: 1 }} />
              <Typography variant="body2" sx={{ px: 2, color: '#6B7280' }}>
                OR
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                size="large"
                width="400"
                text="signin_with"
                shape="pill"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      
      {/* Right Panel - Welcome Message */}
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
            onClick={() => navigate('/register')}
          >
            SIGN UP
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
