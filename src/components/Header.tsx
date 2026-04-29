import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {

  const onClickSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Implement sign-up logic here, e.g., navigate to a sign-up page or open a modal

  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <div className="logo">THRIVE</div>
        </Link>
        <div className='header-nav'>
          <nav className="nav">
            <ul className="nav-links">
              <li><Link to="/#menu">Menu</Link></li>
              <li><Link to="/#drinks">Power Drinks</Link></li>
              <li><Link to="/#community">Community</Link></li>
              <li><Link to="/#who">Who we are</Link></li>
              <li><Link to="/#franchise">Franchise</Link></li>
            </ul>
          </nav>
          <Link to="/login" className="build-btn-link">
            <button className="sign-up-btn" onClick={() => { onClickSignUp }}>Sign Up</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;