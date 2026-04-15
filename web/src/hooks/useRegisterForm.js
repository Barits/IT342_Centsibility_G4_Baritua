import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authService from '../services/authService';

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

const useRegisterForm = (navigate) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const isGoogleOAuthConfigured = Boolean((process.env.REACT_APP_GOOGLE_CLIENT_ID || '').trim());

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setServerError('');

    try {
      const response = await authService.googleRegister(credentialResponse.credential);
      setSuccessMessage('Registration successful! Redirecting to dashboard...');
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('accessToken', response.token);
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (registerError) {
      if (registerError.response && registerError.response.status === 409) {
        setServerError('This Google account is already registered. Please sign in instead.');
      } else {
        setServerError('Google sign-up failed. Please try again.');
      }
      console.error('Google register error:', registerError);
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

  const getPasswordStrengthClass = (label) => {
    switch (label) {
      case 'Weak':
        return 'register-password-strength-weak';
      case 'Fair':
        return 'register-password-strength-fair';
      case 'Good':
      case 'Strong':
        return 'register-password-strength-strong';
      default:
        return '';
    }
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
        await authService.register({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password
        });

        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } catch (registerError) {
        if (registerError.response && registerError.response.status === 409) {
          setServerError('Email already registered. Please use a different email.');
        } else {
          setServerError('Registration failed. Please try again.');
        }
        console.error('Registration error:', registerError);
      } finally {
        setLoading(false);
      }
    }
  });

  return {
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
  };
};

export default useRegisterForm;
