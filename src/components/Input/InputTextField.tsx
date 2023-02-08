import React from 'react';
import { SxProps, TextField } from '@mui/material';
import './InputField.css';

export type InputProps = {
  inputType: string;
  name?: string;
  size?: 'small' | 'medium' | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: string;
  error?: boolean;
  color?: 'primary' | 'secondary';
  sx?: SxProps;
  helperText?: string;
  inputProps?: {
    endAdornment?: React.ReactNode;
    startAdornment?: React.ReactNode;
  };
};

const InputTextField = ({
  inputType,
  name,
  placeholder,
  size = 'medium',
  inputProps = {}
}: InputProps) => {
  const { endAdornment, startAdornment } = inputProps;
  return (
    <TextField
      name={name}
      label={name}
      type={inputType}
      placeholder={placeholder}
      fullWidth
      size={size}
      InputProps={{ endAdornment, startAdornment }}
      margin="normal"
      sx={{
        border: 0
      }}
    />
  );
};

export default InputTextField;
