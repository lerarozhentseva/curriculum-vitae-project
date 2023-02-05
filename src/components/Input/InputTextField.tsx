import React from 'react';
import { SxProps, TextField } from '@mui/material';

interface IInputProps {
  inputType: string;
  name?: string;
  size?: 'small' | 'medium' | undefined;
  placeholder?: string;
  defaultValue?: string;
  error?: boolean;
  color?: 'primary' | 'secondary';
  sx?: SxProps;
  helperText?: string;
}

const InputTextField = ({ inputType, name, size = 'medium', ...inputProps }: IInputProps) => {
  return (
    <TextField
      {...inputProps}
      name={name}
      label={name}
      type={inputType}
      fullWidth
      size={size}
      margin="normal"
    />
  );
};

export default InputTextField;
