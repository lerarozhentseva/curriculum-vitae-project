import React, { FC, useState } from 'react';
import { useMutation } from '@apollo/client';
import { IFormInput } from '@graphql/user/IFormInput';
import { UpdateUserMutation } from '@graphql/user/UpdateUserMutation';
import { UserQuery } from '@graphql/user/UserQuery';
import { useUserData } from '@hooks/index';
import { StyledBox, StyledNotificationBox } from '@pages/ProfilePage/ProfilePage.style';
import PageLoader from '@components/PageLoader/PageLoader';
import NotificationAlert from '@authPages/../../components/NotificationAlert/NotificationAlert';
import { PrivateEmployeeLayout } from '@components/PrivateEmployeeLayout/PrivateEmployeeLayout';
import ProfileForm from '@pages/ProfilePage/components/ProfileForm/ProfileForm';
import AvatarProfileHeader from './components/AvatarProfileHeader/AvatarProfileHeader';

const ProfilePage: FC = () => {
  const { user, loading, error } = useUserData();
  const [sendDataError, setSendDataError] = useState('');

  const [updateUserMutation, { loading: updateUserLoading }] = useMutation(UpdateUserMutation, {
    refetchQueries: [{ query: UserQuery, variables: { id: user?.id } }]
  });

  const isLoading = loading || updateUserLoading;

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

  return (
    <>
      {isLoading || error ? (
        <PageLoader />
      ) : (
        <PrivateEmployeeLayout>
          <StyledBox>
            <AvatarProfileHeader user={user} />
            <ProfileForm user={user} updateUser={updateUser} />
          </StyledBox>
        </PrivateEmployeeLayout>
      )}
      {sendDataError && (
        <StyledNotificationBox style={{ opacity: sendDataError ? 1 : 0 }}>
          <NotificationAlert severity="error" text={sendDataError} />
        </StyledNotificationBox>
      )}
    </>
  );
};

export default ProfilePage;
