import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/careers">Careers</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/shipping">Shipping Information</Link></li>
            <li><Link to="/returns">Returns & Exchanges</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer"><Facebook size={24} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><Twitter size={24} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><Instagram size={24} /></a>
          </div>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>Email: info@ecommerce.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 E-Commerce Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;