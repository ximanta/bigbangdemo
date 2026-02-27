import React, { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import InputVitals from './pages/InputVitals';
import Trends from './pages/Trends';
import Reminders from './pages/Reminders';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header';
import TabBar from './components/TabBar';

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  const noHeaderPaths = ['/login', '/signup'];
  const noTabBarPaths = ['/login', '/signup'];

  const showHeader = !noHeaderPaths.includes(location.pathname);
  const showTabBar = isAuthenticated && !noTabBarPaths.includes(location.pathname);

  return (
    <div className="app-container">
      {showHeader && <Header />}
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/input" element={<InputVitals />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/reminders" element={<Reminders />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Dashboard />} />
            </>
          ) : (
            <Route path="*" element={<Login />} />
          )}
        </Routes>
      </main>
      {showTabBar && <TabBar />}
    </div>
  );
}

export default App;