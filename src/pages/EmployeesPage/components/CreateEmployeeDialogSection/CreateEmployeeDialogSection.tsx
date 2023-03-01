import { Children, FC, ReactNode } from 'react';
import { Grid } from '@mui/material';
import { CreateEmployeeDialogSectionBox, CreateEmployeeDialogSectionHeading } from '.';

const CreateEmployeeDialogSection: FC<{ children: ReactNode; heading: string }> = ({
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
