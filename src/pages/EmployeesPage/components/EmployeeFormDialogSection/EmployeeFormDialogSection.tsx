import { Children, FC } from 'react';
import { Grid } from '@mui/material';
import {
  EmployeeFormDialogSectionBox,
  EmployeeFormDialogSectionHeading,
  IEmployeeFormDialogSectionProps
} from '.';

const EmployeeFormDialogSection: FC<IEmployeeFormDialogSectionProps> = ({ children, heading }) => {
  return (
    <EmployeeFormDialogSectionBox>
      <EmployeeFormDialogSectionHeading>{heading}</EmployeeFormDialogSectionHeading>
      <Grid container spacing={2}>
        {Children.map(children, (child) => (
          <Grid item xs minWidth="200px">
            {child}
          </Grid>
        ))}
      </Grid>
    </EmployeeFormDialogSectionBox>
  );
};

export default EmployeeFormDialogSection;
