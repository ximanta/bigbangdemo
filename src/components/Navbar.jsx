import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Brain, Lightbulb, BookOpen, Settings, User } from 'lucide-react';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        AI Navigator
      </Link>
      <div className="navbar-links">
        <Link
          to="/dashboard"
          className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link
          to="/assessment"
          className={`navbar-link ${location.pathname === '/assessment' ? 'active' : ''}`}
        >
          <Brain size={18} /> Assessment
        </Link>
        <Link
          to="/learning-paths"
          className={`navbar-link ${location.pathname === '/learning-paths' ? 'active' : ''}`}
        >
          <Lightbulb size={18} /> Learning Paths
        </Link>
        <Link
          to="/resources"
          className={`navbar-link ${location.pathname === '/resources' ? 'active' : ''}`}
        >
          <BookOpen size={18} /> Resources
        </Link>
        <Link
          to="/settings"
          className={`navbar-link ${location.pathname === '/settings' ? 'active' : ''}`}
        >
          <Settings size={18} /> Settings
        </Link>
      </div>
      <div className="user-profile">
        <div className="user-avatar">
          <User size={20} />
        </div>
        <span>John Doe</span>
      </div>
    </nav>
  );
}

export default Navbar;
