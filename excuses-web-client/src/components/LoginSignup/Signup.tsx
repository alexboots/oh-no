import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Container } from 'bumbag';

import { GET_IS_LOGGED_IN } from 'queries/client';
import { useSetAuthToken } from 'hooks/loggedIn';
import { EnterForm } from './EnterForm';
import { AlreadySignedIn } from './AlreadySignedIn';

export const Signup = () => {
  const setAuthToken = useSetAuthToken();

  const [signup, { data: response, loading, error } ]= useMutation(SIGNUP_USER, 
    { onError: (error) => console.error(error)}
  );

  useEffect(() => {
    if(response?.signup?.token && !error) {
      setAuthToken(response?.signup?.token);
    }
  }, [response]);

  const handleSignup = (data: { email: string, password: string }) => {
    const { email, password } = data;
    signup({ variables: { email, password }});
  }


  const { data } = useQuery(GET_IS_LOGGED_IN);
  if(data.isLoggedIn) {
    return <AlreadySignedIn />
  }

  return(
    <Container>
      <EnterForm onSubmit={handleSignup} submitError={error} loading={loading} submitButtonText="Sign up" />
    </Container>
  );
};

const SIGNUP_USER = gql`
  mutation SignupUser($email: String!, $password: String!) {
    signup(
      email: $email
      password: $password
    ) {
      token
    }
  }
`;
