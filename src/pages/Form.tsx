import React, { FC, useState } from 'react';
import { DocumentNode, useLazyQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Paper, Grid, Typography, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ILoginResult, ISignupResult } from '../graphql/auth/IAuthResult';
import { LoginQuery } from '../graphql/auth/query';
import { signupMutation } from '../graphql/auth/mutation';
import { authService } from '../graphql/auth/authService';
import InputTextField from '../components/Input/InputTextField';
import MainAuthButton from '../components/Button/MainAuthButton';

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
  const [hidePassword, setHidePassword] = useState(true);

  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const navigate = useNavigate();

  const { title, text, buttonText } = formType;

  const [login] = useLazyQuery<ILoginResult>(LoginQuery);
  const [signup] = useMutation<ISignupResult>(signupMutation);

  const showPassword = () => {
    setHidePassword(!hidePassword);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();

    if (password.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (!email && !password) {
      setEmailError(true);
      setPasswordError(true);
    }

    if (queryAuth === LoginQuery) {
      const { data } = await login({ variables: { email, password } });
      if (data) {
        authService.addUserToStorage(data.login.user, data.login.access_token);
        navigate('/employees');
      }
    } else if (queryAuth === signupMutation) {
      const { data } = await signup({ variables: { email, password } });
      if (data) {
        authService.addUserToStorage(data.signup.user, data.signup.access_token);
        navigate('/employees');
      }
    }
  };

  return (
    <Paper sx={{ width: '500px', height: '420px', m: '100px auto' }}>
      <Grid
        container
        direction="column"
        sx={{ alignItems: 'center', p: 2, justifyContent: 'center' }}
      >
        <Typography sx={{ mt: 2 }} variant="h4">
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{text}</Typography>
        <form onSubmit={onSubmit}>
          <InputTextField
            inputType="email"
            name="Email"
            placeholder="Enter email"
            value={email}
            error={emailError}
            helperText={emailError ? 'Email is required' : ''}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputTextField
            inputType={hidePassword ? 'password' : 'text'}
            name="Password"
            placeholder="Enter password"
            value={password}
            error={passwordError}
            helperText={passwordError ? 'Password must have at least 5 characters' : ''}
            onChange={(e) => setPassword(e.target.value)}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={showPassword}>
                  {hidePassword ? <Visibility /> : <VisibilityOff />}
                </InputAdornment>
              )
            }}
          />
          <MainAuthButton name={buttonText} />
        </form>
      </Grid>
    </Paper>
  );
};

export default Form;
