import React, { useEffect } from 'react';
import { useLocalStorage } from '../hooks'
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
      name
      id
      links {
        url
        description
      }
    }
  }
`;

export const Homepage = () => {
  const { loading, error, data } = useQuery(LINKS);
  const [login, { data: loggedIn }] = useMutation(LOGIN_USER);

  const [token, setToken] = useLocalStorage('token', '');
  // if(!token) {

  // }

  console.log("Homepage -> data", data)

  const handleLogin = () => {
    login()
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