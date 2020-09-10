import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { routes } from 'components/Routes'
import { LogoutButton } from 'components/LoginSignup/Logout';
import { Icon, Box, TopNav, Button, DropdownMenu, Image } from 'bumbag';
import { GET_IS_LOGGED_IN } from 'queries/client';

export const Header: React.FC = () => {
  const history = useHistory();
  const [selectedId, setSelectedId] = useState('get-started');
  const { data, loading, error } = useQuery(GET_IS_LOGGED_IN);
  const { isLoggedIn } = data;

  return(
    <TopNav selectedId={selectedId} onChange={(id: string) => setSelectedId(id)}>
      <Link to="/logout">logout page</Link>
      <TopNav.Section>
        <TopNav.Item href="https://excuses.com" fontWeight="semibold">
          <Image src="https://picsum.photos/44/44" height="44px" />
        </TopNav.Item>
        <TopNav.Item navId="add-excuse">
          <Link to={routes.addExcuse}>Add Excuse</Link>
        </TopNav.Item>
        <TopNav.Item navId="my-excuses">
          <Link to={routes.myExcuses}>My Excuses</Link>
        </TopNav.Item>
      </TopNav.Section>
      <TopNav.Section marginRight="major-2">
       { !isLoggedIn && 
        <>
          <TopNav.Item>
            <Button variant="ghost" palette="primary" onClick={() => history.push(routes.signup)}>
              Sign up
            </Button>
          </TopNav.Item>
          <TopNav.Item>
            <Button palette="primary" onClick={() => history.push(routes.login)}>
              Login
            </Button>
          </TopNav.Item> 
        </> }
       { isLoggedIn && 
        <Box alignY="center">
          <DropdownMenu
            menu={
              <>
                <DropdownMenu.Item>
                  link to home ? idk
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <LogoutButton />
                </DropdownMenu.Item>
              </>
            }
          >
            <Button>
              <Icon aria-label="Main menu" icon={faBars} type="font-awesome" />
            </Button>
          </DropdownMenu>
        </Box>}
      </TopNav.Section>
    </TopNav>
  );
}

