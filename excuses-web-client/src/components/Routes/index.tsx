import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Main } from 'components/Main';
import { LoginSignup } from 'components/LoginSignup';

export const routes = {
  login: '/login',
  home: '/',
}

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={routes.login}>
          <LoginSignup />
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
 