import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import AlertMessage from '../components/AlertMessage';
import { User, Bell, Moon } from 'lucide-react';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '', show: false });

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type, show: true });
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // In a real app, this would send data to a backend
    console.log('Saving profile:', profile);
    showAlert('Profile updated successfully!');
  };

  const handleLogout = () => {
    // In a real app, this would clear authentication tokens
    console.log('Logging out...');
    showAlert('Logged out successfully!', 'warning');
    // For demo, no actual navigation change
  };

  // Apply dark mode class to body
  useEffect(() => {
    if (darkModeEnabled) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkModeEnabled]);

  return (
    <>
      <Header title="Settings" />
      <AlertMessage
        message={alert.message}
        type={alert.type}
        show={alert.show}
        onClose={closeAlert}
      />
      <div className="container">
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 className="flex-row" style={{ alignItems: 'center' }}>
            <User size={20} style={{ marginRight: '8px' }} />
            User Profile
          </h3>
          <label htmlFor="name" className="text-small">Name:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            className="input-field"
          />
          <label htmlFor="email" className="text-small">Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            className="input-field"
          />
          <Button onClick={handleSaveProfile} style={{ marginTop: '12px' }}>
            Save Changes
          </Button>
        </div>

        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 className="flex-row" style={{ alignItems: 'center' }}>
            <Bell size={20} style={{ marginRight: '8px' }} />
            Notifications
          </h3>
          <div className="flex-row flex-space-between" style={{ alignItems: 'center' }}>
            <span>Enable Notifications</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={() => {
                  setNotificationsEnabled(!notificationsEnabled);
                  showAlert(`Notifications ${notificationsEnabled ? 'disabled' : 'enabled'}!`);
                }}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 className="flex-row" style={{ alignItems: 'center' }}>
            <Moon size={20} style={{ marginRight: '8px' }} />
            App Preferences
          </h3>
          <div className="flex-row flex-space-between" style={{ alignItems: 'center' }}>
            <span>Dark Mode</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={darkModeEnabled}
                onChange={() => {
                  setDarkModeEnabled(!darkModeEnabled);
                  showAlert(`Dark mode ${darkModeEnabled ? 'disabled' : 'enabled'}!`);
                }}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <Button variant="danger" onClick={handleLogout} style={{ width: '100%', marginTop: '16px' }}>
          Logout
        </Button>
      </div>
      <style>{`
        body.dark-mode {
          --primary-color: #66bb6a;
          --primary-color-rgb: 102, 187, 106;
          --primary-dark-color: #43a047;
          --background-color: #1a1a1a;
          --surface-color: #2c2c2c;
          --text-color: #e0e0e0;
          --text-light-color: #bbbbbb;
          --border-color: #444444;
          --danger-color: #ef5350;
          --warning-color: #ffa726;
          --success-color: #81c784;
        }

        body.dark-mode .header {
          background-color: var(--primary-dark-color);
        }

        body.dark-mode .tab-bar {
          background-color: var(--surface-color);
          border-top-color: var(--border-color);
        }

        body.dark-mode .tab-bar-item {
          color: var(--text-light-color);
        }

        body.dark-mode .tab-bar-item.active {
          color: var(--primary-color);
        }

        body.dark-mode .tab-bar-item:hover {
          color: var(--primary-color);
        }

        body.dark-mode .button {
          background-color: var(--primary-color);
        }

        body.dark-mode .button:hover {
          background-color: var(--primary-dark-color);
        }

        body.dark-mode .input-field,
        body.dark-mode .textarea-field,
        body.dark-mode .select-field {
          background-color: #3a3a3a;
          color: var(--text-color);
          border-color: #555555;
        }

        body.dark-mode .input-field:focus,
        body.dark-mode .textarea-field:focus,
        body.dark-mode .select-field:focus {
          border-color: var(--primary-color);
        }

        body.dark-mode .card {
          background-color: var(--surface-color);
          border-color: var(--border-color);
        }

        body.dark-mode .search-bar-input {
          background-color: #3a3a3a;
          color: var(--text-color);
          border-color: #555555;
        }

        body.dark-mode .search-bar-input:focus {
          border-color: var(--primary-color);
        }

        body.dark-mode .tag {
          background-color: #555555;
          color: var(--text-color);
          border-color: #666666;
        }

        body.dark-mode .tag.active {
          background-color: var(--primary-color);
          border-color: var(--primary-dark-color);
          color: white;
        }

        body.dark-mode .toggle-slider {
          background-color: #666;
        }

        body.dark-mode input:checked + .toggle-slider {
          background-color: var(--primary-color);
        }

        body.dark-mode .progress-bar-container {
          background-color: #555;
        }

        body.dark-mode .icon-button {
          color: var(--text-light-color);
        }

        body.dark-mode .icon-button:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        body.dark-mode .icon-button.primary {
          color: var(--primary-color);
        }

        body.dark-mode .icon-button.danger {
          color: var(--danger-color);
        }

        body.dark-mode .calendar-day {
          background-color: #3a3a3a;
          border-color: #555555;
        }

        body.dark-mode .calendar-day.empty {
          background-color: #2c2c2c;
        }

        body.dark-mode .calendar-day.today {
          border: 2px solid var(--primary-color);
        }

        body.dark-mode .calendar-day.selected {
          background-color: rgba(var(--primary-color-rgb), 0.2);
          border: 2px solid var(--primary-dark-color);
        }

        body.dark-mode .calendar-grid-header div {
          color: var(--primary-color);
        }

        body.dark-mode .meal-indicator {
          background-color: #555;
        }
        body.dark-mode .meal-indicator.breakfast { background-color: #6cb66f; }
        body.dark-mode .meal-indicator.lunch { background-color: #52a655; }
        body.dark-mode .meal-indicator.dinner { background-color: var(--primary-color); }
      `}</style>
    </>
  );
};

export default Settings;
