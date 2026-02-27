import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, LineChart, Bell, Settings } from 'lucide-react';

function TabBar() {
  const location = useLocation();

  const tabs = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/input', icon: PlusCircle, label: 'Record' },
    { path: '/trends', icon: LineChart, label: 'Trends' },
    { path: '/reminders', icon: Bell, label: 'Reminders' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="tab-bar">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`tab-item ${location.pathname === tab.path ? 'active' : ''}`}
        >
          <tab.icon size={24} />
          <span>{tab.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default TabBar;