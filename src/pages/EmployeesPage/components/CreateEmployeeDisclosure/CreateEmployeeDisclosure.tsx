import { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useLazyQuery, useMutation } from '@apollo/client';
import { EMPLOYEE_ROLES, INITIAL_FORM_DATA } from '@pages/EmployeesPage/utils';
import { CreateEmployeeDialogSection } from '@pages/EmployeesPage/components/CreateEmployeeDialogSection';
import useDisclosure from '@hooks/useDisclosure';
import InputTextField from '@components/Input/InputTextField';
import InputSelectField from '@components/Input/InputSelectField';
import InputPasswordField from '@components/Input/InputPasswordField';
import EmployeeCreationModalButton from '@components/Button/EmployeeCreationModalButton';
import { GetDepartmentsQuery } from '@graphql/departments/GetDepartmentsQuery';
import { GetPositionsQuery } from '@graphql/positions/GetPositionsQuery';
import { IDepartment } from '@graphql/interfaces/IDepartment';
import { IPosition } from '@graphql/interfaces/IPosition';
import { CreateUserMutation } from '@graphql/users/CreateUserMutation';
import {
  ICreateUserMutationParameters,
  ICreateUserMutationReturnType
} from '@graphql/users/CreateUserMutation.types';
import { GetUsersQuery } from '@graphql/users/GetUsersQuery';

const CreateEmployeeDisclosure = () => {
  const [getDepartments, { data: departmentsData }] = useLazyQuery<{
    departments: IDepartment[];
  }>(GetDepartmentsQuery);
  const [getPositions, { data: positionsData }] = useLazyQuery<{
    positions: IPosition[];
  }>(GetPositionsQuery);
  const [createAction] = useMutation<ICreateUserMutationReturnType, ICreateUserMutationParameters>(
    CreateUserMutation,
    { refetchQueries: [{ query: GetUsersQuery }, 'GetUsers'] }
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

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

  const open = useCallback(async (e: MouseEvent) => {
    onOpen(e);
    await Promise.all([getDepartments(), getPositions()]);
  }, []);

  const departments = useMemo(() => {
    return (
      departmentsData?.departments.map((department) => ({
        ...department,
        id: +department.id,
        value: department.id
      })) ?? []
    );
  }, [departmentsData]);

  const positions = useMemo(() => {
    return (
      positionsData?.positions.map((position) => ({
        ...position,
        id: +position.id,
        value: position.id
      })) ?? []
    );
  }, [positionsData]);

  const createUser = useCallback(async () => {
    const { email, password } = formData.auth;

    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail || !trimmedPassword || !re.test(trimmedEmail) || password.length < 6) return;

    const variables: ICreateUserMutationParameters = {
      user: {
        ...formData,
        auth: {
          email: trimmedEmail,
          password: trimmedPassword
        }
      }
    };

    await createAction({ variables });
    onClose();
    setFormData(INITIAL_FORM_DATA);
  }, [formData]);

  return (
    <>
      <EmployeeCreationModalButton onClick={open}>Create Employee</EmployeeCreationModalButton>
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
              required
            />
            <InputPasswordField
              value={formData.auth.password}
              onChange={onFormFieldChange}
              name="auth.password"
              inputType="password"
              label="Password"
              required
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
          <CreateEmployeeDialogSection heading="Status">
            <InputSelectField
              value={formData.departmentId}
              name="departmentId"
              onChange={onFormFieldChange}
              label="Department"
              data={departments}
            />
            <InputSelectField
              value={formData.positionId}
              name="positionId"
              onChange={onFormFieldChange}
              label="Position"
              data={positions}
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
          <Button onClick={createUser}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateEmployeeDisclosure;
