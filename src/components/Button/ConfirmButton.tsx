import React from 'react';
import { SxProps } from '@mui/material';
import AppButton from './AppButton';

type ConfirmButtonProps = {
  name: string;
  sx?: SxProps;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
};

const ConfirmButton = ({ name, sx, onClick }: ConfirmButtonProps) => {
  return (
    <AppButton variant="contained" sx={sx} onClick={onClick}>
      {name}
    </AppButton>
  );
};

export default ConfirmButton;
