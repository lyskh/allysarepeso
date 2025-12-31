import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // navigation now uses route Links; helper left for in-page fallbacks
  const closeMenu = () => setIsOpen(false);

  const location = useLocation();

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${location.pathname === '/services' ? 'services-route' : ''}`}>
      <div className="container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          Allysa
        </Link>
        <button 
          className={`navbar-toggler ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeMenu}>
                Intro
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={closeMenu}>
                About Me
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/works" onClick={closeMenu}>
                Works
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gallery" onClick={closeMenu}>
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={closeMenu}>
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services" onClick={closeMenu}>
                Services
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


