import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MyTicketsPage from './pages/MyTicketsPage';
import SubmitTicketPage from './pages/SubmitTicketPage';
import TicketDetailPage from './pages/TicketDetailPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NotificationContainer from './components/Notification';
import { generateId } from './utils/helpers';

const AppContent = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (location.pathname === '/' || location.pathname === '/login') {
        if (currentUser.role === 'agent') {
          navigate('/dashboard');
        } else {
          navigate('/my-tickets');
        }
      }
    } else if (location.pathname !== '/login') {
      navigate('/login');
    }
  }, [currentUser, navigate, location.pathname]);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const addNotification = (notification) => {
    const newNotification = { ...notification, id: generateId('NOTIF') };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const showSidebar = currentUser && location.pathname !== '/login';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <div style={{ display: 'flex', flex: 1 }}>
        {showSidebar && <Sidebar role={currentUser.role} />}
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} addNotification={addNotification} />} />
          <Route
            path="/dashboard"
            element={currentUser && currentUser.role === 'agent' ? <DashboardPage /> : <NotFoundPage />}
          />
          <Route
            path="/my-tickets"
            element={currentUser && currentUser.role === 'customer' ? <MyTicketsPage currentUser={currentUser} /> : <NotFoundPage />}
          />
          <Route
            path="/submit-ticket"
            element={<SubmitTicketPage currentUser={currentUser} addNotification={addNotification} />}
          />
          <Route
            path="/tickets/:id"
            element={<TicketDetailPage currentUser={currentUser} addNotification={addNotification} />}
          />
          <Route
            path="/my-tickets/:id"
            element={<TicketDetailPage currentUser={currentUser} addNotification={addNotification} />}
          />
          <Route
            path="/settings"
            element={<SettingsPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <NotificationContainer notifications={notifications} removeNotification={removeNotification} />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
