import React from 'react';
import { SxProps } from '@mui/material';
import AppButton from './AppButton';

type CreateEmployeeButtonProps = {
  name: string;
  sx?: SxProps;
  onClick?: () => void;
  disabled?: boolean;
};

const CreateButton = ({ name, sx, onClick, disabled }: CreateEmployeeButtonProps) => {
  return (
    <AppButton variant="outlined" sx={sx} onClick={onClick} disabled={disabled}>
      {name}
    </AppButton>
  );
};

export default CreateButton;
