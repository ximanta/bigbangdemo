import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import LearningPaths from './pages/LearningPaths';
import Resources from './pages/Resources';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import Notification from './components/Notification';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notification, setNotification] = useState(null);

  // Dummy authentication logic
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem('authToken', 'dummy-token-123');
    setIsAuthenticated(true);
    setNotification({ message: `Welcome back, ${username}!`, type: 'success' });
    navigate('/dashboard');
  };

  const handleRegister = (username) => {
    localStorage.setItem('authToken', 'dummy-token-123');
    setIsAuthenticated(true);
    setNotification({ message: `Account created for ${username}!`, type: 'success' });
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setNotification({ message: 'You have been logged out.', type: 'info' });
    navigate('/login');
  };

  const showNavbarAndSidebar = !['/login', '/register'].includes(location.pathname);

  return (
    <div className="app-container">
      {showNavbarAndSidebar && <Sidebar onLogout={handleLogout} />}
      <div className="content-area">
        {showNavbarAndSidebar && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/learning-paths" element={<LearningPaths />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Dashboard />} /> {/* Default route after login */}
            </>
          ) : (
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          )}
        </Routes>
      </div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default App;
