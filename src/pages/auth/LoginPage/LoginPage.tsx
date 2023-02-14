import React, { FC } from 'react';
import { LoginQuery } from '../../../graphql/auth/query';
import Form from '../components/Form/Form';
import Header from '../../../components/Header/Header';

export const LoginFormType = {
  title: 'Welcome back!',
  text: 'Hello again! Sign in to continue.',
  buttonText: 'Sign In'
};

const LoginPage: FC = () => {
  return (
    <>
      <Header />
      <Form formType={LoginFormType} queryAuth={LoginQuery} />;
    </>
  );
};

export default LoginPage;
