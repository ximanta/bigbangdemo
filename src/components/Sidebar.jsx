import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Brain, Lightbulb, BookOpen, Settings, LogOut } from 'lucide-react';
import Button from './Button';

function Sidebar({ onLogout }) {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/assessment', label: 'Assessment', icon: Brain },
    { path: '/learning-paths', label: 'Learning Paths', icon: Lightbulb },
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>AI Navigator</h2>
      </div>
      <nav>
        {
          navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))
        }
      </nav>
      <div style={{ marginTop: 'auto', padding: '0 25px 20px' }}>
        <Button onClick={onLogout} variant="secondary">
          <LogOut size={18} /> Log Out
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
