import React from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { Cancel, CheckCircle, Email, Lock, Person, Visibility, VisibilityOff } from '@mui/icons-material';

const RegisterFormPanel = ({
  formik,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  serverError,
  successMessage,
  loading,
  isGoogleOAuthConfigured,
  onGoogleSuccess,
  onGoogleError,
  passwordStrength,
  getPasswordStrengthClass
}) => {
  return (
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
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
                  value={passwordStrength.strength}
                  className="register-password-progress"
                />
                <Typography
                  variant="body2"
                  className={`register-password-strength-label ${getPasswordStrengthClass(passwordStrength.label)}`}
                >
                  {passwordStrength.label}
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
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
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

          {isGoogleOAuthConfigured ? (
            <>
              <Box className="auth-divider-row">
                <Divider className="auth-divider-line" />
                <Typography variant="body2" className="auth-divider-text">
                  OR
                </Typography>
                <Divider className="auth-divider-line" />
              </Box>

              <Box className="auth-google-container">
                <GoogleLogin
                  onSuccess={onGoogleSuccess}
                  onError={onGoogleError}
                  size="large"
                  width="400"
                  text="signup_with"
                  shape="pill"
                />
              </Box>
            </>
          ) : (
            <Typography variant="body2" className="auth-divider-text auth-google-fallback">
              Google sign-up is unavailable. Configure REACT_APP_GOOGLE_CLIENT_ID in web/.env.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterFormPanel;
