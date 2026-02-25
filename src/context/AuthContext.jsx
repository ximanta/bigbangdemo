import React,
{
  createContext,
  useState,
  useEffect,
  useContext
}
from 'react';
import { mockUsers } from '../data/mockData';
import { NotificationToast } from '../components/NotificationToast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser,
    setCurrentUser]
  = useState(null);
  const [loading,
    setLoading]
  = useState(true);
  const [toast,
    setToast]
  = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          setCurrentUser(user);
          setToast({ message: `Welcome, ${user.name}!`, type: 'success' });
          resolve(user);
        } else {
          setToast({ message: 'Invalid credentials', type: 'error' });
          reject(new Error('Invalid credentials'));
        }
        setLoading(false);
      }, 500);
    });
  };

  const register = (name, email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockUsers.some((u) => u.email === email)) {
          setToast({ message: 'Email already registered', type: 'error' });
          reject(new Error('Email already registered'));
          setLoading(false);
          return;
        }

        const newUser = {
          id: `user${mockUsers.length + 1}`,
          name,
          email,
          password,
          role: 1 // Default to Customer role
        };

        // In a real app, you'd add to a backend database
        mockUsers.push(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setCurrentUser(newUser);
        setToast({ message: 'Registration successful!', type: 'success' });
        resolve(newUser);
        setLoading(false);
      }, 500);
    });
  };

  const logout = () => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
        setToast({ message: 'Logged out successfully', type: 'info' });
        resolve();
        setLoading(false);
      }, 300);
    });
  };

  const updateUserRole = (userId, newRole) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex((u) => u.id === userId);
        if (userIndex !== -1) {
          mockUsers[userIndex].role = newRole;
          if (currentUser && currentUser.id === userId) {
            setCurrentUser({ ...currentUser,
              role: newRole
            });
            localStorage.setItem('currentUser', JSON.stringify({ ...currentUser,
              role: newRole
            }));
          }
          setToast({ message: 'User role updated successfully', type: 'success' });
          resolve(mockUsers[userIndex]);
        } else {
          setToast({ message: 'User not found', type: 'error' });
          reject(new Error('User not found'));
        }
        setLoading(false);
      }, 300);
    });
  };

  const updateUserNameEmail = (userId, newName, newEmail) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userIndex = mockUsers.findIndex((u) => u.id === userId);
        if (userIndex !== -1) {
          const oldEmail = mockUsers[userIndex].email;
          if (oldEmail !== newEmail && mockUsers.some(u => u.email === newEmail && u.id !== userId)) {
            setToast({ message: 'Email already in use by another user', type: 'error' });
            reject(new Error('Email already in use'));
            setLoading(false);
            return;
          }

          mockUsers[userIndex].name = newName;
          mockUsers[userIndex].email = newEmail;

          if (currentUser && currentUser.id === userId) {
            setCurrentUser({ ...currentUser,
              name: newName,
              email: newEmail
            });
            localStorage.setItem('currentUser', JSON.stringify({ ...currentUser,
              name: newName,
              email: newEmail
            }));
          }
          setToast({ message: 'Profile updated successfully', type: 'success' });
          resolve(mockUsers[userIndex]);
        } else {
          setToast({ message: 'User not found', type: 'error' });
          reject(new Error('User not found'));
        }
        setLoading(false);
      }, 300);
    });
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const clearToast = () => {
    setToast(null);
  };

  const isAdmin = currentUser && currentUser.role === 3;
  const isAgent = currentUser && currentUser.role === 2;
  const isCustomer = currentUser && currentUser.role === 1;

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    isAdmin,
    isAgent,
    isCustomer,
    updateUserRole,
    updateUserNameEmail,
    showToast
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {toast && (
        <NotificationToast
          message={toast.message}
          type={toast.type}
          onClose={clearToast}
        />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
