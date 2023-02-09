import React, { FC } from 'react';
import { signupMutation } from '../../graphql/auth/mutation';
import Form from '../Form';

export const SignUpFormType = {
  title: 'Registration',
  text: 'Hello again! Sign up to continue.',
  buttonText: 'Sign Up'
};

const SignupPage: FC = () => {
  return <Form formType={SignUpFormType} queryAuth={signupMutation} />;
};

export default SignupPage;
