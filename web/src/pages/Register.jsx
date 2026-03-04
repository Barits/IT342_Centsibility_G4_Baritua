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
  CircularProgress,
  LinearProgress
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
    <Container component="main" maxWidth="xs">
      <Box className="register-container">
        <Paper elevation={0} className="register-paper">
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
          
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              disabled={loading}
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
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              disabled={loading}
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
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              disabled={loading}
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
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              disabled={loading}
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
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              disabled={loading}
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </Button>
            
            <Box className="register-signin-container">
              <Typography variant="body2" className="register-signin-text">
                Already have an account?{' '}
                <Link to="/login" className="register-signin-link">
                  <Typography component="span" variant="body2" className="register-signin-link-text">
                    Sign In
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

export default Register;
