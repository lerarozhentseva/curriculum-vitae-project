import { Box, styled } from '@mui/material';

export const StyledBox = styled(Box)({
  width: '700px',
  margin: '20px auto'
});

export const StyledNotificationBox = styled(Box)({
  display: 'block',
  position: 'fixed',
  right: '10px',
  top: '90px',
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out'
});
