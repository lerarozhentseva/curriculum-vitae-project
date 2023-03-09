import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { IFormInput } from '@graphql/user/IFormInput';
import { UserQuery } from '@graphql/user/UserQuery';
import { UpdateUserMutation } from '@graphql/user/UpdateUserMutation';
import { useUserData } from '@hooks/index';

const useUpdateUser = () => {
  const { user } = useUserData();
  const [sendDataError, setSendDataError] = useState('');
  const [updateUserMutation, { loading }] = useMutation(UpdateUserMutation, {
    refetchQueries: [{ query: UserQuery, variables: { id: user?.id } }]
  });

  const updateUser = async (updatedUser: IFormInput) => {
    try {
      await updateUserMutation({
        variables: {
          id: user?.id,
          user: {
            profile: {
              first_name: updatedUser.firstName,
              last_name: updatedUser.lastName
            },
            departmentId: updatedUser.department,
            positionId: updatedUser.position
          }
        }
      });
      setSendDataError('');
    } catch (err) {
      setSendDataError((err as Error).message);
    }
  };

  return { sendDataError, updateUser, loading };
};

export default useUpdateUser;
