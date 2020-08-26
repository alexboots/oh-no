import React from 'react';
import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Provider as BumbagProvider } from 'bumbag';
import { Routes } from './components/Routes'
import { link } from './apollo-config/link';
import { typePolicies } from './apollo-config/typePolicies';

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_GRAPHQL_URL}`,
  link,
  cache: new InMemoryCache({ typePolicies }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BumbagProvider>
        <Routes />
      </BumbagProvider>
    </ApolloProvider>
  );
}

export default App;
