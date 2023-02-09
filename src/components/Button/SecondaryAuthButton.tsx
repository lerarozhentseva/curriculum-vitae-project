import React from 'react';
import AppButton from './AppButton';

type SecondaryAuthButtonProps = {
  name: string;
};

const SecondaryAuthButton = ({ name }: SecondaryAuthButtonProps) => {
  return <AppButton variant="text">{name}</AppButton>;
};

export default SecondaryAuthButton;
