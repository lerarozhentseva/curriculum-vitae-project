import React, { FC, useEffect, useState } from 'react';
import { DocumentNode, useLazyQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Paper, Grid, Typography, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import { ILoginResult, ISignupResult } from '../../../../graphql/auth/IAuthResult';
import { LoginQuery } from '../../../../graphql/auth/query';
import { signupMutation } from '../../../../graphql/auth/mutation';
import { authService } from '../../../../graphql/auth/authService';
import InputTextField from '../../../../components/Input/InputTextField';
import MainAuthButton from '../../../../components/Button/MainAuthButton';
import { routes } from '../../../../route/routeConstants';
import NotificationAlert from '../NotificationAlert/NotificationAlert';

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

  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { title, text, buttonText } = formType;

  const [login] = useLazyQuery<ILoginResult>(LoginQuery);
  const [signup] = useMutation<ISignupResult>(signupMutation);

  useEffect(() => {
    let timeoutId: number;
    if (serverError) {
      timeoutId = window.setTimeout(() => {
        setServerError(false);
      }, 3000);
    }

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [serverError]);

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

    try {
      setLoading(true);
      if (queryAuth === LoginQuery) {
        const { data } = await login({ variables: { email, password } });
        if (data) {
          authService.addUserToStorage(data.login.user, data.login.access_token);
          navigate(`/${routes.EMPLOYEES}`);
        }
      } else if (queryAuth === signupMutation) {
        const { data } = await signup({ variables: { email, password } });
        if (data) {
          authService.addUserToStorage(data.signup.user, data.signup.access_token);
          navigate(`/${routes.EMPLOYEES}`);
        }
      }
    } catch (err) {
      if ((err as Error).message.startsWith('duplicate key value violates unique constraint')) {
        setServerError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ width: '500px', height: '410px', m: '100px auto' }}>
      <Grid
        container
        direction="column"
        sx={{ alignItems: 'center', p: 2, justifyContent: 'center' }}
      >
        <Typography sx={{ mt: 2 }} variant="h4">
          {title}
        </Typography>
        <Typography sx={{ mt: 2 }}>{text}</Typography>
        <form style={{ width: '100%' }} onSubmit={onSubmit}>
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
            sx={{ mb: '30px' }}
            inputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={showPassword}>
                  {hidePassword ? <Visibility /> : <VisibilityOff />}
                </InputAdornment>
              )
            }}
          />
          {loading ? (
            <CircularProgress
              sx={{ width: '50px', display: 'block', m: '0 auto' }}
              color="inherit"
            />
          ) : (
            <MainAuthButton name={buttonText} />
          )}
        </form>
      </Grid>
      {serverError && (
        <NotificationAlert text="An account with such an email already exists!" severity="error" />
      )}
    </Paper>
  );
};

export default Form;
