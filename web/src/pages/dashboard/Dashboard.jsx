import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'Dashboard - Centsibility';
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Centsibility Dashboard</h1>
      {user && <p>Hello, {user.username}!</p>}
      <p>This is your financial dashboard. More features coming soon!</p>
    </div>
  );
};

export default Dashboard;
