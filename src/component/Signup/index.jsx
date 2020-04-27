import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import PhoneInput from "react-phone-input-2";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { usePosition } from 'use-position';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { toast } from "react-toastify";

import axios from '../../api/AxiosInstance';
import { covidAPIs } from '../../api';

import "react-phone-input-2/lib/style.css";
import './signup.scss';

const Signup = props => {
  const [phoneNo, setPhoneNo] = useState("");
  const [stateLatitude, setStateLatitude] = useState(0);
  const [stateLogitude, setStateLogitude] = useState(0);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState("");

  const { register, handleSubmit, errors } = useForm();

  const {
    latitude,
    longitude
  } = usePosition();

  useEffect(() => {
    setStateLatitude(latitude);
    setStateLogitude(longitude);
  }, [latitude, longitude]);

  const token = localStorage.getItem("covid19_token");

  useEffect(() => {
    // Redirects to the dashboard if user is already logged in
    token && props.history.push("/dashboard");
  }, [token, props]);

  const onSubmit = data => {
    const callingCode = phoneNo.substring(0, 3);
    const phone = phoneNo.substring(3);
    const payload = {
      ...data,
      phone,
      callingCode,
      longitude: stateLogitude,
      latitude: stateLatitude,
      state: region
    };

    console.log(payload);

    (async function() {
      const config = { headers: { "Content-Type": "application/json" } };

      setLoading(true);

      try {
        const response = await axios.post(covidAPIs.signup, payload, config);
        
        setSignupError("");
        setLoading(false);
        
        console.log(response.data);

        toast.success("Account created successfully. Redirecting to login page...");
        setTimeout(() => {
          props.history.push("/login");
        }, 3000);
      } catch (error) {
        setSignupError("Unable to complete registration at the moment, please try again later");
        setLoading(false);
        return error.response;
      }
    })();
  }

  return (
    <div className='signup'>
      <div className="signup-heading">
        <h2>Signup</h2>
      </div>
      <div className="signup-form">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="lastname">
            <Form.Control type="text" name="firstName" placeholder="First Name" ref={register({ required: true })} />
            <Form.Text className="text-muted">
              {errors.firstName && <span>First name is required</span>}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="firstname">
            <Form.Control type="text" name="lastName" placeholder="Last Name" ref={register({ required: true })} />
            <Form.Text className="text-muted">
              {errors.lastName && <span>Last name is required</span>}
            </Form.Text>
          </Form.Group>
          <div className="form-group">
            <PhoneInput
              country={'ng'} 
              value={phoneNo}
              onChange={phone => setPhoneNo(phone)}
              name="phone"
            />
          </div>
          <Form.Group controlId="ageRange">
            <Form.Control as="select" name="ageRange" ref={register({ required: true })}>
              <option value="">Select Age Range</option>
              <option value='0-18'>0-18</option>
              <option value='18-25'>18-25</option>
              <option value='25-39'>25-39</option>
              <option value='40-60'>40-60</option>
              <option value='60 and above'>60 and above</option>
            </Form.Control>
            <Form.Text className="text-muted">
              {errors.ageRange && <span>Please select your age range</span>}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Control type="email" name='email' placeholder="Email" ref={register({ required: true })} />
            <Form.Text className="text-muted">
              {errors.email && <span>Email is required</span>}
            </Form.Text>
          </Form.Group>
          <div className="form-group">
            <CountryDropdown
              classes="form-control"
              name="country_residence"
              value={country}
              ref={register}
              onChange={val => setCountry(val)}
            />
          </div>
          <div className="form-group">
            <RegionDropdown
              classes="form-control"
              name="state_residence"
              country={country}
              value={region}
              ref={register}
              onChange={val => setRegion(val)}
            />
          </div>
          <Form.Group controlId="city">
            <Form.Control type="text" name="city" placeholder="City" ref={register({ required: true })} />
            <Form.Text className="text-muted">
              {errors.city && <span>City is required</span>}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control type="password" name="password" placeholder="Password" ref={register({ required: true })} />
            <Form.Text className="text-muted">
              {errors.password && <span>Password is required</span>}
            </Form.Text>
          </Form.Group>

          <div className="form-button">
            <Button type="submit" disabled={!phoneNo || !country || !region}>
              {loading ? <Spinner size="sm" animation="border" /> : "Submit"}
            </Button>
            <Form.Text className="text-muted">
              {signupError && <span>{signupError}</span>}
            </Form.Text>
          </div>

          {/* <FormButton title='Submit' /> */}
        </Form>
      </div>
      <div className="signup-bottom">
        <p>Have an account?</p> <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}

export default Signup;
