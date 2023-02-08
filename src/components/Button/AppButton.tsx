import React from 'react';
import { Button } from '@mui/material';

export type AppButtonProps = {
  variant: 'contained' | 'text' | 'outlined';
  children: string;
  disabled?: boolean;
};

const AppButton = ({ variant, children, disabled }: AppButtonProps) => {
  return (
    <Button
      fullWidth
      sx={{
        borderRadius: 0,
        textTransform: 'none'
      }}
      variant={variant}
      color="secondary"
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default AppButton;
