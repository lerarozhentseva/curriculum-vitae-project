import { MenuItem, SxProps, TextField } from '@mui/material';
import React from 'react';
import { StyledTextField } from '@components/Input/InputField.styles';

export type InputSelectProps = {
  defaultValue?: string;
  label?: string;
  size?: 'small' | 'medium' | undefined;
  placeholder?: string;
  error?: boolean;
  color?: 'primary' | 'secondary';
  sx?: SxProps;
  helperText?: string;
  data: Array<{ id: number; name: string; value?: string | number | readonly string[] }>;
};

const InputSelectField = ({
  label,
  size = 'medium',
  sx,
  data,
  ...inputProps
}: InputSelectProps) => {
  return (
    <StyledTextField
      {...inputProps}
      select
      fullWidth
      size={size}
      margin="normal"
      label={label}
      sx={sx}
    >
      {data.map(({ id, name, value }) => (
        <MenuItem value={value} key={id}>
          {name}
        </MenuItem>
      ))}
    </StyledTextField>
  );
};

export default InputSelectField;
