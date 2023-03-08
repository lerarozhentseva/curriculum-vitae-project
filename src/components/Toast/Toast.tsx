import { FC } from 'react';
import { AlertProps, Snackbar } from '@mui/material';
import { StyledAlert } from '@components/NotificationAlert/notificationAlert.styles';

interface IToastProps extends AlertProps {
  onClose: () => void;
  message: string;
}

const Toast: FC<IToastProps> = ({ onClose, message, ...props }) => {
  return (
    <Snackbar autoHideDuration={2000} onClose={onClose} open={!!message}>
      <StyledAlert onClose={onClose} {...props}>
        {message}
      </StyledAlert>
    </Snackbar>
  );
};

export default Toast;
