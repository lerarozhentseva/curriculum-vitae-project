import React, { FC } from 'react';
import { LoginQuery } from '@graphql/auth/LoginQuery';
import { LoginFormType } from '@authPages/utils/constants';
import Header from '@components/Header/Header';
import Form from '../components/Form/Form';

const LoginPage: FC = () => {
  return (
    <>
      <Header />
      <Form formType={LoginFormType} queryAuth={LoginQuery} />;
    </>
  );
};

export default LoginPage;
