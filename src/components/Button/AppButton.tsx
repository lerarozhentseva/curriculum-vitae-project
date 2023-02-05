import React from 'react';
import { Button } from '@mui/material';

interface IAppButton {
  variant: 'contained' | 'text' | 'outlined';
  children: string;
  disabled?: boolean;
}

const AppButton = ({ variant, children }: IAppButton) => {
  return (
    <Button
      fullWidth
      sx={{
        borderRadius: 0,
        textTransform: 'none'
      }}
      variant={variant}
      color="secondary"
    >
      {children}
    </Button>
  );
};

export default AppButton;
