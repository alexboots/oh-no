import { HttpLink, ApolloLink, from } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

export const httpLink = new HttpLink({ uri:  `${process.env.REACT_APP_GRAPHQL_URL}` });

const linkError = onError(({ graphQLErrors, networkError }) => {
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
  const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${localStorage.getItem('token')}` : "",
    }
  });

  return forward(operation);
});

const link = from([linkError, authMiddleware, httpLink ])
export { link };

