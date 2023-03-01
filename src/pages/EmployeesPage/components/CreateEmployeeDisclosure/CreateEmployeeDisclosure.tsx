import { useCallback, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { EMPLOYEE_ROLES } from '@pages/EmployeesPage/utils';
import useDisclosure from '@hooks/useDisclosure';
import InputTextField from '@components/Input/InputTextField';
import InputSelectField from '@components/Input/InputSelectField';
import { CreateEmployeeDialogSection } from '@pages/EmployeesPage/components/CreateEmployeeDialogSection';

const CreateEmployeeDisclosure = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordShown((previous) => !previous);
  }, []);

  return (
    <>
      <Button
        onClick={onOpen}
        variant="outlined"
        color="error"
        sx={{ float: 'right', marginRight: '30px' }}
      >
        Create Employee
      </Button>
      <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="lg">
        <DialogTitle textAlign="center">Create New Employee</DialogTitle>
        <DialogContent>
          <CreateEmployeeDialogSection heading="Credentials">
            <InputTextField inputType="email" placeholder="Email" />
            <InputTextField
              inputType={isPasswordShown ? 'text' : 'password'}
              placeholder="Password"
              inputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {isPasswordShown ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </CreateEmployeeDialogSection>
          <CreateEmployeeDialogSection heading="Personal Info">
            <InputTextField inputType="text" placeholder="First Name" />
            <InputTextField inputType="text" placeholder="Last Name" />
            <InputTextField inputType="text" placeholder="Full Name" />
          </CreateEmployeeDialogSection>
          <CreateEmployeeDialogSection heading="Qualities">
            <InputSelectField multiple label="Skills" data={[]} defaultValue="" />
            <InputSelectField multiple label="Languages" data={[]} defaultValue="" />
          </CreateEmployeeDialogSection>
          <CreateEmployeeDialogSection heading="Status">
            <InputSelectField label="Department" data={[]} defaultValue="" />
            <InputSelectField label="Position" data={[]} defaultValue="" />
          </CreateEmployeeDialogSection>
          <CreateEmployeeDialogSection heading="System">
            <InputSelectField defaultValue="" label="Role" data={EMPLOYEE_ROLES} />
          </CreateEmployeeDialogSection>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateEmployeeDisclosure;
