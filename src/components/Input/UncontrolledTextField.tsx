import React from 'react';
import { SxProps } from '@mui/material';
import { StyledTextField } from './InputField.styles';

export type InputProps = {
  inputType?: string;
  name?: string;
  size?: 'small' | 'medium' | undefined;
  placeholder?: string;
  label?: string;
  defaultValue: string | number;
  error?: boolean;
  color?: 'primary' | 'secondary';
  sx?: SxProps;
  helperText?: string;
  required?: boolean;
};

const UncontrolledTextField = ({
  inputType,
  name,
  placeholder,
  error,
  size = 'medium',
  helperText,
  defaultValue,
  sx,
  label,
  required
}: InputProps) => {
  return (
    <StyledTextField
      name={name}
      helperText={helperText}
      label={label}
      type={inputType}
      placeholder={placeholder}
      fullWidth
      size={size}
      error={error}
      defaultValue={defaultValue}
      margin="normal"
      sx={sx}
      required={required}
    />
  );
};

export default UncontrolledTextField;
