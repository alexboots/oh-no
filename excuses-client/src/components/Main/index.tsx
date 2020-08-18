import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Redirect } from "react-router-dom";
import { routes } from 'components/Routes'

import { LoginSignup } from 'components/LoginSignup';
import { getLoggedInStatus } from 'helpers/isLoggedIn';

const LINKS = gql`
  query GetLinks {
    feed {
      id    
      url
      description
    }
  }
`;

export const Main = () => {
  const { loading, error, data } = useQuery(LINKS);

  const isLoggedIn = getLoggedInStatus();
  if(!isLoggedIn) {
    return (<Redirect to={routes.login} />)
  }

  return (
    <>
      hi welcome.
      excuses blah blah yada yada.


    </>
  );
};
