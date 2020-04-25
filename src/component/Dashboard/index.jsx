import React from 'react';

import FormButton from '../../assets/components/FormButton';
import MainNavbar from '../../assets/components/MainNavbar';
import MobileNavbar from '../../assets/components/MobileNavbar';

import './dashboard.scss';

const Dashboard = props => {
  const { pathname } = props.location;
  const currentUser = 'Akin';
  return (
    <div className='dashboard'>
      <div className='dashboard-navbar'>
        <MainNavbar page={pathname} />
      </div>
      <div className="dashboard-content">
        <div className="dashboard-heading">
          <h2>Hi {currentUser}</h2>
        </div>
        <p>Prevention is better than cure. Let us help you find out what is going on.</p>
        <div className="dashboard-assessment">
          <FormButton title='Start Assessment' />
        </div>
        <div className="dashboard-pages">
          <div className="dashboard-pages-row">
            <div className="dashboard-pages-row-col">
              <i className="far fa-chart-bar"></i>
              <p>Analytics</p>
            </div>
            <div className="dashboard-pages-row-col">
              <i className="fas fa-info"></i>
              <p>Hub</p>
            </div>
            <div className="dashboard-pages-row-col">
              <i className="fas fa-user"></i>
              <p>Profile</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-mobile-nav">
        <MobileNavbar page={pathname} />
      </div>
    </div>
  )
}

export default Dashboard;
