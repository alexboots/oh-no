import React from 'react';
import { useQuery, gql } from '@apollo/client';

const LINKS = gql`
  query GetLinks {
    feed {
      id    
      url
      description
    }
  }
`;

export const Main: React.FC = ({ children }) => {
  
  const { loading, error, data } = useQuery(LINKS);

  console.log('data', data);

  return (
    <>
      { children }
    </>
  );
};
