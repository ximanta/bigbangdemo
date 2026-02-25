import React from 'react';
import {
  Routes,
  Route
}
from 'react-router-dom';
import { Header } from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { TicketsPage } from './pages/TicketsPage';
import { TicketDetailPage } from './pages/TicketDetailPage';
import { NewTicketPage } from './pages/NewTicketPage';
import { MyTicketsPage } from './pages/MyTicketsPage';
import { MyTicketDetailPage } from './pages/MyTicketDetailPage';
import { UsersPage } from './pages/UsersPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useAuth } from './context/AuthContext';

export const App = () => {
  const { currentUser,
    loading } = useAuth();

  // Role IDs:
  // 1: Customer
  // 2: Agent
  // 3: Administrator

  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* Authenticated Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/profile"
            element={<UserProfilePage />}
          />
        </Route>

        {/* Agent/Admin Routes */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={[2, 3]}
            />
          }
        >
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />
          <Route
            path="/tickets"
            element={<TicketsPage />}
          />
          <Route
            path="/tickets/:id"
            element={<TicketDetailPage />}
          />
        </Route>

        {/* Admin Only Routes */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={[3]}
            />
          }
        >
          <Route
            path="/users"
            element={<UsersPage />}
          />
        </Route>

        {/* Customer Routes */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={[1]}
            />
          }
        >
          <Route
            path="/my-tickets"
            element={<MyTicketsPage />}
          />
          <Route
            path="/my-tickets/:id"
            element={<MyTicketDetailPage />}
          />
          <Route
            path="/new-ticket"
            element={<NewTicketPage />}
          />
        </Route>

        {/* Redirect based on role after login or to login if not authenticated */}
        <Route
          path="/"
          element={
            currentUser ? (
              currentUser.role === 1 ? (
                <MyTicketsPage />
              ) : (
                <DashboardPage />
              )
            ) : (
              <LoginPage />
            )
          }
        />

        {/* Catch-all for unknown routes */}
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </>
  );
};
