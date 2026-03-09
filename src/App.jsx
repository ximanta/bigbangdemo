import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import MenuPage from './pages/MenuPage';
import InventoryPage from './pages/InventoryPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import UserProfilePage from './pages/UserProfilePage';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      addNotification('Login successful!', 'success');
      return true;
    }
    addNotification('Invalid credentials.', 'error');
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    addNotification('Logged out successfully.', 'info');
  };

  const addNotification = (message, type = 'info') => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
    };
    setNotifications((prev) => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((n) => n.id !== newNotification.id)
      );
    }, 5000);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage onLogin={handleLogin} />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          }
        />

        {isAuthenticated ? (
          <Route
            path="/"
            element={
              <MainLayout
                onLogout={handleLogout}
                notifications={notifications}
                addNotification={addNotification}
              />
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage addNotification={addNotification} />} />
            <Route path="orders" element={<OrdersPage addNotification={addNotification} />} />
            <Route path="menu" element={<MenuPage addNotification={addNotification} />} />
            <Route path="inventory" element={<InventoryPage addNotification={addNotification} />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage addNotification={addNotification} />} />
            <Route path="profile" element={<UserProfilePage />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
