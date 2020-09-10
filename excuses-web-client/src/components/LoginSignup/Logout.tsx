import React from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Box, Container, Button, Card, Icon } from 'bumbag';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { GET_IS_LOGGED_IN } from 'queries/client';
import { useClearAuthToken } from 'hooks/loggedIn';

export const LogoutButton = () => {
  const { data } = useQuery(GET_IS_LOGGED_IN);
  const clearAuthToken = useClearAuthToken();
  const logout = () => clearAuthToken();

  return(
    <Button onClick={() => logout()} marginX="sm" marginY="sm" size="small">
      Log Out
      <Box width="1.6rem">
        <Icon aria-label="Logout" icon={faSignOutAlt} type="font-awesome" />
      </Box>
    </Button>
  );
};

export const LogoutPage = () => {  
  return (
    <Container>
      <Card alignX="center" marginY="xl">
        <span>You are already signed in. You can <Link to="/">Go Home</Link> or </span>
        <LogoutButton />
      </Card>
    </Container>
  );
};
