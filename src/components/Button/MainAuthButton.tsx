import React from 'react';
import AppButton from './AppButton';

type MainAuthButtonProps = {
  name: string;
};

const MainAuthButton = ({ name }: MainAuthButtonProps) => {
  return <AppButton variant="contained">{name}</AppButton>;
};

export default MainAuthButton;