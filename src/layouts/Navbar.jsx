import React, { useState } from 'react';
import { Search, Bell, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const Navbar = ({ onLogout, addNotification }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    addNotification(`Searching for: ${searchTerm}`, 'info');
    // In a real app, this would trigger a search action
    console.log('Search:', searchTerm);
  };

  const handleNotificationClick = () => {
    addNotification('No new notifications at the moment.', 'info');
  };

  return (
    <nav className="navbar">
      <div className="navbar-search">
        <Search size={20} />
        <Input
          type="text"
          placeholder="Search orders, menu items, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="navbar-search-input"
        />
      </div>
      <div className="navbar-actions">
        <Button
          variant="icon-only"
          onClick={handleNotificationClick}
          title="Notifications"
        >
          <Bell size={20} />
        </Button>
        <div className="navbar-user-menu">
          <button
            className="navbar-user-button"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <User size={20} />
            <span>Admin User</span>
          </button>
          {showUserDropdown && (
            <div className="navbar-user-dropdown">
              <Link to="/profile" onClick={() => setShowUserDropdown(false)}>
                Profile
              </Link>
              <Link to="/settings" onClick={() => setShowUserDropdown(false)}>
                Settings
              </Link>
              <a href="#" onClick={onLogout}>
                <LogOut size={16} />
                <span>Log Out</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
