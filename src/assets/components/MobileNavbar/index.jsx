import React from 'react';
import { Link } from 'react-router-dom';

import './mobileNavbar.scss';

const MobileNavbar = props => {
  const { page } = props;
  return (
    <div className="mobile-navbar">
      <Link to='/dashboard'>
        <div className="mobile-navbar-item">
          <div className={page === '/dashboard' ? "mobile-navbar-item-icon-active" : "mobile-navbar-item-icon"}>
            <i className="fas fa-comment"></i>
          </div>
        </div>
      </Link>
      <Link to='/analytics'>
        <div className="mobile-navbar-item">
          <div className={page === '/analytics' ? "mobile-navbar-item-icon-active" : "mobile-navbar-item-icon"}>
            <i className="far fa-chart-bar"></i>
          </div>
        </div>
      </Link>
      <Link to='/hub'>
        <div className="mobile-navbar-item">
          <div className={page === '/hub' ? "mobile-navbar-item-icon-active" : "mobile-navbar-item-icon"}>
            <i className="fas fa-info"></i>
          </div>
        </div>
      </Link>
      <Link to='/profile'>
        <div className="mobile-navbar-item">
          <div className={page === '/profile' ? "mobile-navbar-item-icon-active" : "mobile-navbar-item-icon"}>
            <i className="fas fa-user"></i>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MobileNavbar;
