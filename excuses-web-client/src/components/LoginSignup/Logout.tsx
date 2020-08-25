import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Card } from 'bumbag';

import { clearAuthToken } from 'helpers/isLoggedIn';
import { useLoggedInContext } from 'contexts/LoggedInContext';

export const LogoutButton = () => {
  const { setIsLoggedIn } = useLoggedInContext();

  const logout = () => {
    clearAuthToken();
    setIsLoggedIn(false);
  };
  
  return(
    <Button onClick={() => logout()} marginX="sm">
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
