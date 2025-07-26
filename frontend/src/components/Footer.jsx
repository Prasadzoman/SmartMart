import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h3 className="footer-title">SmartMart</h3>
        <p className="footer-description">
          Your smart shopping assistant for health and convenience.
        </p>
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </div>
        <p className="footer-copy">© 2025 SmartMart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
