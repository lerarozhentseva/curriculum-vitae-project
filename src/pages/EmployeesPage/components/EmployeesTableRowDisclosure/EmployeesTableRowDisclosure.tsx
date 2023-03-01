import { useMutation, useReactiveVar } from '@apollo/client';
import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useCallback, useState, FC } from 'react';
import {
  IDeleteUserMutationParameters,
  IDeleteUserMutationReturnValue
} from '@graphql/users/DeleteUserMutation.types';
import { DeleteUserMutation } from '@graphql/users/DeleteUserMutation';
import { authService } from '@graphql/auth/authService';
import { IUser } from '@graphql/interfaces/IUser';
import { GetUsersQuery } from '@graphql/users/GetUsersQuery';
import { IEmployeesTableRowDisclosureProps } from '.';

const EmployeesTableRowDisclosure: FC<IEmployeesTableRowDisclosureProps> = ({ userId }) => {
  const [deleteAction, { loading }] = useMutation<
    IDeleteUserMutationReturnValue,
    IDeleteUserMutationParameters
  >(DeleteUserMutation, {
    refetchQueries: [{ query: GetUsersQuery }, 'GetUsers']
  });

  const user = useReactiveVar(authService.user$);

  const [anchor, setAnchor] = useState<Element | null>(null);

  const onOpen = useCallback((e: MouseEvent) => {
    setAnchor(e.currentTarget);
  }, []);

  const onClose = useCallback(() => {
    setAnchor(null);
  }, []);

  const deleteUser = useCallback(async (id: IUser['id']) => {
    try {
      await deleteAction({ variables: { id } });
    } finally {
      onClose();
    }
  }, []);

  return (
    <>
      <IconButton onClick={onOpen}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={!!anchor}
        onClose={onClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem disabled={user?.role !== 'admin'} onClick={() => deleteUser(userId)}>
          Delete User
        </MenuItem>
      </Menu>
    </>
  );
};

export default EmployeesTableRowDisclosure;
