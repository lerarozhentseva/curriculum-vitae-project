import { gql } from '@apollo/client';

export const DeleteAvatarMutation = gql`
  mutation DeleteAvatar($id: ID!) {
    deleteAvatar(id: $id)
  }
`;
