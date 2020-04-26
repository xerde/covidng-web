import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import axios from '../../api/AxiosInstance';
import { covidAPIs } from '../../api';

import './login.scss';

const Login = props => {
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const token = localStorage.getItem("covid19_token");

  useEffect(() => {
    // Redirects to the dashboard if user is already logged in
    token && props.history.push("/dashboard");
  }, [token, props])

  const onSubmit = data => {
    (async function() {
      const config = { headers: { "Content-Type": "application/json" } };
      setLoading(true);

      try {
        const response = await axios.post(covidAPIs.login, data, config);
        setLoading(false);
        setLoginError("");
        const { token } = response.data;
        localStorage.setItem("covid19_token", token);
        
        // Redirect to the dashboard after successfull login
        props.history.push("/dashboard");
      } catch (error) {
        // Set loading state back to false
        setLoading(false);
        // Output error message
        setLoginError(error.response.data.errors[0]);
      }
    })();
  }

  return (
    <div className='login'>
      <div className="login-heading">
        <h2>Login</h2>
      </div>
      <div className="login-form">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="email">
            <Form.Control type="email" name="email" placeholder="Email" ref={register({ required: true })} />
            <Form.Text className="text-muted">
              {errors.email && <span>Email is required</span>}
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control type="password" name="password" placeholder="Password" ref={register({ required: true })} />
            <Form.Text className="text-muted">
              {errors.password && <span>Password is required</span>}
            </Form.Text>
          </Form.Group>

          <div className="form-button">
            <Button type="submit">
             {loading ? <Spinner size="sm" animation="border" /> : "Login"}
            </Button>
            <Form.Text className="text-muted">
              {loginError && <span>{loginError}</span>}
            </Form.Text>
          </div>
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
