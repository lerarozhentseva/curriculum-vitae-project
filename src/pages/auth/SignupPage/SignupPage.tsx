import React, { FC } from 'react';
import { SIGNUP } from '@graphql/auth/mutation';
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
      <Form formType={SignUpFormType} queryAuth={SIGNUP} />;{' '}
    </>
  );
};

export default SignupPage;
