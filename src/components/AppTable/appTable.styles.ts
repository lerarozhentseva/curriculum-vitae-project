import { styled, TableContainer, ButtonBase } from '@mui/material';

export const AppTableContainer = styled(TableContainer)({
  margin: '0 30px',
  width: 'calc(100% - 60px)'
});

export const AppTableSortField = styled(ButtonBase)({
  fontWeight: 'bold',
  '&:hover': {
    opacity: 0.6
  }
});
