import React from 'react';
import { ThemeProvider } from '@mui/material';
import theme from '../theme/theme';
import '../index.css';

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}></ThemeProvider>
    </>
  );
};
