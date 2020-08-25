import React from 'react';
import './App.css';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Provider as BumbagProvider } from 'bumbag';
import { Routes } from './components/Routes'
import { link } from './apollo';

import { LoggedInProvider } from 'contexts/LoggedInContext';

const client = new ApolloClient({
  uri: `${process.env.REACT_APP_GRAPHQL_URL}`,
  link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BumbagProvider>
        <LoggedInProvider>
          <Routes />
        </LoggedInProvider>
      </BumbagProvider>
    </ApolloProvider>
  );
}

export default App;
