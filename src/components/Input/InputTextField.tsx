import React from 'react';
import { SxProps, TextField } from '@mui/material';
import './InputField.css';

export type InputProps = {
  inputType: string;
  name?: string;
  size?: 'small' | 'medium' | undefined;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (e: { target: { value: React.SetStateAction<string> } }) => void;
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
  error,
  size = 'medium',
  helperText,
  value,
  onChange,
  inputProps = {}
}: InputProps) => {
  const { endAdornment, startAdornment } = inputProps;
  return (
    <TextField
      name={name}
      helperText={helperText}
      label={name}
      type={inputType}
      placeholder={placeholder}
      fullWidth
      size={size}
      error={error}
      value={value}
      onChange={onChange}
      InputProps={{ endAdornment, startAdornment }}
      margin="normal"
      sx={{
        border: 0
      }}
    />
  );
};

export default InputTextField;
