import React, { FC, useState } from 'react';
import { DocumentNode, useLazyQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ILoginResult, ISignupResult } from '../graphql/auth/IAuthResult';
import { LoginQuery } from '../graphql/auth/query';
import { signupMutation } from '../graphql/auth/mutation';
import { authService } from '../graphql/auth/authService';

interface FormProps {
  formType: {
    title: string;
    text: string;
    buttonText: string;
  };
  queryAuth: DocumentNode;
}

const Form: FC<FormProps> = ({ formType, queryAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [hiddenPassword, setHiddenPassword] = useState(true);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const { title, text, buttonText } = formType;
  //const [loading, setLoading] = useState(false);

  const [login] = useLazyQuery<ILoginResult>(LoginQuery);
  const [signup] = useMutation<ISignupResult>(signupMutation);

  // const showPassword = () => {
  //   setHiddenPassword(!hiddenPassword);
  // };

  const validate = () => {
    const input = { email, password };
    if (input.password.length < 6) {
      setErrors({ email: '', password: 'Password must have at least 6 characters.' });
    }
    if (!input.email) setErrors({ email: 'Email is required.', password: '' });
    if (!input.password) setErrors({ email: '', password: 'Password is required.' });
    if (!input.email && !input.password)
      setErrors({ email: 'Email is required.', password: 'Password is required.' });
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (validate()) return;
    if (queryAuth === LoginQuery) {
      const { data } = await login({ variables: { email, password } });
      //setLoading(true);
      if (data) {
        authService.addUserToStorage(data.login.user, data.login.access_token);
        navigate('/employees');
      }
    } else if (queryAuth === signupMutation) {
      const { data } = await signup({ variables: { email, password } });
      //setLoading(true);
      if (data) {
        authService.addUserToStorage(data.signup.user, data.signup.access_token);
        navigate('/employees');
      }
    }
  };

  return (
    <div style={{ width: '500px', height: '420px', margin: '100px auto' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h4 style={{ marginTop: '20px' }}>{title}</h4>
        <p style={{ marginTop: '20px' }}>{text}</p>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
          onSubmit={onSubmit}
        >
          <input
            placeholder="Enter email"
            style={{ marginTop: '20px' }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email}</p>}
          <input
            placeholder="Enter password"
            style={{ marginTop: '20px' }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
          <button type="submit" style={{ marginTop: '30px' }}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
