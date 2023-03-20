import { FC } from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { ICvProjectsSwitchProps } from '.';

const CvProjectsSwitch: FC<ICvProjectsSwitchProps> = ({ ...props }) => {
  return (
    <FormControlLabel
      sx={{ marginLeft: '30px' }}
      control={<Switch {...props} />}
      label="Added only"
    />
  );
};

export default CvProjectsSwitch;
