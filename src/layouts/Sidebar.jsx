import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ListOrdered,
  Utensils,
  Package,
  BarChart,
  Settings,
  UserCircle,
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/orders', name: 'Orders', icon: ListOrdered },
    { path: '/menu', name: 'Menu', icon: Utensils },
    { path: '/inventory', name: 'Inventory', icon: Package },
    { path: '/reports', name: 'Reports', icon: BarChart },
    { path: '/settings', name: 'Settings', icon: Settings },
    { path: '/profile', name: 'Profile', icon: UserCircle },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>CKM</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
