import React, { FC } from 'react';
import { RegisterMutation } from '@graphql/auth/RegisterMutation';
import { SignUpFormType } from '@authPages/authUtils/constants';
import Header from '@components/Header/Header';
import Form from '../components/Form/Form';

const SignupPage: FC = () => {
  return (
    <>
      <Header />
      <Form formType={SignUpFormType} queryAuth={RegisterMutation} />;
    </>
  );
};

export default SignupPage;
