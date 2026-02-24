import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__section footer__section--about">
          <h3 className="footer__title">NewsPulse</h3>
          <p className="footer__description">
            Your daily dose of timely, diverse, and high-quality journalistic content.
            Stay informed, stay ahead.
          </p>
        </div>

        <div className="footer__section footer__section--links">
          <h4 className="footer__subtitle">Quick Links</h4>
          <ul className="footer__list">
            <li className="footer__list-item">
              <Link to="/" className="footer__link">Home</Link>
            </li>
            <li className="footer__list-item">
              <Link to="/category/technology" className="footer__link">Technology</Link>
            </li>
            <li className="footer__list-item">
              <Link to="/category/politics" className="footer__link">Politics</Link>
            </li>
            <li className="footer__list-item">
              <Link to="/category/sports" className="footer__link">Sports</Link>
            </li>
          </ul>
        </div>

        <div className="footer__section footer__section--legal">
          <h4 className="footer__subtitle">Legal</h4>
          <ul className="footer__list">
            <li className="footer__list-item">
              <Link to="/privacy-policy" className="footer__link">Privacy Policy</Link>
            </li>
            <li className="footer__list-item">
              <Link to="/terms-of-service" className="footer__link">Terms of Service</Link>
            </li>
          </ul>
        </div>

        <div className="footer__section footer__section--social">
          <h4 className="footer__subtitle">Connect With Us</h4>
          <div className="footer__social-links">
            <a
              href="#"
              className="footer__social-icon button--icon"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="footer__social-icon button--icon"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="footer__social-icon button--icon"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="footer__social-icon button--icon"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
          <div className="footer__newsletter-signup">
            <h4 className="footer__subtitle">Newsletter</h4>
            <p>Stay updated with our latest news.</p>
            <form className="footer__newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                className="input-field footer__newsletter-input"
                aria-label="Email for newsletter signup"
              />
              <button type="submit" className="button button--primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__copyright">
          &copy; {currentYear} NewsPulse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
