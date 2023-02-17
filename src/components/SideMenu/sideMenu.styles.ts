import { Box, IconButton, styled, Toolbar } from '@mui/material';
import { Group as GroupIcon } from '@mui/icons-material';

export const StyledDrawerBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '260px'
});

export const StyledDrawerToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.secondary.main
}));

export const StyledGroupIcon = styled(GroupIcon)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.contrastText,
  marginRight: 2
}));
