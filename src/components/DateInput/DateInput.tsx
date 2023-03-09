import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

interface DateInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange }) => {
  return (
    <TextField
      id="date"
      label={label}
      type="date"
      value={value}
      onChange={onChange}
      sx={{ width: 220 }}
      InputLabelProps={{
        shrink: true
      }}
    />
  );
};

export default DateInput;
