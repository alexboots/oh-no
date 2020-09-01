import React, { useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import { GET_IS_LOGGED_IN } from 'queries/client';
import { EnterForm } from './EnterForm';
import { Container } from 'bumbag';
import { useSetAuthToken } from 'hooks/loggedIn';
import { AlreadySignedIn } from './AlreadySignedIn';

export const Login = () => {
  const setAuthToken = useSetAuthToken();
  const [login,
    { data: response, loading, error }] = useMutation(LOGIN_USER,
    { onError: (error) => console.error(error) },
  );

  useEffect(() => {
    if(response?.login?.token && !error) {
      setAuthToken(response?.login?.token);
    }
  }, [response]);

  const handleLogin = (data: { email: string, password: string }) => {
    const { email, password } = data;
    login({ variables: { email, password } });
  };

  const { data } = useQuery(GET_IS_LOGGED_IN);
  if(data.isLoggedIn) {
    return <AlreadySignedIn />
  }

  return (
    <Container>
      <EnterForm onSubmit={handleLogin} submitError={error} loading={loading} submitButtonText="Login" />
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
        links {
          url
          description
        }
      }
    }
  }
`;
