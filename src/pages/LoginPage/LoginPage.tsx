import React, { FC } from 'react';
import { LoginQuery } from '../../graphql/auth/query';
import Form from '../Form';

export const LoginFormType = {
  title: 'Welcome back!',
  text: 'Hello again! Sign in to continue.',
  buttonText: 'Sign In'
};

const LoginPage: FC = () => {
  return <Form formType={LoginFormType} queryAuth={LoginQuery} />;
};

export default LoginPage;
