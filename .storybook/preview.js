import React from 'react';
import theme from '../src/theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

export const decorators = [
  (Story) => (
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </Emotion10ThemeProvider>
  )
];
