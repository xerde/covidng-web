import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import MainNavbar from '../../assets/components/MainNavbar';
import MobileNavbar from '../../assets/components/MobileNavbar';

import axios from '../../api/AxiosInstance';
import { covidAPIs } from '../../api';

import './profile.scss';

const Profile = props => {
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
      localStorage.setItem("c19assess_id", response.data._id);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem("covid19_token");
          localStorage.removeItem("c19assess_id");
          return props.history.push("/login");
        };
      }
      
      return error.response;
    }    
  };

  const { pathname } = props.location;

  const logout = () => {
    localStorage.removeItem("covid19_token");
    localStorage.removeItem("c19assess_id");
    return props.history.push("/login");
  };

  return (
    <div className="dashboard">
      <div className='dashboard-navbar'>
        <MainNavbar page={pathname} />
      </div>
      <div className="profile">
        <h3>Basic Information</h3>
        {loading ? <Spinner size="lg" animation="grow" variant="success" /> : (
          <div>
            <h4>{currentUser.firstName} {currentUser.lastName}</h4>
            <h5>Age Group</h5>
            <p>{currentUser.ageRange}</p>
            <h5>City</h5>
            <p>{currentUser.city}</p>
            <button onClick={logout}>Logout</button>
        </div>
        )}
      </div>
      <div className="dashboard-mobile-nav">
        <MobileNavbar page={pathname} />
      </div>
    </div>
  )
}

export default Profile;
