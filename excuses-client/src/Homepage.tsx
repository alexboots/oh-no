import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const LINKS = gql`
  query {
    feed {
      id    
      url
      description
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginAndFetchLinks {
    login(
      email: "alexhays@gmail.com"
      password: "pass"
    ) {
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

  console.log("Homepage -> data", data)

  const handleLogin = () => {
    login()
  }
  return (
    <div>
      homepage
      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};