import React, { FC } from 'react';
import { UncontrolledTextField } from '@components/Input';

interface DateInputProps {
  label: string;
  name: string;
  defaultValue: string | number;
}

const DateInput: FC<DateInputProps> = ({ label, name, defaultValue }) => {
  return (
    <UncontrolledTextField
      name={name}
      label={label}
      inputType="date"
      defaultValue={defaultValue}
      sx={{ width: 220 }}
    />
  );
};

export default DateInput;
