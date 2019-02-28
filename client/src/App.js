import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
import Signin from './signin/Signin';
import Signup from './signup/Signup';
import Users from './users/Users';

class App extends Component {
  render() {
    return (
      <>
        <header>
          <nav>
            <NavLink to="/signin">Sign In</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signup">Sign Up</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users">Users</NavLink>
            &nbsp;|&nbsp;
          </nav>
          <main>
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/users" component={Users} />
          </main>
        </header>
      </>
    );
  }
}

export default App;
