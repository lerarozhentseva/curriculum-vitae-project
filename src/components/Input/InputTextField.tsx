import React from 'react';
import { SxProps, TextField, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface IInputProps {
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
  inputProps?: any;
  startAdornment?: any;
  endAdornment?: any;
}

const InputTextField = ({
  inputType,
  label,
  name,
  placeholder,
  size = 'medium',
  inputProps = {}
}: IInputProps) => {
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
    />
  );
};

export default InputTextField;
