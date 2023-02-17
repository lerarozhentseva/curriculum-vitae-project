import { Box, styled, Toolbar } from '@mui/material';

export const DrawerBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '260px'
});

export const DrawerToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main
}));
