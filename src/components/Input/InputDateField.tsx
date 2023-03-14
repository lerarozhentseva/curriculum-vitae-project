import { FC } from 'react';
import { StandardTextFieldProps } from '@mui/material';
import { StyledTextField } from '.';

const InputDateField: FC<StandardTextFieldProps> = (props) => {
  return (
    <StyledTextField
      {...props}
      fullWidth
      margin="normal"
      type="date"
      InputLabelProps={{ shrink: true }}
    />
  );
};

export default InputDateField;
