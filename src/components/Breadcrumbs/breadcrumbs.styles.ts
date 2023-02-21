import { styled, Typography, Box } from '@mui/material';

export const StyledLink = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  fontSize: '18px',
  ':hover': {
    cursor: 'pointer'
  }
})) as typeof Typography;

export const StyledBreadcrumbsBox = styled(Box)({
  width: '1000px',
  margin: '30px'
});
