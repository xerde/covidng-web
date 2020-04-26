import React from 'react';
import { Link } from 'react-router-dom';

import './mainNavbar.scss';

const MainNavbar = props => {
  const { page } = props;
  return (
    <div className="main-navbar">
      <div className="main-navbar-content">
        <Link to='/dashboard'>
          <div className={page === '/dashboard' ? "main-navbar-item-active" : "main-navbar-item"}>
            <p>Home</p>
          </div>
        </Link>
        <Link to='/analytics'>
          <div className={page === '/analytics' ? "main-navbar-item-active" : "main-navbar-item"}>
            <p>Analytics</p>
          </div>
        </Link>
        <Link to='/hub'>
          <div className={page === '/hub' ? "main-navbar-item-active" : "main-navbar-item"}>
            <p>Hub</p>
          </div>
        </Link>
        <Link to='/profile'>
          <div className={page === '/profile' ? "main-navbar-item-active" : "main-navbar-item"}>
            <p>Profile</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainNavbar;
