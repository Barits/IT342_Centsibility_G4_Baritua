import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  LinearProgress,
  Divider
} from '@mui/material';
import { Visibility, VisibilityOff, CheckCircle, Cancel, Email, Lock, Person } from '@mui/icons-material';
import '../css/Register.css';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/,
      'Password must contain at least one digit, one lowercase, one uppercase, and one special character'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match')
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setServerError('');
    
    try {
      const response = await authService.googleRegister(credentialResponse.credential);
      
      setSuccessMessage('Registration successful! Redirecting to dashboard...');
      
      // Store user data and token
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('accessToken', response.token);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setServerError('This Google account is already registered. Please sign in instead.');
      } else {
        setServerError('Google sign-up failed. Please try again.');
      }
      console.error('Google register error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setServerError('Google sign-up failed. Please try again.');
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/)) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 12.5;
    if (password.match(/[@#$%^&+=!]/)) strength += 12.5;
    
    if (strength <= 25) return { strength, label: 'Weak', color: '#EF4444' };
    if (strength <= 50) return { strength, label: 'Fair', color: '#FBBF24' };
    if (strength <= 75) return { strength, label: 'Good', color: '#10B981' };
    return { strength: 100, label: 'Strong', color: '#10B981' };
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setServerError('');
      
      try {
        const response = await authService.register({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password
        });
        
        setSuccessMessage('Registration successful! Redirecting to login...');
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setServerError('Email already registered. Please use a different email.');
        } else {
          setServerError('Registration failed. Please try again.');
        }
        console.error('Registration error:', error);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <Box className="register-wrapper">
      {/* Left Panel - Welcome Message */}
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
            onClick={() => navigate('/login')}
          >
            SIGN IN
          </Button>
        </Box>
      </Box>
      
      {/* Right Panel - Create Account Form */}
      <Box className="register-form-panel">
        <Box className="register-form-container">
          <Box className="register-header">
            <Typography component="h1" variant="h4" className="register-title">
              Create Account
            </Typography>
            <Typography variant="body1" className="register-subtitle">
              Join Centsibility today
            </Typography>
          </Box>
          
          {serverError && (
            <Alert severity="error" className="register-alert">
              {serverError}
            </Alert>
          )}
          
          {successMessage && (
            <Alert severity="success" className="register-alert">
              {successMessage}
            </Alert>
          )}
          
          <Box component="form" onSubmit={formik.handleSubmit} noValidate className="register-form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              placeholder="First Name"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              disabled={loading}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person className="register-icon" />
                  </InputAdornment>
                )
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              placeholder="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              disabled={loading}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person className="register-icon" />
                  </InputAdornment>
                )
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Email"
              name="email"
              autoComplete="email"
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
                    <Email className="register-icon" />
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
              autoComplete="new-password"
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
                    <Lock className="register-icon" />
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
            
            {formik.values.password && (
              <Box className="register-password-strength-container">
                <Box className="register-password-strength-row">
                  <LinearProgress 
                    variant="determinate" 
                    value={getPasswordStrength(formik.values.password).strength} 
                    className="register-password-progress"
                    sx={{ 
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getPasswordStrength(formik.values.password).color
                      }
                    }}
                  />
                  <Typography 
                    variant="body2" 
                    className="register-password-strength-label"
                    style={{ color: getPasswordStrength(formik.values.password).color }}
                  >
                    {getPasswordStrength(formik.values.password).label}
                  </Typography>
                </Box>
                <Typography variant="body2" className="register-password-requirements">
                  Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
                </Typography>
              </Box>
            )}
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              placeholder="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              disabled={loading}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock className="register-icon" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            {formik.values.confirmPassword && formik.values.password && (
              <Box className="register-password-match-container">
                {formik.values.confirmPassword === formik.values.password ? (
                  <>
                    <CheckCircle className="register-password-match-icon register-password-match-success" />
                    <Typography variant="body2" className="register-password-match-success">
                      Passwords match
                    </Typography>
                  </>
                ) : (
                  <>
                    <Cancel className="register-password-match-icon register-password-match-error" />
                    <Typography variant="body2" className="register-password-match-error">
                      Passwords do not match
                    </Typography>
                  </>
                )}
              </Box>
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="register-submit-button"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'CREATE ACCOUNT'}
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
                text="signup_with"
                shape="pill"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
