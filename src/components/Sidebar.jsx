import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, PlusCircle, Settings, Users
} from 'lucide-react';

const Sidebar = ({ role }) => {
  const location = useLocation();

  const agentLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/tickets', label: 'All Tickets', icon: FileText },
    { path: '/tickets/new', label: 'New Ticket', icon: PlusCircle },
    { path: '/users', label: 'Users', icon: Users },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  const customerLinks = [
    { path: '/my-tickets', label: 'My Tickets', icon: FileText },
    { path: '/submit-ticket', label: 'Submit Ticket', icon: PlusCircle },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  const links = role === 'agent' ? agentLinks : customerLinks;

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={location.pathname === link.path ? 'active' : ''}
          >
            <link.icon size={18} />
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
