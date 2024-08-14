import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>
          Embrace the power of our app and unlock the secrets of the universe, one quiz at a time.
          As I always say, "Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present."
        </p>
        <div className="footer-links">
          <h3>Links</h3>
          <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="/quizgeneration">Quiz Generation</Link>
          </li>
          </ul>
        </div>
      </div>
      <div className="footer-credit">
        <p>Made by Materialize</p>
        </div>
    </footer>
  );
}
export default Footer;