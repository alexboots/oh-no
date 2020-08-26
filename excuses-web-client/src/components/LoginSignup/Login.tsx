import React, { useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import { GET_IS_LOGGED_IN } from 'queries/shared';
import { EnterForm } from './EnterForm';
import { Container } from 'bumbag';
import { useSetAuthToken } from 'hooks/loggedIn';

export const Login = () => {
  const setAuthToken = useSetAuthToken();
  const [login,
    { data: response, loading, error }] = useMutation(LOGIN_USER,
    { onError: (error) => console.error(error) }
  );

  const { data } = useQuery(GET_IS_LOGGED_IN);
  const { isLoggedIn } = data;
  
  useEffect(() => {
    if(response?.login?.token && !error) {
      setAuthToken(response?.login?.token);
      // setIsLoggedIn(true);
    }
  }, [response]);

  const handleLogin = (data: { email: string, password: string }) => {
    const { email, password } = data;
    login({ variables: { email, password } });
    
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
