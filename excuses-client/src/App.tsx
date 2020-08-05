import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './App.css';
import { Homepage } from './Homepage';

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_GRAPHQL_URL}`,
  cache: new InMemoryCache()
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Homepage />
    </ApolloProvider>
  );
}

export default App;
 