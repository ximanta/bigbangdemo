import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = (email, password) => {
    // Mock authentication
    if (email === 'user@example.com' && password === 'password123') {
      const user = { id: '1', name: 'John Doe', email: 'user@example.com' };
      setCurrentUser(user);
      return { success: true, user };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  };

  const register = (name, email, password) => {
    // Mock registration
    if (email === 'user@example.com') {
      return { success: false, message: 'Email already registered' };
    }
    const newUser = { id: String(Date.now()), name, email };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);