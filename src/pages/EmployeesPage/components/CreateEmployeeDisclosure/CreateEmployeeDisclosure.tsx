import { ChangeEvent, useCallback, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { EMPLOYEE_ROLES, INITIAL_FORM_DATA } from '@pages/EmployeesPage/utils';
import { CreateEmployeeDialogSection } from '@pages/EmployeesPage/components/CreateEmployeeDialogSection';
import useDisclosure from '@hooks/useDisclosure';
import InputTextField from '@components/Input/InputTextField';
import InputSelectField from '@components/Input/InputSelectField';
import InputPasswordField from '@components/Input/InputPasswordField';
import EmployeeCreationModalButton from '@components/Button/EmployeeCreationModalButton';
import { ICreateUserInput } from '@graphql/interfaces/ICreateUserInput';

const CreateEmployeeDisclosure = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<ICreateUserInput>(INITIAL_FORM_DATA);

  const onFormFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const dummy = { ...formData };
      const fields = e.target.name.split('.');
      let node: any = dummy;

      for (let i = 0; i < fields.length - 1; i++) node = node[fields[i]];
      node[fields[fields.length - 1]] = e.target.value;

      setFormData(dummy);
    },
    [formData]
  );

  return (
    <>
      <EmployeeCreationModalButton onClick={onOpen}>Create Employee</EmployeeCreationModalButton>
      <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="lg">
        <DialogTitle textAlign="center">Create New Employee</DialogTitle>
        <DialogContent>
          <CreateEmployeeDialogSection heading="Credentials">
            <InputTextField
              value={formData.auth.email}
              onChange={onFormFieldChange}
              name="auth.email"
              inputType="email"
              label="Email"
            />
            <InputPasswordField
              value={formData.auth.password}
              onChange={onFormFieldChange}
              name="auth.password"
              inputType="password"
              label="Password"
            />
          </CreateEmployeeDialogSection>
          <CreateEmployeeDialogSection heading="Personal Info">
            <InputTextField
              value={formData.profile.first_name}
              onChange={onFormFieldChange}
              name="profile.first_name"
              inputType="text"
              label="First Name"
            />
            <InputTextField
              value={formData.profile.last_name}
              onChange={onFormFieldChange}
              name="profile.last_name"
              inputType="text"
              label="Last Name"
            />
          </CreateEmployeeDialogSection>
          <CreateEmployeeDialogSection heading="Qualities">
            <InputSelectField
              value={formData.profile.skills}
              onChange={onFormFieldChange}
              name="profile.skills"
              multiple
              label="Skills"
              data={[]}
            />
            <InputSelectField
              value={formData.profile.languages}
              onChange={onFormFieldChange}
              name="profile.languages"
              multiple
              label="Languages"
              data={[]}
            />
          </CreateEmployeeDialogSection>
          <CreateEmployeeDialogSection heading="Status">
            <InputSelectField
              value={formData.departmentId}
              name="departmentId"
              onChange={onFormFieldChange}
              label="Department"
              data={[]}
            />
            <InputSelectField
              value={formData.positionId}
              name="positionId"
              onChange={onFormFieldChange}
              label="Position"
              data={[]}
            />
          </CreateEmployeeDialogSection>
          <CreateEmployeeDialogSection heading="System">
            <InputSelectField
              value={formData.role}
              name="role"
              onChange={onFormFieldChange}
              label="Role"
              data={EMPLOYEE_ROLES}
            />
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
