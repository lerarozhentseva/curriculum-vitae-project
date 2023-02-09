import React from 'react';
import AppButton from './AppButton';

type CreateEmployeeButtonProps = {
  name: string;
};

const CreateEmployeeButton = ({ name }: CreateEmployeeButtonProps) => {
  return <AppButton variant="outlined">{name}</AppButton>;
};

export default CreateEmployeeButton;
