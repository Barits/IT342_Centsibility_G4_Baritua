import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// Auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import VerifyEmail from '../pages/auth/VerifyEmail';

// Dashboard
import Dashboard from '../pages/dashboard/Dashboard';

// Transactions
import TransactionsPage from '../pages/transactions/TransactionsPage';
import AddTransaction from '../pages/transactions/AddTransaction';
import EditTransaction from '../pages/transactions/EditTransaction';
import TransactionDetail from '../pages/transactions/TransactionDetail';

// Budgets
import BudgetsPage from '../pages/budget/BudgetsPage';
import AddBudget from '../pages/budget/AddBudget';
import EditBudget from '../pages/budget/EditBudget';
import BudgetDetail from '../pages/budget/BudgetDetail';

// Profile
import ProfilePage from '../pages/profile/ProfilePage';

// Admin
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import UserDetail from '../pages/admin/UserDetail';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Transactions */}
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <TransactionsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions/add"
          element={
            <PrivateRoute>
              <AddTransaction />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions/edit/:id"
          element={
            <PrivateRoute>
              <EditTransaction />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions/:id"
          element={
            <PrivateRoute>
              <TransactionDetail />
            </PrivateRoute>
          }
        />

        {/* Budgets */}
        <Route
          path="/budgets"
          element={
            <PrivateRoute>
              <BudgetsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/budgets/add"
          element={
            <PrivateRoute>
              <AddBudget />
            </PrivateRoute>
          }
        />
        <Route
          path="/budgets/edit/:id"
          element={
            <PrivateRoute>
              <EditBudget />
            </PrivateRoute>
          }
        />
        <Route
          path="/budgets/:id"
          element={
            <PrivateRoute>
              <BudgetDetail />
            </PrivateRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <UserManagement />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users/:id"
          element={
            <AdminRoute>
              <UserDetail />
            </AdminRoute>
          }
        />

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
