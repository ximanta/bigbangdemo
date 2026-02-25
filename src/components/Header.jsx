import React from 'react';
import {
  Link,
  useNavigate,
  useLocation
}
from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export const Header = () => {
  const { currentUser,
    logout,
    isAdmin,
    isAgent,
    isCustomer } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <Link
        to={currentUser ? '/dashboard' : '/login'}
        className="header-logo"
      >
        Helpdesk
      </Link>
      <nav className="header-nav">
        <ul>
          {currentUser && (
            <>
              {(isAdmin || isAgent) && (
                <li>
                  <Link
                    to="/dashboard"
                    className={getNavLinkClass('/dashboard')}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {(isAdmin || isAgent) && (
                <li>
                  <Link
                    to="/tickets"
                    className={getNavLinkClass('/tickets')}
                  >
                    Tickets
                  </Link>
                </li>
              )}
              {isCustomer && (
                <li>
                  <Link
                    to="/my-tickets"
                    className={getNavLinkClass('/my-tickets')}
                  >
                    My Tickets
                  </Link>
                </li>
              )}
              {isCustomer && (
                <li>
                  <Link
                    to="/new-ticket"
                    className={getNavLinkClass('/new-ticket')}
                  >
                    New Ticket
                  </Link>
                </li>
              )}
              {isAdmin && (
                <li>
                  <Link
                    to="/users"
                    className={getNavLinkClass('/users')}
                  >
                    Users
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/profile"
                  className={getNavLinkClass('/profile')}
                >
                  Profile
                </Link>
              </li>
            </>
          )}
          {!currentUser && (
            <>
              <li>
                <Link
                  to="/login"
                  className={getNavLinkClass('/login')}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={getNavLinkClass('/register')}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {currentUser && (
        <div className="header-user-info">
          <span>{currentUser.name} ({currentUser.role === 3 ? 'Admin' : currentUser.role === 2 ? 'Agent' : 'Customer'})</span>
          <button
            onClick={handleLogout}
            className="button button-outline"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};
