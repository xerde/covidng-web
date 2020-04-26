import React from 'react';
import stayHome from '../../assets/images/stay-home.jpg';
import './Landing.scss';
import { NavLink } from 'react-router-dom';
import FormButton from '../../assets/components/FormButton';

const Landing = () => {
  return (
    <div className="landing-container">
      <section className="d-flex flex-column align-items-center">
        <img src={stayHome} className="mt-4" alt="stay home couple" />
        <div className="p-2 m-2">
          <h2>Self Assessment</h2>
        </div>
        <p className="p-2 mx-2 text-center">
          Know your status to help Protect yourself and others from infection.
          Click below to get started
        </p>
        <NavLink
          to="/login"
          className="text-white"
          style={{ maxWidth: '35rem', width: '85%' }}
        >
          <FormButton title="Sign In" />
        </NavLink>
        <div className=" my-4">
          Do not have an account?
          <NavLink to="/signup" className="text-primary mx-2">
            Create One
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Landing;
