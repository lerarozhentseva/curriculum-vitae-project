import React, { FC, useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ILoginResult, ISignupResult } from '@graphql/auth/IAuthResult';
import { LoginQuery } from '@graphql/auth/LoginQuery';
import { RegisterMutation } from '@graphql/auth/RegisterMutation';
import { authService } from '@graphql/auth/authService';
import InputTextField from '@components/Input/InputTextField';
import MainAuthButton from '@components/Button/MainAuthButton';
import { routes } from '@route/routeConstants';
import {
  PaperContainer,
  StyledGridContainer,
  StyledTypography,
  StyledCircularProgress
} from '@authPages/components/Form/form.styles';
import {
  FormProps,
  IFormState,
  LoginOrSignupResult,
  IFormErrors
} from '@authPages/authUtils/interface';
import NotificationAlert from '../NotificationAlert/NotificationAlert';

const Form: FC<FormProps> = ({ formType, queryAuth }) => {
  const { title, text, buttonText } = formType;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [formState, setFormState] = useState<IFormState>({
    serverError: false,
    emailError: false,
    passError: false,
    formErrors: { email: '', password: '' }
  });
  const navigate = useNavigate();

  const [login, { loading: loginLoading }] = useLazyQuery<ILoginResult>(LoginQuery);
  const [signup, { loading: signupLoading }] = useMutation<ISignupResult>(RegisterMutation);
  const loading = queryAuth === LoginQuery ? loginLoading : signupLoading;

  useEffect(() => {
    if (formState.serverError) {
      const timeoutId = window.setTimeout(() => {
        setFormState({ ...formState, serverError: false });
      }, 3000);
      return () => window.clearTimeout(timeoutId);
    }
  }, [formState.serverError]);

  const showPassword = () => {
    setHidePassword(!hidePassword);
  };

  const validate = () => {
    const validationErrors: IFormErrors = { email: '', password: '' };
    let emailError = false;
    let passError = false;

    if (!email) {
      validationErrors.email = 'Email is required';
      emailError = true;
    }

    if (!password || password.length < 6) {
      validationErrors.password = 'Password is required and must have at least 6 characters';
      passError = true;
    }

    setFormState({
      ...formState,
      emailError,
      passError,
      formErrors: validationErrors
    });

    return !emailError && !passError;
  };

  const isLoginResult = (result: LoginOrSignupResult): result is ILoginResult => {
    return 'login' in result;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    validate();
    try {
      const { data } = await (queryAuth === LoginQuery
        ? login({ variables: { email, password } })
        : signup({ variables: { email, password } }));
      if (data) {
        const result = data as LoginOrSignupResult;
        const user = isLoginResult(result) ? result.login?.user : result.signup?.user;
        const accessToken = isLoginResult(result)
          ? result.login?.access_token
          : result.signup?.access_token;
        if (user && accessToken) {
          authService.addUserToStorage(user, accessToken);
          navigate(`/${routes.EMPLOYEES}`);
        }
      }
    } catch (err) {
      if ((err as Error).message.startsWith('duplicate key value violates unique constraint')) {
        setFormState({ ...formState, serverError: true });
      }
    }
  };

  return (
    <PaperContainer>
      <StyledGridContainer container>
        <StyledTypography variant="h4">{title}</StyledTypography>
        <StyledTypography>{text}</StyledTypography>
        <form style={{ width: '100%' }} onSubmit={onSubmit}>
          <InputTextField
            inputType="email"
            name="Email"
            placeholder="Enter email"
            value={email}
            error={formState.emailError}
            helperText={formState.formErrors.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputTextField
            inputType={hidePassword ? 'password' : 'text'}
            name="Password"
            placeholder="Enter password"
            value={password}
            error={formState.passError}
            helperText={formState.formErrors.password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
            <StyledCircularProgress color="inherit" />
          ) : (
            <MainAuthButton name={buttonText} />
          )}
        </form>
      </StyledGridContainer>
      {formState.serverError && (
        <NotificationAlert text="An account with such an email already exists!" severity="error" />
      )}
    </PaperContainer>
  );
};

export default Form;
