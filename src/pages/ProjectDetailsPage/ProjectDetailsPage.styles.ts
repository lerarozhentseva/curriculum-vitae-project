import { Paper, styled } from '@mui/material';
import { NotificationAlert } from '@components/NotificationAlert';

export const StyledPaper = styled(Paper)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '30px 40px',
  m: '20px 40px'
});

export const StyledNotificationAlert = styled(NotificationAlert)({
  position: 'fixed',
  bottom: '10px',
  left: '10px',
  width: '300px'
});
