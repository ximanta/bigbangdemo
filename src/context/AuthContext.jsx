import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize from localStorage or default to false
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    localStorage.setItem('user', JSON.stringify(user));
  }, [isAuthenticated, user]);

  const login = (email, password) => {
    // Mock authentication logic
    if (email === 'user@example.com' && password === 'password') {
      setIsAuthenticated(true);
      setUser({ email: email, name: 'Demo User' });
      navigate('/');
      return true;
    } else {
      console.log('Invalid credentials');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  const register = (email, password) => {
    // Mock registration logic: simply log in the user for demo purposes
    if (email && password) {
      setIsAuthenticated(true);
      setUser({ email: email, name: 'New User' });
      navigate('/');
      return true;
    } else {
      console.log('Registration failed');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}