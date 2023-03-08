import React, { FC } from 'react';
import { useUserData } from '@hooks/index';
import { StyledBox, StyledNotificationBox } from '@pages/ProfilePage/ProfilePage.style';
import PageLoader from '@components/PageLoader/PageLoader';
import NotificationAlert from '@authPages/../../components/NotificationAlert/NotificationAlert';
import { PrivateEmployeeLayout } from '@components/PrivateEmployeeLayout/PrivateEmployeeLayout';
import ProfileForm from '@pages/ProfilePage/components/ProfileForm/ProfileForm';
import { useAvatar } from '@hooks/index';
import { useUpdateUser } from '@hooks/index';
import AvatarProfileHeader from './components/AvatarProfileHeader/AvatarProfileHeader';

const ProfilePage: FC = () => {
  const { user, loading: userDataLoading, error } = useUserData();
  const {
    sendDataError: avatarError,
    uploadAvatar,
    deleteAvatar,
    uploadAvatarLoading,
    deleteAvatarLoading
  } = useAvatar();
  const {
    sendDataError: updateUserError,
    updateUser,
    loading: updateUserLoading
  } = useUpdateUser();

  const isLoading =
    userDataLoading || updateUserLoading || deleteAvatarLoading || uploadAvatarLoading;

  return (
    <>
      {isLoading || error ? (
        <PageLoader />
      ) : (
        <PrivateEmployeeLayout>
          <StyledBox>
            <AvatarProfileHeader
              user={user}
              uploadAvatar={uploadAvatar}
              deleteAvatar={deleteAvatar}
            />
            <ProfileForm user={user} updateUser={updateUser} />
          </StyledBox>
        </PrivateEmployeeLayout>
      )}
      {updateUserError && (
        <StyledNotificationBox style={{ opacity: updateUserError ? 1 : 0 }}>
          <NotificationAlert severity="error" text={updateUserError} />
        </StyledNotificationBox>
      )}
      {avatarError && (
        <StyledNotificationBox style={{ opacity: avatarError ? 1 : 0 }}>
          <NotificationAlert severity="error" text={avatarError} />
        </StyledNotificationBox>
      )}
    </>
  );
};

export default ProfilePage;
