import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="topbar">
          <div className="topbar-main">
            <img
              src="/headshot.png"
              alt="Nick Gardi"
              className="hero-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = target.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = 'flex';
              }}
            />
            <div className="hero-image-placeholder" style={{ display: 'none' }}>
              <span>ng</span>
            </div>
            <h1 className="hero-name">nick gardi</h1>
          </div>
          <div className="meta">
            <span>software engineer</span>
          </div>
        </div>
        <nav className="hero-links" aria-label="Contact links">
          <a href="https://linkedin.com/in/nickgardi" target="_blank" rel="noopener noreferrer" className="link-pill">
            linkedin
          </a>
          <a href="https://github.com/NickGardi" target="_blank" rel="noopener noreferrer" className="link-pill">
            github
          </a>
          <a href="mailto:gardi.nick@gmail.com" className="link-pill">
            email
          </a>
        </nav>
      </div>
    </section>
  );
};

export default Hero;
