import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { gql, useQuery, useApolloClient } from '@apollo/client';

import { useTest } from 'hooks/loggedIn';
import { routes } from 'components/Routes'
import { LogoutButton } from 'components/LoginSignup/Logout';
import { PageWithHeader, TopNav, Button, Box, Image } from 'bumbag';
import { GET_IS_LOGGED_IN } from 'queries/client';

export const Header: React.FC = () => {
  const history = useHistory();
  const test: any = useTest()
  const { data, loading, error } = useQuery(GET_IS_LOGGED_IN);
  const { isLoggedIn } = data;

  return(
    <TopNav>
      <Link to="/logout">logout page</Link>
      <TopNav.Section>
        <TopNav.Item href="https://excuses.com" fontWeight="semibold">
          <Image src="https://picsum.photos/44/44" height="44px" />
        </TopNav.Item>
        <TopNav.Item href="#">New Excuse</TopNav.Item>
        <TopNav.Item href="#">My Excuses</TopNav.Item>
      </TopNav.Section>
      <TopNav.Section marginRight="major-2">
       { !isLoggedIn && 
        <>
          <TopNav.Item>
            <Button variant="ghost" palette="primary" onClick={() => history.push(routes.signup)}>Sign up</Button>
          </TopNav.Item>
          <TopNav.Item>
            <Button palette="primary" onClick={() => history.push(routes.login)}>Login</Button>
          </TopNav.Item> 
        </> }
       { isLoggedIn && 
        <>
          <TopNav.Item>
            <LogoutButton />
          </TopNav.Item> 
        </> }
      </TopNav.Section>
    </TopNav>
  );
}

