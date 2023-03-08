import React, { ChangeEvent } from 'react';
import { SxProps } from '@mui/material';
import { StyledTextField } from './InputField.styles';

export type InputProps = {
  inputType: string;
  name?: string;
  size?: 'small' | 'medium' | undefined;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  color?: 'primary' | 'secondary';
  sx?: SxProps;
  helperText?: string;
  inputProps?: {
    endAdornment?: React.ReactNode;
    startAdornment?: React.ReactNode;
  };
  required?: boolean;
};

const InputTextField = ({
  inputType,
  name,
  placeholder,
  error,
  size = 'medium',
  helperText,
  value,
  onChange,
  sx,
  label,
  inputProps = {},
  required
}: InputProps) => {
  const { endAdornment, startAdornment } = inputProps;
  return (
    <StyledTextField
      name={name}
      helperText={helperText}
      label={label ?? name}
      type={inputType}
      placeholder={placeholder}
      fullWidth
      size={size}
      error={error}
      value={value}
      onChange={onChange}
      InputProps={{ endAdornment, startAdornment }}
      margin="normal"
      sx={sx}
      required={required}
    />
  );
};

export default InputTextField;
