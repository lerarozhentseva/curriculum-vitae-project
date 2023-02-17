import { styled, Box, IconButton, Toolbar } from '@mui/material';

export const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  margin: '0 auto'
});

export const StyledIconButton = styled(IconButton)({
  marginRight: 2
});

export const StyledToolbar = styled(Toolbar)({
  justifyContent: 'space-between'
});
