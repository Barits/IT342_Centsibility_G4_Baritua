import React from 'react';
import { Alert, Box, Button, CircularProgress, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';

const LoginFormPanel = ({
  formik,
  showPassword,
  setShowPassword,
  error,
  loading,
  isGoogleOAuthConfigured,
  onGoogleSuccess,
  onGoogleError
}) => {
  return (
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
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
                  text="signin_with"
                  shape="pill"
                />
              </Box>
            </>
          ) : (
            <Typography variant="body2" className="auth-divider-text auth-google-fallback">
              Google sign-in is unavailable. Configure REACT_APP_GOOGLE_CLIENT_ID in web/.env.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default LoginFormPanel;
