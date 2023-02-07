import { MenuItem, SxProps, TextField } from '@mui/material';
import React from 'react';

type Data = {
  id: number;
  name: string;
};

interface IInputSelectProps {
  defaultValue?: string;
  label?: string;
  size?: 'small' | 'medium' | undefined;
  placeholder?: string;
  error?: boolean;
  color?: 'primary' | 'secondary';
  sx?: SxProps;
  helperText?: string;
  data: Data[];
}

const InputSelectField = ({
  defaultValue,
  label,
  size = 'medium',
  data,
  ...inputProps
}: IInputSelectProps) => {
  return (
    <TextField
      {...inputProps}
      select
      fullWidth
      size={size}
      margin="normal"
      label={label}
      sx={{
        border: 0,

        '& .MuiOutlinedInput-root.Mui-focused': {
          '& > fieldset': {
            borderColor: 'secondary.main',
            borderWidth: '1px'
          }
        },
        '& .MuiFormLabel-root.Mui-focused': {
          color: 'secondary.main'
        },

        '& fieldset': {
          outline: 'none',
          color: 'secondary.main',
          borderWidth: '1px'
        }
      }}
    >
      {data.map(({ id, name }) => (
        <MenuItem key={id}>{name}</MenuItem>
      ))}
    </TextField>
  );
};

export default InputSelectField;
