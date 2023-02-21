import React, { FC } from 'react';
import { RegisterMutation } from '@graphql/auth/RegisterMutation';
import Header from '@components/Header/Header';
import Form from '../components/Form/Form';

export const SignUpFormType = {
  title: 'Registration',
  text: 'Hello again! Sign up to continue.',
  buttonText: 'Sign Up'
};

const SignupPage: FC = () => {
  return (
    <>
      <Header />
      <Form formType={SignUpFormType} queryAuth={RegisterMutation} />;{' '}
    </>
  );
};

export default SignupPage;
