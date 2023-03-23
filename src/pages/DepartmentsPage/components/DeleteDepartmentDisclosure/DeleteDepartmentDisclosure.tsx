import { FC, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { DeleteForever } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ConfirmationDialog } from '@components/Dialog';
import {
  DeleteDepartmentMutation,
  GetDepartmentsQuery,
  IDeleteDepartmentMutationParameters,
  IDeleteDepartmentMutationReturnValue
} from '@graphql/departments';
import { useDisclosure, useRequest } from '@hooks/index';
import { Toast } from '@components/Toast';
import { IDeleteDepartmentDisclosureProps } from '.';

const DeleteDepartmentDisclosure: FC<IDeleteDepartmentDisclosureProps> = ({ department }) => {
  const [deleteAction, { loading, error: nativeError }] = useMutation<
    IDeleteDepartmentMutationReturnValue,
    IDeleteDepartmentMutationParameters
  >(DeleteDepartmentMutation, {
    refetchQueries: [{ query: GetDepartmentsQuery }, 'GetDepartments']
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteDepartment = useCallback(async () => {
    if (!department) return;
    await deleteAction({ variables: { id: department.id } });
  }, [department]);

  const [deleteDepartmentRequest, error, clearError] = useRequest(deleteDepartment, nativeError);

  return (
    <>
      <Toast severity="error" message={error} onClose={clearError} />
      <IconButton onClick={onOpen}>
        <DeleteForever />
      </IconButton>
      <ConfirmationDialog
        action={deleteDepartmentRequest}
        isLoading={loading}
        isOpen={isOpen}
        onClose={onClose}
        message={`Are you sure you want to delete department "${department?.name}"`}
      />
    </>
  );
};

export default DeleteDepartmentDisclosure;
