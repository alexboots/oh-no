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

import { useSetFieldErrors } from 'hooks/field-errors';
import { routes } from 'components/Routes';

export const EnterForm = ({
  onSubmit,
  submitButtonText,
  submitError,
  loading,
}: {
  onSubmit: SubmitHandler<IFormValues>,
  submitButtonText: string,
  submitError: ApolloError | undefined,
  loading: boolean,
}) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { register, handleSubmit, watch, errors: validationErrors } = useForm<IFormValues>();
  const setFieldErrors = useSetFieldErrors();

  const emailFieldErrors = setFieldErrors({
    validationErrors,
    fieldName: 'email',
    validationRules: [
      { type: "required", message: "email is required" },
    ],
  });

  const passwordFieldErrors = setFieldErrors({
    validationErrors,
    fieldName: 'password',
    validationRules: [
      { type: "required", message: "password is required" },
      { type: "minLength", message: "password 6 characters long" },
    ],
  });

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
            inputRef={register({ required: true })}
            type="Email"
            name="email"
            placeholder="your@email.com"
            label="email"
            autoFocus
            validationText={ emailFieldErrors.text }
            state={ emailFieldErrors.state }
          />
          <LoginInputField
            inputRef={register({ required: true,  minLength: 6 })}
            type="password"
            name="password"
            placeholder="Password"
            label="password"
            validationText={ passwordFieldErrors.text }
            state={ passwordFieldErrors.state }
          />
          <SubmitButton isLoading={loading} type="submit">{ submitButtonText }</SubmitButton>
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

interface IFormValues {
  email: string;
  password: string;
};

const LoginInputField = styled(InputField)<InputFieldProps>`
  input {
    // border-radius: 0px;
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

