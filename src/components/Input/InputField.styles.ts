import { TextField, styled } from '@mui/material';

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
    borderColor: '#c63031',
    borderWidth: '1px'
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: '#c63031'
  },
  '& fieldset': {
    outline: 'none',
    color: '#c63031',
    borderWidth: '1px'
  }
});
