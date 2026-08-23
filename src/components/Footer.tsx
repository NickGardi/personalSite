import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <span>nick gardi</span>
          <div className="footer-social">
            <a href="https://linkedin.com/in/nickgardi" target="_blank" rel="noopener noreferrer" className="footer-link">
              linkedin
            </a>
            <a href="https://github.com/NickGardi" target="_blank" rel="noopener noreferrer" className="footer-link">
              github
            </a>
            <a href="mailto:gardi.nick@gmail.com" className="footer-link">
              email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
