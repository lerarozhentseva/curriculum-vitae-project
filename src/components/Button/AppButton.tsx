import React from 'react';
import { Button, SxProps } from '@mui/material';

export type AppButtonProps = {
  variant: 'contained' | 'text' | 'outlined';
  children: string;
  disabled?: boolean;
  sx?: SxProps;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
};

const AppButton = ({ variant, children, disabled, sx, onClick }: AppButtonProps) => {
  return (
    <Button
      fullWidth
      variant={variant}
      color="secondary"
      sx={sx}
      disabled={disabled}
      onClick={onClick}
      type="submit"
    >
      {children}
    </Button>
  );
};

export default AppButton;
