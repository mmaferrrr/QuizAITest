import React, {useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/" onClick={closeMenu}><h2>lrnr</h2></Link>
      </div>
      <div className={`menu-toggle ${menuActive ? 'is-active' : ''}`} id="mobile-menu" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <nav className={`nav-links ${menuActive ? 'active' : ''}`}>
        <ul>
          <li>
            <Link to="/account" onClick={closeMenu}>Account</Link>
          </li>
          <li>
            <Link to="/quizgeneration" onClick={closeMenu}>Quiz Generation</Link>
          </li>
        </ul>
      </nav>
      {menuActive && <div id="overlay" onClick={closeMenu}></div>}
    </header>
  );
};

export default Navbar;
