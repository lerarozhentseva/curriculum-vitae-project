import React, { FC } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../graphql/auth/authService';
import { ILoginResult } from '../../graphql/auth/IAuthResult';
import { LOGIN } from '../../graphql/auth/query';
import { IInput } from '../../graphql/auth/IInput';
import Form from '../Form';

export const LoginFormType = {
  title: 'Welcome back!',
  text: 'Hello again! Sign in to continue.',
  buttonText: 'Sign In'
};

const LoginPage: FC = () => {
  const [login, { loading }] = useLazyQuery<ILoginResult>(LOGIN);
  const navigate = useNavigate();

  const onSubmit = async (input: IInput) => {
    const { data } = await login({ variables: input });
    if (data) {
      authService.addUserToStorage(data.login.user, data.login.access_token);
      navigate('/employees');
    }
  };

  return <Form formType={LoginFormType} loading={loading} onSubmit={onSubmit} />;
};

export default LoginPage;
