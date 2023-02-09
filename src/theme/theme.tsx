import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e2e2e',
      contrastText: '#f5f5f7'
    },
    secondary: {
      main: '#c63031', //red
      contrastText: '#ffff'
    }
  },
  shape: {
    borderRadius: 0
  }
});

export default theme;
