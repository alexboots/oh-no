import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const LINKS = gql`
  query GetLinks {
    feed {
      id    
      url
      description
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser {
    login(
      email: "alexhays@gell.com"
      password: "pass"
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

export const Homepage = () => {
  const { loading, error, data } = useQuery(LINKS);
  const [login, { data: loggedInResponse }] = useMutation(LOGIN_USER);
  const [loggedIn, setLoggedIn] = useState(false);
  const token = localStorage.getItem('token');
  
  console.log("Homepage -> loggedIn", loggedIn)

  if(!loggedIn && token) {
    setLoggedIn(true);
  } else if(!loggedIn && loggedInResponse?.login?.token) {
    localStorage.setItem('token', loggedInResponse.login.token);
    setLoggedIn(true);
  }

  const handleLogin = () => {
    login();
  };

  return (
    <div>
      homepage
      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};