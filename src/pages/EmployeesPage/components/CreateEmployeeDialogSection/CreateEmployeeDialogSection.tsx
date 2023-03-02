import { Children, FC } from 'react';
import { Grid } from '@mui/material';
import {
  CreateEmployeeDialogSectionBox,
  CreateEmployeeDialogSectionHeading,
  ICreateEmployeeDialogSectionProps
} from '.';

const CreateEmployeeDialogSection: FC<ICreateEmployeeDialogSectionProps> = ({
  children,
  heading
}) => {
  return (
    <CreateEmployeeDialogSectionBox>
      <CreateEmployeeDialogSectionHeading>{heading}</CreateEmployeeDialogSectionHeading>
      <Grid container spacing={2}>
        {Children.map(children, (child) => (
          <Grid item xs minWidth="250px">
            {child}
          </Grid>
        ))}
      </Grid>
    </CreateEmployeeDialogSectionBox>
  );
};

export default CreateEmployeeDialogSection;
