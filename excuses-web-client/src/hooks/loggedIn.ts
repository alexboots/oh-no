import { useApolloClient } from '@apollo/client';
import { GET_IS_LOGGED_IN } from 'queries/client';
import { isLoggedIn } from 'apollo-config/typePolicies'
import { useHistory } from 'react-router-dom';

export const useSetAuthToken = () => {
  const history = useHistory();
  return (token: string) => {
    localStorage.setItem('token', token);
    isLoggedIn(true);
    history.push('/');
  }
};

export const useClearAuthToken = () => {
  const history = useHistory();
  return () => {
    localStorage.removeItem('token');
    isLoggedIn(false);
    history.push('/');
  } 
};

// Test please delete 
export const useTest = () => {
  const client = useApolloClient();
  console.log('useTest');
  return () => {
    return client.readQuery({
      query: GET_IS_LOGGED_IN,
    })
  }
}