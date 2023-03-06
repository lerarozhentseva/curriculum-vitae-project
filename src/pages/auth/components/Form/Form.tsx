import React, { FC } from 'react';
import { InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import InputTextField from '@components/Input/InputTextField';
import MainAuthButton from '@components/Button/MainAuthButton';
import {
  PaperContainer,
  StyledGridContainer,
  StyledTypography,
  StyledCircularProgress
} from '@authPages/components/Form/form.styles';
import { FormProps } from '@authPages/authUtils/interface';
import { useSendForm } from '@hooks/index';
import NotificationAlert from '@components/NotificationAlert/NotificationAlert';

const Form: FC<FormProps> = ({ formType, queryAuth }) => {
  const { title, text, buttonText } = formType;
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    hidePassword,
    formState,
    onSubmit,
    loading
  } = useSendForm(queryAuth);

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
        <NotificationAlert
          text="An account with such an email already exists!"
          severity="error"
          sx={{ width: '425px' }}
        />
      )}
    </PaperContainer>
  );
};

export default Form;
