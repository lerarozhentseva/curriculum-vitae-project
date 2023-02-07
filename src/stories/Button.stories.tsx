import React from 'react';
import AppButton from '../components/Button/AppButton';

export default {
  title: 'AppButton',
  component: AppButton
};

export const SignInBtn = () => <AppButton variant="contained">SIGN IN</AppButton>;
export const ResetPswrdBtn = () => <AppButton variant="text">RESET PASSWORD</AppButton>;
export const CreateEmployeeBtn = () => <AppButton variant="outlined">CREATE EMPLOYEE</AppButton>;
export const ConfirmBtn = () => (
  <AppButton variant="contained" disabled>
    BEER GO BRRR
  </AppButton>
);
