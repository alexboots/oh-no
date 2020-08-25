import React, { useState } from 'react';
import { getLoggedInStatus } from 'helpers/isLoggedIn';

type LoggedInContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

// For explanation for ! after undefined, see https://www.carlrippon.com/react-context-with-typescript-p4/
export const LoggedInContext = React.createContext<LoggedInContextType>(undefined!);
export const useLoggedInContext = () => React.useContext(LoggedInContext);

export const LoggedInProvider: React.FC = ({ children }) => {
  const loggedInStatus = getLoggedInStatus();
  const [isLoggedIn, setIsLoggedIn] = useState(loggedInStatus);
  
  return(
    <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      { children }
    </LoggedInContext.Provider>
  );
}