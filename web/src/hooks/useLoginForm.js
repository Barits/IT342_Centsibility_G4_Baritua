import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authService from '../services/authService';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

const useLoginForm = (navigate) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isGoogleOAuthConfigured = Boolean((process.env.REACT_APP_GOOGLE_CLIENT_ID || '').trim());

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');

    try {
      const response = await authService.googleLogin(credentialResponse.credential);
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('accessToken', response.token);
      navigate('/dashboard');
    } catch (loginError) {
      if (loginError.response?.status === 503) {
        setError('Google sign-in is unavailable right now. Please contact the administrator.');
      } else {
        setError('Google sign-in failed. Please try again.');
      }
      console.error('Google login error:', loginError);
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

        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('accessToken', response.token);
        navigate('/dashboard');
      } catch (loginError) {
        if (loginError.response && loginError.response.status === 401) {
          setError('Invalid email or password');
        } else {
          setError('Login failed. Please try again.');
        }
        console.error('Login error:', loginError);
      } finally {
        setLoading(false);
      }
    }
  });

  return {
    formik,
    showPassword,
    setShowPassword,
    error,
    loading,
    isGoogleOAuthConfigured,
    handleGoogleSuccess,
    handleGoogleError
  };
};

export default useLoginForm;
