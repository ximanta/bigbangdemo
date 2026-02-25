import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Navbar = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="header">
      <h1>Helpdesk System</h1>
      <nav className="nav-links">
        {currentUser && (
          <>
            <span>Welcome, {currentUser.name}!</span>
            <Link to="/settings">Settings</Link>
            <a href="#" onClick={handleLogout} className="btn-text">
              <LogOut size={18} style={{ marginRight: '5px' }} /> Logout
            </a>
          </>
        )}
        {!currentUser && (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
