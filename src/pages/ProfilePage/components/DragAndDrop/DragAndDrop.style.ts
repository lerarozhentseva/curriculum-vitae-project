import { Box, styled } from '@mui/material';

export const StyledDragAndDropBox = styled(Box)(({ theme }) => ({
  borderRadius: '10px',
  padding: '10px 5px',
  border: `2px dotted ${theme.palette.secondary.main}`
}));
