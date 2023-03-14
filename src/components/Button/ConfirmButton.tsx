import React from 'react';
import { SxProps } from '@mui/material';
import AppButton from './AppButton';

type ConfirmButtonProps = {
  name: string;
  sx?: SxProps;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
  disabled?: boolean;
};

const ConfirmButton = ({ name, sx, onClick, disabled }: ConfirmButtonProps) => {
  return (
    <AppButton variant="contained" sx={sx} onClick={onClick} disabled={disabled}>
      {name}
    </AppButton>
  );
};

export default ConfirmButton;
