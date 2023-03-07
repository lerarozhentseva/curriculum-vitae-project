import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UploadAvatarMutation } from '@graphql/avatar/UploadAvatarMutation';
import { DeleteAvatarMutation } from '@graphql/avatar/DeleteAvatarMutation';
import { useUserData } from '@hooks/index';
import { UserQuery } from '@graphql/user/UserQuery';
import { fileToBase64 } from '@pages/ProfilePage/components/AvatarProfileHeader/utils';

const useAvatar = () => {
  const { user } = useUserData();
  const [sendDataError, setSendDataError] = useState('');
  const [uploadAvatarMutation, { loading: uploadAvatarLoading }] = useMutation(
    UploadAvatarMutation,
    {
      refetchQueries: [{ query: UserQuery, variables: { id: user?.id } }]
    }
  );
  const [deleteAvatarMutation, { loading: deleteAvatarLoading }] = useMutation(
    DeleteAvatarMutation,
    {
      refetchQueries: [{ query: UserQuery, variables: { id: user?.id } }]
    }
  );

  const uploadAvatar = async (files: FileList | null) => {
    const currentFile = files?.[0];

    try {
      if (currentFile) {
        if (currentFile.size > 500000) {
          setSendDataError('File size exceeds 0.5MB');
        } else {
          const base64 = await fileToBase64(currentFile);
          await uploadAvatarMutation({
            variables: {
              id: user?.profile.id,
              avatar: {
                base64,
                size: currentFile.size,
                type: currentFile.type
              }
            }
          });
          setSendDataError('');
        }
      }
    } catch (error) {
      setSendDataError((error as Error).message);
    }
  };

  const deleteAvatar = async () => {
    try {
      await deleteAvatarMutation({
        variables: {
          id: user?.profile.id
        }
      });
      setSendDataError('');
    } catch (error) {
      setSendDataError((error as Error).message);
    }
  };

  return {
    sendDataError,
    uploadAvatar,
    deleteAvatar,
    uploadAvatarLoading,
    deleteAvatarLoading
  };
};

export default useAvatar;
