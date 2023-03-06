import { gql } from '@apollo/client';

export const UploadAvatarMutation = gql`
  mutation UploadAvatar($id: ID!, $avatar: AvatarInput!) {
    uploadAvatar(id: $id, avatar: $avatar)
  }
`;
