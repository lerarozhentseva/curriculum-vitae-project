import { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';

const EmployeeCreationModalButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      sx={{ float: 'right', marginRight: '30px' }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default EmployeeCreationModalButton;
