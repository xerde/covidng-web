import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './component/Header';
import Landing from './component/Landing';
import Signup from './component/Signup';
import Login from './component/Login';
import Dashboard from './component/Dashboard';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
      <Switch>
        <Route
           exact
           path='/'
           component={Landing}
        />
        <Route
           exact
           path='/signup'
           component={Signup}
        />
        <Route
           exact
           path='/login'
           component={Login}
        />
        <Route
           exact
           path='/dashboard'
           component={Dashboard}
        />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
