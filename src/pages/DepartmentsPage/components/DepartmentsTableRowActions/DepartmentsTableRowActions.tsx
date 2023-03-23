import { FC, useCallback } from 'react';
import { Edit, Save } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useMutation } from '@apollo/client';
import { useRequest } from '@hooks/index';
import {
  GetDepartmentsQuery,
  IUpdateDepartmentMutationParameters,
  IUpdateDepartmentMutationReturnValue,
  UpdateDepartmentMutation
} from '@graphql/departments';
import { Toast } from '@components/Toast';
import { FixedProgress } from '@components/Progress';
import { DeleteDepartmentDisclosure } from '@pages/DepartmentsPage/components/DeleteDepartmentDisclosure';
import { IDepartmentsTableRowActionsProps } from '.';

const DepartmentsTableRowActions: FC<IDepartmentsTableRowActionsProps> = ({
  department,
  isEditing,
  enableEditing,
  name,
  disableEditing
}) => {
  const [updateAction, { loading, error: nativeError }] = useMutation<
    IUpdateDepartmentMutationReturnValue,
    IUpdateDepartmentMutationParameters
  >(UpdateDepartmentMutation, {
    refetchQueries: [{ query: GetDepartmentsQuery }, 'GetDepartments']
  });

  const updateDepartment = useCallback(async () => {
    if (department && name !== department.name)
      await updateAction({ variables: { id: department.id, department: { name } } });
    disableEditing();
  }, [department, name]);

  const [updateDepartmentRequest, error, clearError] = useRequest(updateDepartment, nativeError);

  return (
    <>
      {loading && <FixedProgress />}
      <Toast severity="error" message={error} onClose={clearError} />
      <Box sx={{ float: 'right' }}>
        {isEditing ? (
          <IconButton onClick={updateDepartmentRequest}>
            <Save />
          </IconButton>
        ) : (
          <IconButton onClick={enableEditing}>
            <Edit />
          </IconButton>
        )}
        <DeleteDepartmentDisclosure department={department} />
      </Box>
    </>
  );
};

export default DepartmentsTableRowActions;
