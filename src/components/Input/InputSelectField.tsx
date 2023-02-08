import { MenuItem, SxProps, TextField } from '@mui/material';
import React from 'react';
import './InputField.css';

export type InputSelectProps = {
  defaultValue?: string;
  label?: string;
  size?: 'small' | 'medium' | undefined;
  placeholder?: string;
  error?: boolean;
  color?: 'primary' | 'secondary';
  sx?: SxProps;
  helperText?: string;
  data: Array<{ id: number; name: string }>;
};

const InputSelectField = ({ label, size = 'medium', data, ...inputProps }: InputSelectProps) => {
  return (
    <TextField
      {...inputProps}
      select
      fullWidth
      size={size}
      margin="normal"
      label={label}
      sx={{
        border: 0
      }}
    >
      {data.map(({ id, name }) => (
        <MenuItem key={id}>{name}</MenuItem>
      ))}
    </TextField>
  );
};

export default InputSelectField;
