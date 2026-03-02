import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import CallToAction from './CallToAction';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link
          to="/"
          className="header-logo"
          onClick={closeMobileMenu}
        >
          AestheticLink
        </Link>

        <nav className="header-nav">
          <ul>
            <li>
              <NavLink
                to="/"
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/procedures">
                Procedures
              </NavLink>
            </li>
            <li>
              <NavLink to="/surgeon">
                Surgeon
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery">
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/testimonials">
                Testimonials
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog">
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="header-search">
            <input
              type="text"
              placeholder="Search..."
            />
          </div>
          <CallToAction
            text="Book Consultation"
            to="/contact"
            type="accent"
          />
          <button
            className="mobile-menu-icon"
            onClick={toggleMobileMenu}
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-nav-overlay open">
          <button
            className="mobile-nav-close"
            onClick={toggleMobileMenu}
            aria-label="Close Mobile Menu"
          >
            <X />
          </button>
          <ul>
            <li>
              <Link
                to="/"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/procedures"
                onClick={closeMobileMenu}
              >
                Procedures
              </Link>
            </li>
            <li>
              <Link
                to="/surgeon"
                onClick={closeMobileMenu}
              >
                Surgeon
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                onClick={closeMobileMenu}
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/testimonials"
                onClick={closeMobileMenu}
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                onClick={closeMobileMenu}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </li>
            <li>
              <CallToAction
                text="Book Consultation"
                to="/contact"
                type="accent"
              />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
