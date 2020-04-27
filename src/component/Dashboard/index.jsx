import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import FormButton from '../../assets/components/FormButton';
import MainNavbar from '../../assets/components/MainNavbar';
import MobileNavbar from '../../assets/components/MobileNavbar';

import axios from '../../api/AxiosInstance';
import { covidAPIs } from '../../api';

import './dashboard.scss';

const Dashboard = props => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("covid19_token");
  
  useEffect(() => {
    // Redirects to login if user is not logged in
    !token && props.history.push("/login");

    // Get user details
    getUser(token);
  }, [token, props]);

  const getUser = async userToken => {
    const config = { 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      } 
    };

    setLoading(true);

    try {
      const response = await axios.get(covidAPIs.user, config);
      setCurrentUser(response.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem("covid19_token");
          return props.history.push("/login");
        };
      }
      
      return error.response;
    }    
  };

  const { pathname } = props.location;

  return (
    <div className='dashboard'>
      <div className='dashboard-navbar'>
        <MainNavbar page={pathname} />
      </div>
      <div className="dashboard-content">
        <div className="dashboard-heading">
          <h2>{loading
            ? <Spinner size="lg" animation="grow" variant="success" />
            : `Hi ${currentUser.firstName}`}</h2>
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
