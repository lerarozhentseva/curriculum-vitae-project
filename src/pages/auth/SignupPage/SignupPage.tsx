import React, { FC } from 'react';
import { signupMutation } from '../../../graphql/auth/mutation';
import Form from '../components/Form/Form';
import Header from '../../../components/Header/Header';

export const SignUpFormType = {
  title: 'Registration',
  text: 'Hello again! Sign up to continue.',
  buttonText: 'Sign Up'
};

const SignupPage: FC = () => {
  return (
    <>
      <Header />
      <Form formType={SignUpFormType} queryAuth={signupMutation} />;{' '}
    </>
  );
};

export default SignupPage;
