import { FC, useCallback } from 'react';
import { useMutation, useReactiveVar } from '@apollo/client';
import { MenuItem } from '@mui/material';
import { authService } from '@graphql/auth/authService';
import { IUser } from '@graphql/interfaces';
import { useDisclosure, useRequest } from '@hooks/index';
import {
  DeleteUserMutation,
  GetUsersQuery,
  IDeleteUserMutationParameters,
  IDeleteUserMutationReturnValue
} from '@graphql/users';
import { Toast } from '@components/Toast';
import { ConfirmationDialog } from '@components/Dialog';
import { IDeleteEmployeeDisclosureProps } from '.';

const DeleteEmployeeDisclosure: FC<IDeleteEmployeeDisclosureProps> = ({ user, onBothClose }) => {
  const [deleteAction, { error: nativeError, loading }] = useMutation<
    IDeleteUserMutationReturnValue,
    IDeleteUserMutationParameters
  >(DeleteUserMutation, {
    refetchQueries: [{ query: GetUsersQuery }, 'GetUsers']
  });

  const authorizedUser = useReactiveVar(authService.user$);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteUser = useCallback(async (id: IUser['id']) => {
    await deleteAction({ variables: { id } });
  }, []);

  const [deleteUserRequest, error, clearError] = useRequest<[IUser['id']]>(deleteUser, nativeError);

  return (
    <>
      <Toast message={error} severity="error" onClose={clearError} />
      <MenuItem disabled={authorizedUser?.role !== 'admin'} onClick={onOpen}>
        Delete User
      </MenuItem>
      <ConfirmationDialog
        isOpen={isOpen}
        onClose={() => onBothClose(onClose)}
        isLoading={loading}
        action={() => deleteUserRequest(user.id)}
        message={`Are you sure you want to delete user "${user.email}"?`}
      />
    </>
  );
};

export default DeleteEmployeeDisclosure;
