import React from 'react';
import { SxProps } from '@mui/material';
import AppButton from './AppButton';

type ConfirmButtonProps = {
  name: string;
  sx?: SxProps;
};

const ConfirmButton = ({ name, sx }: ConfirmButtonProps) => {
  return (
    <AppButton variant="contained" sx={sx}>
      {name}
    </AppButton>
  );
};

export default ConfirmButton;
