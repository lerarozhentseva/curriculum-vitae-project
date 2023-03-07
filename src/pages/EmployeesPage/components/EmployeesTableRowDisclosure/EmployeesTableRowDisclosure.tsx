import { useMutation, useReactiveVar } from '@apollo/client';
import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useCallback, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DeleteUserMutation,
  IDeleteUserMutationParameters,
  IDeleteUserMutationReturnValue,
  GetUsersQuery
} from '@graphql/users';
import { authService } from '@graphql/auth/authService';
import { IUser } from '@graphql/interfaces';
import { useDisclosure, useRequest } from '@hooks/index';
import { Toast } from '@components/Toast';
import { UpdateEmployeeDisclosure } from '@pages/EmployeesPage/components/UpdateEmployeeDisclosure';
import { IEmployeesTableRowDisclosureProps } from '.';

const EmployeesTableRowDisclosure: FC<IEmployeesTableRowDisclosureProps> = ({ user }) => {
  const [deleteAction, { error: nativeError }] = useMutation<
    IDeleteUserMutationReturnValue,
    IDeleteUserMutationParameters
  >(DeleteUserMutation, {
    refetchQueries: [{ query: GetUsersQuery }, 'GetUsers']
  });

  const authorizedUser = useReactiveVar(authService.user$);
  const router = useNavigate();

  const { anchor, isOpen, onOpen, onClose } = useDisclosure();

  const deleteUser = useCallback(async (id: IUser['id']) => {
    await deleteAction({ variables: { id } });
  }, []);

  const visitProfile = useCallback(() => {
    router(`/employees/${user.id}/profile`);
  }, []);

  const [deleteUserRequest, error, clearError] = useRequest<[IUser['id']]>(deleteUser, nativeError);

  return (
    <>
      <Toast severity="error" message={error} onClose={clearError} />
      <IconButton onClick={onOpen}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={isOpen}
        onClose={onClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={visitProfile}>Profile</MenuItem>
        <UpdateEmployeeDisclosure user={user} onParentClose={onClose} />
        <MenuItem
          disabled={authorizedUser?.role !== 'admin'}
          onClick={() => deleteUserRequest(user.id)}
        >
          Delete User
        </MenuItem>
      </Menu>
    </>
  );
};

export default EmployeesTableRowDisclosure;
