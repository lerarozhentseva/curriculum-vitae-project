import { Box, Dialog, styled, Button } from '@mui/material';

export const StyledDialog = styled(Dialog)({
  display: 'flex',
  flexDirection: 'column'
});

export const StyledDateBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '15px'
});

export const StyledBox = styled(Box)({
  marginTop: '20px',
  display: 'flex',
  justifyContent: 'flex-end'
});

export const StyledButton = styled(Button)({
  width: '150px',
  height: '30px'
});
