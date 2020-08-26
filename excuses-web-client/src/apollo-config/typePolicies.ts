const typePolicies = {
  Query: {
    fields: {
      isLoggedIn: {
        read(loggedIn: boolean) {
          if(loggedIn) {
            // If the cache value is set by writeQuery, send updated cach item back back 
            return loggedIn;
          }
          return !!localStorage.getItem('token');
        }
      }
    }
  }
};

export { typePolicies };

