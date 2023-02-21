import React from 'react';
import { StyledAlert } from '@authPages/components/NotificationAlert/notificationAlert.styles';

export type NotificationAlertProps = {
  severity?: 'success' | 'error';
  text: string;
};

const NotificationAlert = ({ severity, text }: NotificationAlertProps) => {
  return (
    <StyledAlert variant="outlined" severity={severity}>
      {text}
    </StyledAlert>
  );
};

export default NotificationAlert;
