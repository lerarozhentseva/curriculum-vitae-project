import React from 'react';
import { ThemeProvider } from '@mui/material';
import AppButton from '../components/Button/AppButton';
import AppTabs from '../components/Tab/AppTabs';
import theme from '../theme/theme';
import '../index.css';

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}></ThemeProvider>
    </>
  );
};
