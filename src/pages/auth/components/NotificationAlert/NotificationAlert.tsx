import { Alert } from '@mui/material';
import React from 'react';

export type NotificationAlertProps = {
  severity?: 'success' | 'error';
  text: string;
};

const NotificationAlert = ({ severity, text }: NotificationAlertProps) => {
  return (
    <Alert sx={{ width: '450px', m: '0 auto' }} variant="outlined" severity={severity}>
      {text}
    </Alert>
  );
};

export default NotificationAlert;
