import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Main } from 'components/Main';
import { Login } from 'components/LoginSignup/Login';
import { Signup } from 'components/LoginSignup/Signup';
import { LogoutPage } from 'components/LoginSignup/Logout';

export const routes = {
  login: '/login',
  signup: '/signup',
  logout: '/logout',
  home: '/',
}

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={routes.login}>
          <Login />
        </Route>
        <Route path={routes.signup}>
          <Signup />
        </Route>
        <Route path={routes.logout}>
          <LogoutPage />
        </Route>
        <Route path={routes.home}>
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

// Probably need to add protected routes at some point
// https://reactrouter.com/web/example/auth-workflow
 