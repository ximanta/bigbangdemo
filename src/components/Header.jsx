import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Header = () => {
  const { totalItemsInCart } = useCart();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert('Logged out successfully!');
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="header-logo">
          E-Commerce
        </Link>
        <nav className="header-nav">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/about">About Us</Link>
        </nav>
        <div className="header-actions">
          <div className="header-search">
            <input type="text" placeholder="Search products..." />
            <Search className="icon" size={20} />
          </div>
          <Link to="/cart" className="cart-icon-wrapper">
            <ShoppingCart size={24} />
            {totalItemsInCart > 0 && (
              <span className="cart-item-count">{totalItemsInCart}</span>
            )}
          </Link>
          {currentUser ? (
            <div className="flex-group">
              <Link to="/account">
                <User size={24} />
              </Link>
              <Button variant="link" onClick={handleLogout} className="flex-group">
                <LogOut size={20} />
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <User size={24} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;