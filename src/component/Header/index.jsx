import React from 'react';

import logo from '../../assets/images/covid_logo.png';

import './header.scss';

const Header = () => {
  return (
    <div className='header'>
     <a href="/">
      <div className="header-logo">
        <img src={logo} alt="" />
      </div>
     </a>
    </div>
  );
}

export default Header;
