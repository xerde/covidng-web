import React from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import FormButton from '../../assets/components/FormButton';

import './login.scss';

const Login = () => {
  return (
    <div className='login'>
      <div className="login-heading">
        <h2>Login</h2>
      </div>
      <div className="login-form">
        <Form>
          <Form.Group controlId="email">
            <Form.Control type="email" placeholder="Email" />
            <Form.Text className="text-muted">
              
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control type="password" placeholder="Password" />
            <Form.Text className="text-muted">
              
            </Form.Text>
          </Form.Group>
          <FormButton title='Login' />
        </Form>
      </div>
      <div className="login-bottom">
        <p>Do not have an account?</p>
        <Link to='/signup'>Create one</Link>
      </div>
    </div>
  );
}

export default Login;
