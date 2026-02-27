import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Menu } from 'lucide-react';

function Header({ title }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if a back button should be shown
  // We'll show it if not on the root path or login/signup
  const showBackButton = location.pathname !== '/';

  const getTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/input': return 'Record Vitals';
      case '/trends': return 'Trends & History';
      case '/reminders': return 'Reminders';
      case '/settings': return 'Settings';
      case '/profile': return 'Profile';
      case '/login': return 'Login';
      default: return title || 'Health Tracker';
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className="header">
      <div style={{ visibility: showBackButton ? 'visible' : 'hidden' }}>
        {showBackButton && (
          <button onClick={handleBackClick} className="header-button">
            <ArrowLeft />
          </button>
        )}
      </div>
      <h1 className="header-title">{getTitle()}</h1>
      {/* Placeholder for a potential right-side menu button */}
      <div style={{ width: '40px' }}>
        {/* <button className="header-button">
          <Menu />
        </button> */}
      </div>
    </header>
  );
}

export default Header;