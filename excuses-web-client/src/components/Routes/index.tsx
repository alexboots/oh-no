import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PageWithHeader } from 'bumbag';

import { Header } from 'components/Main/Header';

// Routes
import { Main } from 'components/Main';
import { Login } from 'components/LoginSignup/Login';
import { Signup } from 'components/LoginSignup/Signup';
import { LogoutPage } from 'components/LoginSignup/Logout';
import { AddExcuse } from 'components/Excuses/AddExcuse';
import { MyExcuses } from 'components/Excuses/MyExcuses';

export const routes = {
  login: '/login',
  signup: '/signup',
  logout: '/logout',
  myExcuses: '/my-excuses',
  addExcuse: '/add-excuse',
  home: '/',
}

export const Routes = () => {
  return (
    <Router>
      <PageWithHeader
        header={<Header />}
        border="default"
      >
        <Switch>
          <Route path={routes.login}>
            <Login />
          </Route>
          <Route path={routes.signup}>
            <Signup />
          </Route>
          <Route path={routes.addExcuse}>
            <AddExcuse />
          </Route>
          <Route path={routes.myExcuses}>
            <MyExcuses />
          </Route>
          <Route path={routes.logout}>
            <LogoutPage />
          </Route>
          <Route path={routes.home}>
            <Main />
          </Route>
        </Switch>
      </PageWithHeader>
    </Router>
  );
}

// Probably need to add protected routes at some point
// https://reactrouter.com/web/example/auth-workflow
 