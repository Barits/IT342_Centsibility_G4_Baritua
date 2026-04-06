import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import RegisterFormPanel from '../components/register/RegisterFormPanel';
import RegisterWelcomePanel from '../components/register/RegisterWelcomePanel';
import useRegisterForm from '../hooks/useRegisterForm';
import '../css/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const {
    formik,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    serverError,
    successMessage,
    loading,
    isGoogleOAuthConfigured,
    handleGoogleSuccess,
    handleGoogleError,
    getPasswordStrength,
    getPasswordStrengthClass
  } = useRegisterForm(navigate);

  const passwordStrength = getPasswordStrength(formik.values.password);

  return (
    <Box className="register-wrapper">
      <RegisterWelcomePanel onSignIn={() => navigate('/login')} />

      <RegisterFormPanel
        formik={formik}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        serverError={serverError}
        successMessage={successMessage}
        loading={loading}
        isGoogleOAuthConfigured={isGoogleOAuthConfigured}
        onGoogleSuccess={handleGoogleSuccess}
        onGoogleError={handleGoogleError}
        passwordStrength={passwordStrength}
        getPasswordStrengthClass={getPasswordStrengthClass}
      />
    </Box>
  );
};

export default Register;
