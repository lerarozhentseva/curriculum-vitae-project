import { useMutation, useReactiveVar } from '@apollo/client';
import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useCallback, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IDeleteUserMutationParameters,
  IDeleteUserMutationReturnValue
} from '@graphql/users/DeleteUserMutation.types';
import { DeleteUserMutation } from '@graphql/users/DeleteUserMutation';
import { authService } from '@graphql/auth/authService';
import { IUser } from '@graphql/interfaces/IUser';
import { GetUsersQuery } from '@graphql/users/GetUsersQuery';
import useDisclosure from '@hooks/useDisclosure';
import { IEmployeesTableRowDisclosureProps } from '.';

const EmployeesTableRowDisclosure: FC<IEmployeesTableRowDisclosureProps> = ({ userId }) => {
  const [deleteAction, { loading }] = useMutation<
    IDeleteUserMutationReturnValue,
    IDeleteUserMutationParameters
  >(DeleteUserMutation, {
    refetchQueries: [{ query: GetUsersQuery }, 'GetUsers']
  });

  const user = useReactiveVar(authService.user$);
  const router = useNavigate();

  const { anchor, isOpen, onOpen, onClose } = useDisclosure();

  const deleteUser = useCallback(async (id: IUser['id']) => {
    try {
      await deleteAction({ variables: { id } });
    } finally {
      onClose();
    }
  }, []);

  const visitProfile = useCallback(() => {
    router(`/employees/${userId}/profile`);
  }, []);

  return (
    <>
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
        <MenuItem disabled={user?.role !== 'admin'} onClick={() => deleteUser(userId)}>
          Delete User
        </MenuItem>
      </Menu>
    </>
  );
};

export default EmployeesTableRowDisclosure;
