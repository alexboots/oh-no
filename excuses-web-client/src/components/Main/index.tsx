import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { PageWithHeader } from 'bumbag';

import { Header } from './Header';

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

  return (
    <PageWithHeader
      header={<Header />}
      border="default"
    >
      { children }
    </PageWithHeader>
  );
};
