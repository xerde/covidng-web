import React from 'react';

import logo from '../../assets/images/covid_logo.png';

import './header.scss';

const Header = () => {
  return (
    <div className='header'>
      <div className="header-logo">
        <img src={logo} alt="" />
      </div>
    </div>
  );
}

export default Header;
