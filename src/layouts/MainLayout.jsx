import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Notification from '../components/Notification';

const MainLayout = ({ onLogout, notifications, addNotification }) => {
  const handleRemoveNotification = (id) => {
    // This should be handled by the parent (App.jsx) to update its state
    // For demo purposes, we'll just log it or expect the parent to manage timeouts
    console.log('Dismissing notification:', id);
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content-area">
        <Navbar onLogout={onLogout} addNotification={addNotification} />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
      <div className="notification-container">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={handleRemoveNotification}
          />
        ))}
      </div>
    </div>
  );
};

export default MainLayout;
