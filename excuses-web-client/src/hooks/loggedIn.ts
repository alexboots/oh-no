import { useApolloClient } from '@apollo/client';
import { GET_IS_LOGGED_IN } from 'queries/shared';

// Not actually hooks
export const getAuthToken = () => localStorage.getItem('token');

// Hooks
export const useSetAuthToken = () => {
  const client = useApolloClient();
  return (token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userHasLoggedinBefore', JSON.stringify(true));
    client.writeQuery({
      query: GET_IS_LOGGED_IN,
      data: {
        isLoggedIn: true,
      },
    });
  }
};


export const useClearAuthToken = () => {
  const client = useApolloClient();
  return () => {
    localStorage.removeItem('token');
    client.writeQuery({
      query: GET_IS_LOGGED_IN,
      data: {
        isLoggedIn: false,
      },
    })
  } 
};
