import React from 'react';
import { useHistory } from "react-router-dom";
import { routes } from 'components/Routes'
import { useLoggedInContext } from 'contexts/LoggedInContext';
import { LogoutButton } from 'components/LoginSignup/Logout';
import { PageWithHeader, TopNav, Button, Box, Image } from 'bumbag';

export const Header: React.FC = () => {
  const history = useHistory();
  const { isLoggedIn } = useLoggedInContext();

  return(
    <TopNav>
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
       { isLoggedIn && <LogoutButton /> }
      </TopNav.Section>
    </TopNav>
  );
}