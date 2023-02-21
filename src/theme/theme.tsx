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
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 100px #fff inset'
          }
        }
      }
    }
  }
});

export default theme;
