import React, { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

import { EnterForm } from './EnterForm';
import { Container } from 'bumbag';
import { setAuthToken } from 'helpers/isLoggedIn';
import { useLoggedInContext } from 'contexts/LoggedInContext';

export const Login = () => {
  const { setIsLoggedIn } = useLoggedInContext();
  const [login,
    { data: response, loading, error }] = useMutation(LOGIN_USER,
    { onError: (error) => console.error(error) }
  );
  
  useEffect(() => {
    if(response?.login?.token && !error) {
      setAuthToken(response?.login?.token);
      setIsLoggedIn(true);
    }
  }, [response]);

  const handleLogin = (data: { email: string, password: string }) => {
    const { email, password } = data;
    login({ variables: { email, password } });
    // Should await we try / catch here instead of onError in useMutation?
  };

  return (
    <Container>
      <EnterForm onSubmit={handleLogin} submitError={error} loading={loading} />
    </Container>
  );
};

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(
      email: $email
      password: $password
    ) {
      token
      user {
        name
        id
        links {
          url
          description
        }
      }
    }
  }
`;
