import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import LoginFormPanel from '../components/login/LoginFormPanel';
import LoginWelcomePanel from '../components/login/LoginWelcomePanel';
import useLoginForm from '../hooks/useLoginForm';
import '../css/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const {
    formik,
    showPassword,
    setShowPassword,
    error,
    loading,
    isGoogleOAuthConfigured,
    handleGoogleSuccess,
    handleGoogleError
  } = useLoginForm(navigate);

  return (
    <Box className="login-wrapper">
      <LoginFormPanel
        formik={formik}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        error={error}
        loading={loading}
        isGoogleOAuthConfigured={isGoogleOAuthConfigured}
        onGoogleSuccess={handleGoogleSuccess}
        onGoogleError={handleGoogleError}
      />

      <LoginWelcomePanel onRegister={() => navigate('/register')} />
    </Box>
  );
};

export default Login;
