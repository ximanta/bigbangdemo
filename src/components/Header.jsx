import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { categories } from '../data/mockData';

function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    setIsSearchVisible(false);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchVisible(false);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container container">
        <Link to="/" className="header__logo">
          <h1>NewsPulse</h1>
        </Link>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            {categories.map((category) => (
              <li key={category} className="header__nav-item">
                <Link
                  to={`/category/${category.toLowerCase()}`}
                  className="header__nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <button
            className="button--icon header__action-button header__search-toggle"
            onClick={toggleSearch}
            aria-label="Toggle search"
          >
            <Search size={20} />
          </button>
          <button
            className="button--icon header__action-button header__menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`header__search-bar ${isSearchVisible ? 'header__search-bar--visible' : ''}`}
      >
        <form onSubmit={handleSearchSubmit} className="header__search-form container">
          <input
            type="text"
            placeholder="Search articles..."
            className="input-field header__search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="button button--primary header__search-button">
            <Search size={20} />
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
    </header>
  );
}

export default Header;
