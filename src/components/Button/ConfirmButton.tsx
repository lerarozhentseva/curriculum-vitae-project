import React from 'react';
import AppButton from './AppButton';

type ConfirmButtonProps = {
  name: string;
};

const ConfirmButton = ({ name }: ConfirmButtonProps) => {
  return (
    <AppButton variant="contained" disabled>
      {name}
    </AppButton>
  );
};

export default ConfirmButton;
