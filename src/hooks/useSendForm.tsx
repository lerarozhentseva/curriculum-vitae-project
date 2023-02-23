import React, { useEffect, useState } from 'react';
import { DocumentNode, useLazyQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { IFormErrors, IFormState, LoginOrSignupResult } from '@authPages/authUtils/interface';
import { ILoginResult, ISignupResult } from '@graphql/auth/IAuthResult';
import { LoginQuery } from '@graphql/auth/LoginQuery';
import { RegisterMutation } from '@graphql/auth/RegisterMutation';
import { authService } from '@graphql/auth/authService';
import { routes } from '@route/routeConstants';

const useSendForm = (queryAuth: DocumentNode) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [formState, setFormState] = useState<IFormState>({
    serverError: false,
    emailError: false,
    passError: false,
    formErrors: { email: '', password: '' }
  });
  const navigate = useNavigate();

  const [login, { loading: loginLoading }] = useLazyQuery<ILoginResult>(LoginQuery);
  const [signup, { loading: signupLoading }] = useMutation<ISignupResult>(RegisterMutation);
  const loading = queryAuth === LoginQuery ? loginLoading : signupLoading;

  useEffect(() => {
    if (formState.serverError) {
      const timeoutId = window.setTimeout(() => {
        setFormState({ ...formState, serverError: false });
      }, 3000);
      return () => window.clearTimeout(timeoutId);
    }
  }, [formState.serverError]);

  const showPassword = () => {
    setHidePassword(!hidePassword);
  };

  const validate = () => {
    const validationErrors: IFormErrors = { email: '', password: '' };
    let emailError = false;
    let passError = false;

    if (!email) {
      validationErrors.email = 'Email is required';
      emailError = true;
    }

    if (!password || password.length < 6) {
      validationErrors.password = 'Password is required and must have at least 6 characters';
      passError = true;
    }

    setFormState({
      ...formState,
      emailError,
      passError,
      formErrors: validationErrors
    });

    return !emailError && !passError;
  };

  const isLoginResult = (result: LoginOrSignupResult): result is ILoginResult => {
    return 'login' in result;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    validate();
    try {
      const { data } = await (queryAuth === LoginQuery
        ? login({ variables: { email, password } })
        : signup({ variables: { email, password } }));
      if (data) {
        const result = data as LoginOrSignupResult;
        const user = isLoginResult(result) ? result.login?.user : result.signup?.user;
        const accessToken = isLoginResult(result)
          ? result.login?.access_token
          : result.signup?.access_token;
        if (user && accessToken) {
          authService.addUserToStorage(user, accessToken);
          navigate(`/${routes.EMPLOYEES}`);
        }
      }
    } catch (err) {
      if ((err as Error).message.startsWith('duplicate key value violates unique constraint')) {
        setFormState({ ...formState, serverError: true });
      }
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    hidePassword,
    setHidePassword,
    formState,
    loading,
    onSubmit
  };
};

export default useSendForm;
