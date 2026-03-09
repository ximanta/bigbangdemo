import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Utensils, Calendar, ShoppingCart, Settings } from 'lucide-react';

const Footer = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="tab-bar">
      <Link to="/" className={`tab-bar-item ${isActive('/')}`}>
        <Home size={24} />
        <span>Inventory</span>
      </Link>
      <Link to="/recipes" className={`tab-bar-item ${isActive('/recipes')}`}>
        <Utensils size={24} />
        <span>Recipes</span>
      </Link>
      <Link to="/meal-plan" className={`tab-bar-item ${isActive('/meal-plan')}`}>
        <Calendar size={24} />
        <span>Meal Plan</span>
      </Link>
      <Link to="/shopping-list" className={`tab-bar-item ${isActive('/shopping-list')}`}>
        <ShoppingCart size={24} />
        <span>Shopping List</span>
      </Link>
      <Link to="/settings" className={`tab-bar-item ${isActive('/settings')}`}>
        <Settings size={24} />
        <span>Settings</span>
      </Link>
    </nav>
  );
};

export default Footer;
