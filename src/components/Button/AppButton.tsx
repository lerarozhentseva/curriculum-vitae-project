import React from 'react';
import { Button, SxProps } from '@mui/material';

export type AppButtonProps = {
  variant: 'contained' | 'text' | 'outlined';
  children: string;
  disabled?: boolean;
  sx?: SxProps;
};

const AppButton = ({ variant, children, disabled, sx }: AppButtonProps) => {
  return (
    <Button fullWidth variant={variant} color="secondary" sx={sx} disabled={disabled} type="submit">
      {children}
    </Button>
  );
};

export default AppButton;
