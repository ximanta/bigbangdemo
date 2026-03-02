import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import { clinicInfo } from '../data/mockData';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>About AestheticLink</h4>
            <p>
              AestheticLink is dedicated to providing exceptional plastic surgery
              services, combining artistry with advanced medical techniques to help
              you achieve your aesthetic goals with confidence.
            </p>
            <div className="footer-social-links">
              <a
                href={clinicInfo.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook />
              </a>
              <a
                href={clinicInfo.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram />
              </a>
              <a
                href={clinicInfo.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter />
              </a>
              <a
                href={clinicInfo.socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/procedures">
                  Procedures
                </Link>
              </li>
              <li>
                <Link to="/surgeon">
                  Our Surgeon
                </Link>
              </li>
              <li>
                <Link to="/gallery">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/testimonials">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/blog">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul>
              <li>
                <Phone size={18} /> {clinicInfo.phone}
              </li>
              <li>
                <Mail size={18} /> {clinicInfo.email}
              </li>
              <li>
                <MapPin size={18} /> {clinicInfo.address}
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Clinic Hours</h4>
            <ul>
              {clinicInfo.hours.map((hour, index) => (
                <li key={index}>
                  {hour}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} AestheticLink. All rights reserved.
          </p>
          <p>
            <Link to="/privacy-policy">
              Privacy Policy
            </Link>
            {' | '}
            <Link to="/terms-of-service">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
