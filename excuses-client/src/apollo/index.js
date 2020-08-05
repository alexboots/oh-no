import { HttpLink, ApolloLink, from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";


export const httpLink = new HttpLink({ uri:  `${process.env.REACT_APP_GRAPHQL_URL}` });

export const logOperation = new ApolloLink((operation, forward) => {
  console.log("operation", operation)
  return forward(operation);
});

const linkError = onError(({ graphQLErrors, networkError }) => {
  console.log('IN LINK ERROR')
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null,
    }
  });

  return forward(operation);
});

const link = from([linkError, logOperation, authMiddleware, httpLink ])
export { link };

