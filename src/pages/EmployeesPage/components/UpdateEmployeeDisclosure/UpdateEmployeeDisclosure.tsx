import { FC, useCallback, useMemo } from 'react';
import { useMutation, useReactiveVar } from '@apollo/client';
import { Box, MenuItem } from '@mui/material';
import useNestedFormData from '@hooks/useNestedFormData';
import { GetUsersQuery } from '@graphql/users/GetUsersQuery';
import { INITIAL_UPDATE_DATA } from '@pages/EmployeesPage/utils';
import { UpdateUserMutation } from '@graphql/users/UpdateUserMutation';
import {
  IUpdateUserMutationParameters,
  IUpdateUserMutationReturnType
} from '@graphql/users/UpdateUserMutation.types';
import useDisclosure from '@hooks/useDisclosure';
import { EmployeeFormDisclosure } from '@pages/EmployeesPage/components/EmployeeFormDisclosure';
import { authService } from '@graphql/auth/authService';
import { IUpdateEmployeeDisclosureProps } from '.';

const UpdateEmployeeDisclosure: FC<IUpdateEmployeeDisclosureProps> = ({ user, onBothClose }) => {
  const [updateAction, { error, loading }] = useMutation<
    IUpdateUserMutationReturnType,
    IUpdateUserMutationParameters
  >(UpdateUserMutation, {
    refetchQueries: [{ query: GetUsersQuery }, 'GetUsers']
  });

  const { formData, onFormFieldChange, resetFormData } = useNestedFormData({
    ...INITIAL_UPDATE_DATA,
    profile: {
      ...INITIAL_UPDATE_DATA.profile,
      first_name: user.profile.first_name ?? '',
      last_name: user.profile.last_name ?? ''
    },
    departmentId: user.department?.id ?? '',
    positionId: user.position?.id ?? ''
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const authorizedUser = useReactiveVar(authService.user$);

  const allowedToUpdate = useMemo(() => {
    return authorizedUser?.role === 'admin' || user.id === authorizedUser?.id;
  }, [user, authorizedUser]);

  const updateUser = useCallback(async () => {
    if (!allowedToUpdate) throw new Error('This action is forbidden');

    const variables: IUpdateUserMutationParameters = {
      user: formData,
      id: user.id
    };

    await updateAction({ variables });
    resetFormData();
  }, [user, formData]);

  return (
    <>
      <Box component={MenuItem} onClick={onOpen} disabled={!allowedToUpdate}>
        Update User
      </Box>
      <EmployeeFormDisclosure
        formData={formData}
        onFormFieldChange={onFormFieldChange}
        nativeError={error}
        action={updateUser}
        actionName="Update"
        isOpen={isOpen}
        onClose={() => onBothClose(onClose)}
        isLoading={loading}
      />
    </>
  );
};

export default UpdateEmployeeDisclosure;
