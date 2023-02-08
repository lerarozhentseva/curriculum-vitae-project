import React, { FC } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../graphql/auth/authService';
import { ISignupResult } from '../../graphql/auth/IAuthResult';
import { signupMutation } from '../../graphql/auth/mutation';
import { IInput } from '../../graphql/auth/IInput';
import Form from '../Form';

export const SignUpFormType = {
  title: 'Registration',
  text: 'Hello again! Sign up to continue.',
  buttonText: 'Sign Up'
};

const SignupPage: FC = () => {
  const [signup, { loading }] = useMutation<ISignupResult>(signupMutation);
  const navigate = useNavigate();

  const onSubmit = async (input: IInput) => {
    const { data } = await signup({ variables: input });
    if (data) {
      authService.addUserToStorage(data.signup.user, data.signup.access_token);
      navigate('/employees');
    }
  };

  return <Form formType={SignUpFormType} loading={loading} onSubmit={onSubmit} />;
};

export default SignupPage;
