import React, { useEffect, useState } from 'react';
import { SxProps } from '@mui/material';
import { StyledAlert } from '@components/NotificationAlert/notificationAlert.styles';

export type NotificationAlertProps = {
  severity?: 'success' | 'error';
  text: string;
  sx?: SxProps;
};

const NotificationAlert = ({ severity, text, sx }: NotificationAlertProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (text) {
      setIsVisible(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [text]);

  return (
    <StyledAlert
      variant="outlined"
      sx={sx}
      style={{ opacity: isVisible ? 1 : 0 }}
      severity={severity}
    >
      {text}
    </StyledAlert>
  );
};

export default NotificationAlert;
