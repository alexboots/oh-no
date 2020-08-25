import React from 'react';
import { ApolloError } from "@apollo/client";
import { useHistory, useLocation } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Text,
  Card,
  Group,
  InputField,
  Button,
  Alert,
  styled,
  space,
  AlertProps,
  ButtonProps,
  InputFieldProps
} from 'bumbag';

import { routes } from 'components/Routes';

type FormValues = {
  email: string;
  password: string;
};

export const EnterForm = ({
  onSubmit,
  submitError,
  loading,
}: {
  onSubmit: SubmitHandler<FormValues>,
  submitError: ApolloError | undefined,
  loading: boolean,
}) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { register, handleSubmit, watch, errors } = useForm();

  console.log("errors", errors)
  console.log("watch('email')", watch("email"))
  console.log("watch('password')", watch("password"))
  // NEED TO handle input errors for not an email and too short of a password

  // <Input state="danger" />
  // <Input state="success" />
  // <Input state="warning" />
  // <Input state="primary" />

  return(
    <Card alignX="center" marginY="xl">
      { submitError && 
          <AlertLoginSignup title="An error occurred" type="danger">
            {submitError.toString()}
          </AlertLoginSignup>
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <Group>
          <LoginInputField
            inputRef={register}
            type="Email"
            name="email"
            placeholder="your@email.com"
            label="email"
            
            isRequired
            autoFocus
          />
          <LoginInputField
            inputRef={register}
            type="password"
            name="password"
            placeholder="Password"
            label="password"
            minLength={6}
            isRequired
          />
          <SubmitButton isLoading={loading} type="submit">Login</SubmitButton>
        </Group>
        <DivToggleSignup>
          <Text use="sub">
            { pathname === '/login' && 
              <>
                Don't have an account?
                <Button variant="link" onClick={() => history.push(routes.signup)}>
                  Sign up
                </Button>
              </> }
            { pathname === '/signup' && 
              <>
                Have an account?
                <Button variant="link" onClick={() => history.push(routes.login)}>
                  Login
                </Button>
              </> }
          </Text>
        </DivToggleSignup>
      </form>
    </Card>
  );
};

const LoginInputField = styled(InputField)<InputFieldProps>`
  input {
    border-radius: 0px;
  }
`;

const SubmitButton = styled(Button)<ButtonProps>`
  margin-top: 1.5rem;
  width: ${space('2xl')}rem;
`;

const DivToggleSignup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
`;

const AlertLoginSignup = styled(Alert)<AlertProps>`
  margin-bottom: 1rem;
`;
