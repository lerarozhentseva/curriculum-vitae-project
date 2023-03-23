import { useMutation } from '@apollo/client';
import { LinearProgress, Paper } from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import { InputTextField } from '@components/Input';
import {
  CreateDepartmentMutation,
  GetDepartmentsQuery,
  ICreateDepartmentMutationParameters,
  ICreateDepartmentMutationReturnValue
} from '@graphql/departments';
import { Toast } from '@components/Toast';
import { useRequest } from '@hooks/index';
import { CreateButton } from '@components/Button';

const CreateDepartmentForm = () => {
  const [createAction, { loading, error: nativeError }] = useMutation<
    ICreateDepartmentMutationReturnValue,
    ICreateDepartmentMutationParameters
  >(CreateDepartmentMutation, {
    refetchQueries: [{ query: GetDepartmentsQuery }, 'GetDepartments']
  });

  const [name, setName] = useState('');
  const onNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    []
  );

  const createDepartment = useCallback(async () => {
    await createAction({ variables: { department: { name } } });
    setName('');
  }, [name]);

  const [createDepartmentRequest, error, clearError] = useRequest(createDepartment, nativeError);

  return (
    <>
      <Toast severity="error" message={error} onClose={clearError} />
      <Paper elevation={3} sx={{ padding: '10px 25px 25px 25px', margin: '30px' }}>
        <InputTextField inputType="text" label="Name" value={name} onChange={onNameChange} />
        <CreateButton name="Create Department" onClick={createDepartmentRequest} />
        {loading && <LinearProgress />}
      </Paper>
    </>
  );
};

export default CreateDepartmentForm;
