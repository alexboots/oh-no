import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Text, Container, Card, Group, InputField, Button, Alert, styled, space } from 'bumbag';
import { getLoggedInStatus, clearAuthToken, setAuthToken, getHasUserLoggedinBefore } from 'helpers/isLoggedIn';

export const LoginSignup = () => {
  const getIsLoggedIn = getLoggedInStatus();
  const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn);
  const userHasLoggedInBefore = getHasUserLoggedinBefore();
  const [showSignup, setShowSignup] = useState(userHasLoggedInBefore);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login,
    { data: loginResponse, loading: loginLoading, error: loginError }] = useMutation(LOGIN_USER,
    { onError: (error) => console.error(error) }
  );

  const [signup,
    { data: signupResponse, loading: signupLoading, error: signupError }] = useMutation(SIGNUP_USER, 
    { onError: (error) => console.error(error) }
  );

  useEffect(() => {
    if(loginResponse?.login?.token) {
      setAuthToken(loginResponse?.login?.token);
      setIsLoggedIn(true);
    }

    if(signupResponse?.token) {
      setAuthToken(signupResponse?.token);
      setIsLoggedIn(true);
    }
  }, [loginResponse, signupResponse]);

  const handleLogin = () => {
    login({ variables: { email, password } });
  };

  const handleSignup = () => {
    signup({ variables: { email, password } });
  };

  const logout = () => {
    clearAuthToken();
    setIsLoggedIn(false);
  };

  if(isLoggedIn) {
    return <Button onClick={() => logout()}>Log Out</Button>
  };

  return (
    <Container>
      <Card alignX="center">
        { loginError && 
            <AlertLoginSignup title="An error occurred" type="danger">
              {loginError.toString()}
            </AlertLoginSignup>
        }
        { signupError && 
            <AlertLoginSignup title="An error occurred" type="danger">
              {signupError.toString()}
            </AlertLoginSignup>
        }
        <form onSubmit={
          (e) => {
            e.preventDefault();
          }
        }>
          <Group>
            <LoginInputField
              value={email}
              onChange={ (e) => setEmail(e.target.value) }
              type="Email"
              placeholder="your@email.com"
              label="email"
            />
            <LoginInputField
              value={password}
              onChange={ (e) => setPassword(e.target.value) }
              type="password"
              placeholder="Password"
              label="password"
            />
            
            { showSignup ?
              <LoginButton onClick={handleLogin} isLoading={loginLoading} type="submit">Login</LoginButton> :
              <LoginButton onClick={handleSignup} isLoading={signupLoading} type="submit">Sign up</LoginButton> 
            }
            
          </Group>
          <DivToggleSignup>
            <Text use="sub">
              { showSignup ?
                  <> Don't have an account? <Button variant="link" onClick={() => setShowSignup(false)}>Sign up</Button></> :
                  <> Have an account? <Button variant="link" onClick={() => setShowSignup(true)}>Login</Button></>
              }
            </Text>
          </DivToggleSignup>
        </form>
      </Card>
    </Container>
  );
};

const LoginInputField = styled(InputField)`
  input {
    border-radius: 0px;
  }
`;

const LoginButton = styled(Button)`
  margin-top: 1.5rem;
  width: ${space('2xl')}rem;
`;

const DivToggleSignup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
`;

const AlertLoginSignup = styled(Alert)`
  margin-bottom: 1rem;
`;

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(
      email: $email
      password: $password
    ) {
      token
      user {
        name
        id
        links {
          url
          description
        }
      }
    }
  }
`;


const SIGNUP_USER = gql`
  mutation SignupUser($email: String!, $password: String!) {
    signup(
      email: $email
      password: $password
    ) {
      token
      user {
        name
        id
      }
    }
  }
`;
