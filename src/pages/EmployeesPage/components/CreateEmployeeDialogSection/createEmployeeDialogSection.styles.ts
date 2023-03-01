import { Box, DialogContentText, styled } from '@mui/material';

export const CreateEmployeeDialogSectionBox = styled(Box)(({ theme }) => ({
  width: '80%',
  padding: '10px',
  margin: '20px auto',
  border: `0.5px solid ${theme.palette.primary.main}`
}));

export const CreateEmployeeDialogSectionHeading = styled(DialogContentText)(({ theme }) => ({
  width: 'max-content',
  marginTop: '-22px',
  marginLeft: '30px',
  backgroundColor: theme.palette.background.paper
}));
