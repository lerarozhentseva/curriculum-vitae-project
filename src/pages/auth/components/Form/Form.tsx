import React, { FC, useEffect, useState } from 'react';
import { DocumentNode, useLazyQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Typography, InputAdornment, CircularProgress, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ILoginResult, ISignupResult } from '@graphql/auth/IAuthResult';
import { LoginQuery } from '@graphql/auth/query';
import { SIGNUP } from '@graphql/auth/mutation';
import { authService } from '@graphql/auth/authService';
import InputTextField from '@components/Input/InputTextField';
import MainAuthButton from '@components/Button/MainAuthButton';
import { routes } from '@route/routeConstants';
import { PaperContainer } from '@authPages/components/Form/form.styles';
import NotificationAlert from '../NotificationAlert/NotificationAlert';

interface IFormErrors {
  email: string;
  password: string;
}

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

  const [serverError, setServerError] = useState(false);
  const [formErrors, setFormErrors] = useState<IFormErrors>({ email: '', password: '' });
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const navigate = useNavigate();

  const { title, text, buttonText } = formType;

  const [login, { loading: loginLoading }] = useLazyQuery<ILoginResult>(LoginQuery);
  const [signup, { loading: signupLoading }] = useMutation<ISignupResult>(SIGNUP);
  const loading = queryAuth === LoginQuery ? loginLoading : signupLoading;

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

  const validationErrors: IFormErrors = { email: '', password: '' };
  const validate = () => {
    if (!email) {
      validationErrors.email = 'Email is required';
      setEmailError(true);
    }

    if (!password || password.length < 6) {
      validationErrors.password = 'Password is required and  must have at least 6 characters';
      setPassError(true);
    }

    if (validationErrors.email || validationErrors.password) {
      setFormErrors(validationErrors);
      setEmailError(true);
      setPassError(true);
      return;
    }
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    validate();
    try {
      if (queryAuth === LoginQuery) {
        const { data } = await login({ variables: { email, password } });
        if (data) {
          authService.addUserToStorage(data.login.user, data.login.access_token);
          navigate(`/${routes.EMPLOYEES}`);
        }
      } else if (queryAuth === SIGNUP) {
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
    }
  };

  return (
    <PaperContainer>
      <Grid
        container
        direction="column"
        sx={{
          alignItems: 'center',
          padding: 2,
          justifyContent: 'center'
        }}
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
            helperText={formErrors.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputTextField
            inputType={hidePassword ? 'password' : 'text'}
            name="Password"
            placeholder="Enter password"
            value={password}
            error={passError}
            helperText={formErrors.password}
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
    </PaperContainer>
  );
};

export default Form;
