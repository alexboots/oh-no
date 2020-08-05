import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './App.css';
import { httpLink, authMiddleware } from './apollo';
import { Homepage } from './Homepage';
import { link } from './apollo';

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_GRAPHQL_URL}`,
  link,
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Homepage />
    </ApolloProvider>
  );
}

export default App;
 