import React from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Container, Button, Card } from 'bumbag';
import { GET_IS_LOGGED_IN } from 'queries/client';
import { useClearAuthToken } from 'hooks/loggedIn';

export const LogoutButton = () => {
  const { data } = useQuery(GET_IS_LOGGED_IN);
  const clearAuthToken = useClearAuthToken();
  const logout = () => clearAuthToken();

  return(
    <Button onClick={() => logout()} marginX="sm" marginY="sm" size="small">
      Log Out
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
