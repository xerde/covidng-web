import React from 'react';
import { Form } from 'react-bootstrap';
import PhoneInput from "react-phone-input-2";
import { Link } from 'react-router-dom';

import FormButton from '../../assets/components/FormButton';

import "react-phone-input-2/lib/style.css";
import './signup.scss';

const Signup = () => {
  return (
    <div className='signup'>
      <div className="signup-heading">
        <h2>Signup</h2>
      </div>
      <div className="signup-form">
        <Form>
          <Form.Group controlId="lastname">
            <Form.Control type="text" placeholder="First Name" />
            <Form.Text className="text-muted">
              
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="firstname">
            <Form.Control type="text" placeholder="Last Name" />
            <Form.Text className="text-muted">
              
            </Form.Text>
          </Form.Group>
          <div className="form-group">
            <PhoneInput country={'ng'} />
          </div>
          <Form.Group controlId="formBasicEmail">
          <Form.Control as="select">
            <option>Select Age Range</option>
            <option value='0-18'>0-18</option>
            <option value='18-25'>18-25</option>
            <option value='25-39'>25-39</option>
            <option value='40-60'>40-60</option>
            <option value='60 and above'>60 and above</option>
          </Form.Control>
            <Form.Text className="text-muted">
              
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Control type="email" placeholder="Email" />
            <Form.Text className="text-muted">
              
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Control type="text" placeholder="City" />
            <Form.Text className="text-muted">
              
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control type="password" placeholder="Password" />
            <Form.Text className="text-muted">
              
            </Form.Text>
          </Form.Group>
          <FormButton title='Submit' />
        </Form>
      </div>
      <div className="signup-bottom">
        <p>Have an account?</p> <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}

export default Signup;
