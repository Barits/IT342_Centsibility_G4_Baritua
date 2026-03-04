import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const hasRole = (role) => {
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  };

  const isAdmin = () => hasRole('ROLE_ADMIN');
  const isUser = () => hasRole('ROLE_USER');

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    hasRole,
    isAdmin,
    isUser,
  };
};

export default useAuth;
