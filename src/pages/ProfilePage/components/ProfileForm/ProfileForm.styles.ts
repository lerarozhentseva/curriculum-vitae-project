import { Box, styled } from '@mui/material';

export const StyledFormBox = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr 1fr min-content',
  gap: '30px'
});
