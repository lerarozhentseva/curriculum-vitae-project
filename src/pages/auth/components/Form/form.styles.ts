import { Grid, Paper, styled, Typography, CircularProgress } from '@mui/material';

export const PaperContainer = styled(Paper)({
  width: '500px',
  height: '450px',
  margin: '100px auto'
});

export const StyledGridContainer = styled(Grid)({
  alignItems: 'center',
  padding: '20px',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column'
});

export const StyledTypography = styled(Typography)({
  marginTop: 2
});

export const StyledCircularProgress = styled(CircularProgress)({
  width: '50px',
  display: 'block',
  margin: '0 auto'
});
