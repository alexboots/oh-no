import { makeVar } from '@apollo/client';

// Move to reactive-variable.ts or somewhere?
export const isLoggedIn = makeVar(!!localStorage.getItem('token'));

const typePolicies = {
  Query: {
    fields: {
      isLoggedIn: {
        read() {
          return isLoggedIn();
        }
      }
    }
  }
};

export { typePolicies };
