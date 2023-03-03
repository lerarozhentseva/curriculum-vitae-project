import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { EMPLOYEE_ROLES, INITIAL_CREATE_DATA } from '@pages/EmployeesPage/utils';
import { EmployeeFormDialogSection } from '@pages/EmployeesPage/components/EmployeeFormDialogSection';
import InputTextField from '@components/Input/InputTextField';
import InputPasswordField from '@components/Input/InputPasswordField';
import { CreateUserMutation } from '@graphql/users/CreateUserMutation';
import {
  ICreateUserMutationParameters,
  ICreateUserMutationReturnType
} from '@graphql/users/CreateUserMutation.types';
import { GetUsersQuery } from '@graphql/users/GetUsersQuery';
import useNestedFormData from '@hooks/useNestedFormData';
import EmployeeCreationModalButton from '@components/Button/EmployeeCreationModalButton';
import useDisclosure from '@hooks/useDisclosure';
import InputSelectField from '@components/Input/InputSelectField';
import { EmployeeFormDisclosure } from '@pages/EmployeesPage/components/EmployeeFormDisclosure';

const CreateEmployeeDisclosure = () => {
  const [createAction, { error: nativeError }] = useMutation<
    ICreateUserMutationReturnType,
    ICreateUserMutationParameters
  >(CreateUserMutation, { refetchQueries: [{ query: GetUsersQuery }, 'GetUsers'] });

  const { formData, onFormFieldChange, resetFormData } = useNestedFormData(INITIAL_CREATE_DATA);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createUser = useCallback(async () => {
    const { email, password } = formData.auth;

    const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail || !trimmedPassword || !re.test(trimmedEmail) || password.length < 6)
      throw new Error('Some of the fields are not valid');

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
    resetFormData();
  }, [formData]);

  return (
    <>
      <EmployeeCreationModalButton onClick={onOpen}>Create Employee</EmployeeCreationModalButton>
      <EmployeeFormDisclosure
        action={createUser}
        actionName="Create"
        formData={formData}
        onFormFieldChange={onFormFieldChange}
        nativeError={nativeError}
        isOpen={isOpen}
        onClose={onClose}
      >
        <EmployeeFormDialogSection heading="Credentials">
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
        </EmployeeFormDialogSection>
        <EmployeeFormDialogSection heading="System">
          <InputSelectField
            value={formData.role}
            name="role"
            onChange={onFormFieldChange}
            label="Role"
            data={EMPLOYEE_ROLES}
          />
        </EmployeeFormDialogSection>
      </EmployeeFormDisclosure>
    </>
  );
};

export default CreateEmployeeDisclosure;
